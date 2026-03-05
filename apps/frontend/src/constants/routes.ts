export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  RESET: '/auth/password/rest',
  DASHBOARD: '/dashboard',
  CHOFERES: '/choferes',
  INSPECCION_NUEVA: '/inspeccion/nueva',
  HOME: '/',
} as const;

export const API_ENDPOINTS = {
  BASE: import.meta.env.VITE_API_BASE_URL,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  HEALTH: '/health',
  CHOFERES: '/choferes',
  FLOTA: '/flota',
  HISTORIAL: '/historial',
} as const;

export const STORAGE_KEYS = {
  USER: 'example_user',
  TOKEN: 'example_token',
} as const;
