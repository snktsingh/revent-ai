import AppRoutes from './router/route';
import { Token, isAuth, tempToken } from './utils/localStorage/data';
import DefaultRoutes from './router/unAuthRoute';
import Feedback from './common-ui/feedback';

const Application = () => {
  if (isAuth && tempToken) {
    return <>
    <AppRoutes />
    <Feedback />
    </>;
  } else {
    return <DefaultRoutes />;
  }
};
export default Application;
