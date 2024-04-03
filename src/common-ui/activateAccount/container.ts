import ENDPOINT from '@/constants/endpoint';
import { FetchNonHeaderUtils } from '@/utils/fetch-utils';
import { useEffect, useState } from 'react';

const useActivate = () => {
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const activateAccount = async (key: string) => {
    const res = await FetchNonHeaderUtils.getRequest(
      `${ENDPOINT.USER.VERIFY_ACCOUNT}?key=${key}`
    );
    if (res.data.message === 'SUCCESS') {
      setIsActivated(true);
    }
  };

  useEffect(() => {
    const temp = window.location.search;
    const key = temp.slice(5);
    setTimeout(() => {
      activateAccount(key);
    }, 1500);
  }, []);

  return { isActivated };
};
export default useActivate;
