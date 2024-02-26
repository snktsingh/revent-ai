import { RouteObject, useRoutes } from 'react-router-dom';
import { ROUTES } from '../constants/endpoint';
import App from '../pages/App';
import NotFound from '../pages/notFound';
import Login from '@/common-ui/login';
import SignUp from '@/common-ui/signup';
import Dashboard from '@/pages/dashboard';
import MainCanvas from '@/pages/canvas';
import AppThemes from '@/pages/themes';

const allRoutes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <App />,
  },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.SIGNUP, element: <SignUp /> },
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.THEMES, element: <AppThemes /> },
  { path: ROUTES.CANVAS, element: <MainCanvas /> },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export default function Router() {
  const route = useRoutes(allRoutes);
  return route;
}
