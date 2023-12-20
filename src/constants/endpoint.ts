export const API_BASE_URL = 'http://3.108.53.183:8080/api/';

export const ENDPOINT = {
  TEST: `${API_BASE_URL}/test`,
  GEN_PPT: 'ppt/generate-ppt',
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
