export const API_BASE_URL = 'http://api.revent.ai:8080/api/';

export const ENDPOINT = {
  TEST: `${API_BASE_URL}/test`,
  GEN_PPT: 'ppt/generate-ppt',
  GEN_PPT_MULTI : 'ppt/generate-ppt-multi',
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
