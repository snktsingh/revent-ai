export const ENDPOINT = {
  GEN_PPT: 'ppt/generate-ppt',
  GEN_PPT_MULTI: 'ppt/generate-ppt-multi',
  THEMES: {
    GET_ALL_THEMES: '/template/get-all-themes',
  },
} as const;

export const ROUTES = {
  APP_ROOT: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  THEMES: '/themes',
  CANVAS: '/canvas',
} as const;

export default ENDPOINT;
