import { useAuth as useAuthContext } from '../context/AuthContext';
import { User } from '../types';
import { api } from '../services/api';
import { authMock } from '../services/authMock';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const { authState, login, logout, setLoading, setError } = useAuthContext();

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const ensureMinDelay = async (startMs: number, minMs: number) => {
    const elapsed = Date.now() - startMs;
    if (elapsed < minMs) {
      await wait(minMs - elapsed);
    }
  };

  const loginUser = async (email: string, password: string) => {
    const startedAt = Date.now();
    setLoading(true);
    setError(null);

    try {
      const response = await api.login({ email, password });
      if (response.token) {
        storage.setToken(response.token);
      }
      login(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesiÃ³n');
      throw err;
    } finally {
      await ensureMinDelay(startedAt, 800);
      setLoading(false);
    }
  };

  const registerUser = async (userData: any) => {
    const startedAt = Date.now();
    setLoading(true);
    setError(null);

    try {
      const response = await api.register(userData);
      login(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      await ensureMinDelay(startedAt, 800);
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    setLoading,
    setError,
    clearError,
    testUsers: authMock.getTestUsers(),
  };
};
