import * as Sentry from "@sentry/node";

// Inicializa Sentry lo más pronto posible en el ciclo de vida de la aplicación.
// Los valores se obtienen de las variables de entorno configuradas en Render.
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Tracing / Performance Monitoring
  tracesSampleRate: 1.0, // Captura el 100% de las transacciones

  // Enviar datos PII por defecto (como IPs) para mejor diagnóstico
  sendDefaultPii: true,

  environment: process.env.NODE_ENV || "development",
});
