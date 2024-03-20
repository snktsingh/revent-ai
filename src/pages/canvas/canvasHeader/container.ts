import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { toast } from 'react-toastify';

const useCanvasHeader = () => {
  const userLogout = async () => {
    toast.promise(
      async () => {
        const res = await FetchUtils.postRequest(`${ENDPOINT.AUTH.LOGOUT}`, {});
        if (res.status === 200) {
          localStorage.clear();
          setTimeout(() => {
            window.location.replace(`${ROUTES.LOGIN}`);
          }, 2000);
        } else {
          throw new Error('Failed to log in');
        }
      },
      {
        pending: 'Logging out please wait...',
        success: 'Logout Successfully...',
      }
    );
  };
  return { userLogout };
};
export default useCanvasHeader;
