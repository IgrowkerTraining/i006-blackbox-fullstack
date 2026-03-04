/**
 * TESTS UNITARIOS - Recuperación de Contraseña
 * =============================================
 *
 * Estos tests verifican el comportamiento del AuthController en dos flujos:
 * 1. forgotPassword: Usuario solicita recuperar su contraseña
 * 2. resetPassword: Usuario establece una nueva contraseña
 *
 * ESTRUCTURA DE UN TEST:
 * ----------------------
 * 1. Arrange (Preparar): Crear req/res falsos y configurar mocks
 * 2. Act (Actuar): Llamar la función del controller
 * 3. Assert (Verificar): Comprobar que el resultado sea el esperado
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import authController from "../controllers/authController";
import { UserService } from "../services/userServices";
import { EmailService } from "../services/emailService";

const mockUser = {
  id: "user-123",
  email: "test@example.com",
  name: "Test User",
  passwordHash: "hashedPassword123",
  role: "ADMIN" as const,
  isActive: true,
  companyId: "company-123",
  resetPasswordToken: null,
  resetPasswordExpires: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// =============================================================================
// SECCIÓN 1: MOCKS
// =============================================================================
// Los mocks sustituyen las dependencias reales por versiones controladas.
// Esto nos permite testear el controller sin depender de la BD real ni enviar emails de verdad.

// Mock de Prisma (la conexión a la base de datos)
vi.mock("../prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

// Mock de los servicios que usa el controller
vi.mock("../services/userServices");
vi.mock("../services/emailService");

// Mock de bcrypt (para hashear contraseñas)
// Retorna "hashedPassword" en vez de hashear de verdad
vi.mock("bcrypt", async () => {
  const actual = await vi.importActual("bcrypt");
  return {
    ...actual,
    default: {
      hash: vi.fn().mockResolvedValue("hashedPassword"),
      compare: vi.fn().mockResolvedValue(true),
    },
  };
});

// Mock de crypto (para generar tokens)
// Retorna siempre el mismo token "mock-reset-token-12345"
vi.mock("crypto", () => ({
  default: {
    randomBytes: vi.fn().mockReturnValue({
      toString: vi.fn().mockReturnValue("mock-reset-token-12345"),
    }),
  },
}));

// =============================================================================
// SECCIÓN 2: TESTS DE forgotPassword
// =============================================================================
/**
 * describe(): Agrupa tests relacionados - en este caso, todos los de forgotPassword
 * beforeEach(): Se ejecuta antes de CADA test - limpia los mocks para que no haya interferencia
 */
