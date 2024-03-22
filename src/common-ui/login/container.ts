import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { setFormDisabled } from '@/redux/reducers/apiData';
import { setToLS } from '@/utils/localStorage';
import { IUserLogin } from '@/interfaces/authInterface';
import { FetchUtils } from '@/utils/fetch-utils';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const userLogin = async (data: IUserLogin) => {
    toast.promise(
      async () => {
        const res = await FetchUtils.postRequest(
          `${ENDPOINT.AUTH.LOGIN}`,
          data
        );
        if (res.status === 200) {
          console.log(res.data);
          setToLS('token', res.data.accessToken);
          setToLS('isAuth', true);
          setTimeout(() => {
            window.location.replace(`${ROUTES.DASHBOARD}`);
          }, 1000);
        } else {
          throw new Error('Failed to log in');
        }
      },
      {
        pending: 'Logging in please wait...',
      }
    );
  };

  const handleLogin = () => {
    dispatch(setFormDisabled());
    if (email === '' || email === null) {
      toast.warning('Email is empty');
    } else if (password === '' || password === null) {
      toast.warning('Password is empty');
    } else {
      userLogin({
        username: email,
        password: password,
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailPattern,
    passwordPattern,
  };
};
export default useLogin;
