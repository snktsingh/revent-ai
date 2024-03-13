export const ENDPOINT = {
  GEN_PPT: 'ppt/generate-ppt',
  GEN_PPT_MULTI: 'ppt/generate-ppt-multi',
  THEMES: {
    GET_ALL_THEMES: '/template/get-all-themes',
  },
  AUTH: {
    AUTHENTICATE: '/authenticate',
    LOGIN: '/authentication',
    LOGOUT: '/logout',
    SIGNIN: '/register',
  },
} as const;

export const ROUTES = {
  APP_ROOT: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  THEMES: '/themes',
  CANVAS: '/canvas',
  SETTINGS : '/settings'
} as const;

export default ENDPOINT;