describe("AuthController - forgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia el historial de llamadas a los mocks
  });

  // ---------------------------------------------------------------------------
  // TEST 1: Happy Path - Usuario existe
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El usuario existe en la base de datos
   * EXPECTATIVA:
   *   - Se genera un token de recuperación
   *   - Se envía un email con el enlace de reset
   *   - Se guarda el token en la base de datos
   *   - Se devuelve mensaje de éxito (mensaje genérico por seguridad)
   */
  it("debería enviar email de reset cuando el usuario existe", async () => {
    // === ARRANGE (Preparar) ===
    const req = { body: { email: "test@example.com" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(UserService.findByEmail).mockResolvedValue(mockUser);
    vi.mocked(EmailService.sendPasswordResetEmail).mockResolvedValue(undefined);
    vi.mocked(UserService.setResetPasswordToken).mockResolvedValue(mockUser);

    // === ACT (Actuar) ===
    await authController.forgotPassword(req, res);

    // === ASSERT (Verificar) ===
    expect(UserService.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(EmailService.sendPasswordResetEmail).toHaveBeenCalledWith({
      to: "test@example.com",
      resetToken: "mock-reset-token-12345",
      userName: "Test User",
    });
    expect(UserService.setResetPasswordToken).toHaveBeenCalledWith(
      "test@example.com",
      "mock-reset-token-12345",
      expect.any(Date),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "If the email exists, a reset link has been sent",
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 2: Seguridad - Usuario NO existe
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El email NO existe en la base de datos
   * EXPECTATIVA:
   *   - NO se envía ningún email (para evitar revelar qué emails existen)
   *   - NO se guarda ningún token
   *   - Se devuelve el MISMO mensaje que si el usuario existiera
   *
   * NOTA: Esto es una medida de seguridad para evitar enumeración de usuarios
   */
  it("debería devolver mensaje genérico cuando el usuario NO existe", async () => {
    // === ARRANGE ===
    const req = { body: { email: "nonexistent@example.com" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(UserService.findByEmail).mockResolvedValue(null);

    // === ACT ===
    await authController.forgotPassword(req, res);

    // === ASSERT ===
    expect(UserService.findByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com",
    );
    expect(EmailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    expect(UserService.setResetPasswordToken).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "If the email exists, a reset link has been sent",
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 3: Validación - Email vacío
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El usuario envía el formulario sin completar el email
   * EXPECTATIVA: Error 400 con mensaje "Email is required"
   */
  it("debería devolver error 400 cuando el email está vacío", async () => {
    // === ARRANGE ===
    const req = { body: {} } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    // === ACT ===
    await authController.forgotPassword(req, res);

    // === ASSERT ===
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email is required" });
  });
});

// =============================================================================
// SECCIÓN 3: TESTS DE resetPassword
// =============================================================================
describe("AuthController - resetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // TEST 4: Happy Path - Token válido
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El usuario envía un token válido y una nueva contraseña
   * EXPECTATIVA:
   *   - Se verifica que el token es válido
   *   - Se hashea la nueva contraseña
   *   - Se actualiza la contraseña en la base de datos
   *   - Se limpian los campos de token de reset
   *   - Se devuelve éxito
   */
  it("debería actualizar la contraseña con token válido", async () => {
    // === ARRANGE ===
    const req = {
      body: { token: "valid-token", newPassword: "newpassword123" },
    } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(UserService.findByResetToken).mockResolvedValue(mockUser);
    vi.mocked(UserService.updatePassword).mockResolvedValue(mockUser);

    // === ACT ===
    await authController.resetPassword(req, res);

    // === ASSERT ===
    expect(UserService.findByResetToken).toHaveBeenCalledWith("valid-token");
    expect(UserService.updatePassword).toHaveBeenCalledWith(
      mockUser.id,
      "hashedPassword",
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Password updated successfully",
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 5: Error - Token inválido o expirado
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El token no existe o ya expiró (más de 1 hora)
   * EXPECTATIVA: Error 400 indicando token inválido
   */
  it("debería devolver error con token inválido", async () => {
    // === ARRANGE ===
    const req = {
      body: { token: "invalid-token", newPassword: "newpassword123" },
    } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(UserService.findByResetToken).mockResolvedValue(null);

    // === ACT ===
    await authController.resetPassword(req, res);

    // === ASSERT ===
    expect(UserService.findByResetToken).toHaveBeenCalledWith("invalid-token");
    expect(UserService.updatePassword).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid or expired token",
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 6: Validación - Password muy corta
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: La nueva contraseña tiene menos de 6 caracteres
   * EXPECTATIVA: Error 400 indicando longitud mínima
   */
  it("debería devolver error con password menor a 6 caracteres", async () => {
    // === ARRANGE ===
    const req = { body: { token: "valid-token", newPassword: "12345" } } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    // === ACT ===
    await authController.resetPassword(req, res);

    // === ASSERT ===
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Password must be at least 6 characters",
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 7: Validación - Campos obligatorios
  // ---------------------------------------------------------------------------
  /**
   * ESCENARIO: El usuario no envía token ni nueva contraseña
   * EXPECTATIVA: Error 400 indicando que ambos campos son requeridos
   */
  it("debería devolver error cuando token o password están vacíos", async () => {
    // === ARRANGE ===
    const req = { body: {} } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    // === ACT ===
    await authController.resetPassword(req, res);

    // === ASSERT ===
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token and new password are required",
    });
  });
});
