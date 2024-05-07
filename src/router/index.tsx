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

export const authRoutes: RouteObject[] = [
  { path: ROUTES.APP_ROOT, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Navigate to={ROUTES.DASHBOARD} /> },
  { path: ROUTES.SIGNUP, element: <SignUp /> },
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.THEMES, element: <AppThemes /> },
  { path: ROUTES.CANVAS, element: <MainCanvas /> },
  { path: ROUTES.SETTINGS, element: <UserSettings /> },
  // { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  // { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export const defaultRoutes: RouteObject[] = [
  { path: ROUTES.APP_ROOT, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.SIGNUP, element: <SignUp /> },
  { path: ROUTES.DASHBOARD, element: <Protected /> },
  { path: ROUTES.THEMES, element: <Protected /> },
  { path: ROUTES.CANVAS, element: <Protected /> },
  { path: ROUTES.SETTINGS, element: <UserSettings /> },
  { path: ROUTES.ACTIVATION, element: <ActivateAccount /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
  {
    path: '/*',
    element: <NotFound />,
  },
];
