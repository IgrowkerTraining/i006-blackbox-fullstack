export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHOFERES: '/choferes',
  INSPECCION_NUEVA: '/inspeccion/nueva',
  HOME: '/',
} as const;

export const API_ENDPOINTS = {
  BASE: 'http://localhost:3000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
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
