import { useAuth as useAuthContext } from '../context/AuthContext';
import { User } from '../types';
import { authMock } from '../services/authMock';

export const useAuth = () => {
  const { authState, login, logout, setLoading, setError } = useAuthContext();

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authMock.login(email, password);
      login(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authMock.register(userData);
      login(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
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
    testUsers: authMock.getTestUsers()
  };
};
