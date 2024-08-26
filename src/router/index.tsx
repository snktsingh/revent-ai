import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { ROUTES } from '../constants/endpoint';
import App from '../pages/App';
import NotFound from '../pages/notFound';
import Login from '@/common-ui/login';
import SignUp from '@/common-ui/signup';
import Dashboard from '@/pages/dashboard';
import MainCanvas from '@/pages/canvas';
import AppThemes from '@/pages/themes';
import Home from '@/pages/homepage';
import Protected from '@/protected';
import UserSettings from '@/pages/userSettings';
import ActivateAccount from '@/common-ui/activateAccount';
import ForgotPasswordPage from '@/common-ui/forgotPassword';
import ResetPasswordPage from '@/common-ui/resetPassword';
import Terms from '@/pages/termsofuse';
import Tutorials from '@/pages/tutorials';
import { isMobile } from 'react-device-detect';


export const authRoutes: RouteObject[] = [
  { path: ROUTES.APP_ROOT, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Navigate to={ROUTES.DASHBOARD} /> },
  { path: ROUTES.SIGNUP, element: <SignUp /> },
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.THEMES, element: <AppThemes /> },
  { path: ROUTES.CANVAS, element: <MainCanvas /> },
  { path: ROUTES.SETTINGS, element: <Dashboard /> },
  { path: ROUTES.TERMS, element: <Terms /> },
  { path: ROUTES.TUTORIALS, element: <Dashboard /> },
  { path: ROUTES.LIBRARY, element: <Dashboard /> },
  { path: ROUTES.TEMPLATES, element: <Dashboard /> },

  // { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  // { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export const defaultRoutes: RouteObject[] = [
  { path: ROUTES.APP_ROOT, element: <Home /> },
  { path: ROUTES.LOGIN, element: !isMobile ? <Login /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.SIGNUP, element: !isMobile ? <SignUp /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.DASHBOARD, element: !isMobile ? <Protected /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.THEMES, element: !isMobile ? <Protected /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.CANVAS, element: !isMobile ? <Protected /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.SETTINGS, element: !isMobile ? <UserSettings /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.ACTIVATION, element: <ActivateAccount /> },
  { path: ROUTES.FORGOT_PASSWORD, element: !isMobile ? <ForgotPasswordPage /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.RESET_PASSWORD, element: !isMobile ? <ResetPasswordPage /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.TERMS, element: <Terms /> },
  { path: ROUTES.TUTORIALS, element: <Tutorials /> },
  { path: ROUTES.LIBRARY, element: !isMobile ? <Protected /> : <Navigate to={ROUTES.APP_ROOT} /> },
  { path: ROUTES.TEMPLATES, element: !isMobile ? <Protected /> : <Navigate to={ROUTES.APP_ROOT} /> },

  {
    path: '/*',
    element: <NotFound />,
  },
];
