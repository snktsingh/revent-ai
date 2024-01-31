export const API_BASE_URL = 'https://api.revent.ai/ppt-service/api';

export const ENDPOINT = {
  TEST: `${API_BASE_URL}/test`,
  GEN_PPT: 'ppt/generate-ppt',
  GEN_PPT_MULTI: 'ppt/generate-ppt-multi',
} as const;

export const ROUTES = {
  APP_ROOT: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TEMPLATES: '/templates',
  CANVAS: '/canvas',
} as const;

export default ENDPOINT;
