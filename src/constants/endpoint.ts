export const ENDPOINT = {
  GEN_PPT: 'ppt/generate-ppt',
  GEN_PPT_MULTI: 'ppt/generate-ppt-multi',
  GEN_PPT_IMAGES: 'ppt/generate-ppt-with-images',
  THEMES: {
    GET_ALL_THEMES: '/template/get-all-themes',
  },
  AUTH: {
    AUTHENTICATE: '/authenticate',
    LOGIN: '/authentication',
    LOGOUT: '/logout',
    SIGNIN: '/register',
  },
  USER: {
    GET_DETAILS: '/account',
    VERIFY_ACCOUNT: '/activate',
    CREDIT_AMOUNT: '/user-credit',
    RESET_PASS_INIT: '/account/reset-password/init',
    RESET_PASS_FINISH: '/account/reset-password/finish',
    USER_PREFERENCE: '/user-preferences',
  },
  PPT: {
    CREATE_PPT: 'ppt/create-presentation',
    UPDATE_PPT_NAME: 'ppt/update-presentation-name',
    DELETE_PPT: 'ppt/delete-presentation',
    GET_PPT_DETAILS: 'ppt/get-presentation',
    CANVAS_JSON: '/canvas-data',
    UPDATE_THEME: 'ppt/change-theme',
    UPLOAD_THEME: '/template/upload-custom',
    DOWNLOAD_PRESENTATION: '/ppt/download-presentation',
    UPDATE_ACTIVE_VARIANT: '/ppt/update-active-slide',
    CREATE_DOC_PPT: '/ppt/transform',
  },
  DASHBOARD: {
    FETCH_PPT_LIST: 'ppt/get-all-presentation',
    FETCH_PRESETS:"/presets"
  },
} as const;

export const ROUTES = {
  APP_ROOT: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  DASHBOARD: '/my-presentations',
  THEMES: '/themes',
  CANVAS: '/presentation/:id',
  SETTINGS: '/settings',
  ACTIVATION: '/activation',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  TERMS: '/terms-of-use',
  PRIVACY: '/privacy-policy',
} as const;

export default ENDPOINT;
