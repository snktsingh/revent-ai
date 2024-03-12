import AppRoutes from './router/route';
import { Token, isAuth, tempToken } from './utils/localStorage/data';
import DefaultRoutes from './router/unAuthRoute';

const Application = () => {
  if (isAuth && tempToken) {
    return <AppRoutes />;
  } else {
    return <DefaultRoutes />;
  }
};
export default Application;
