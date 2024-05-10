import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { setFormDisabled } from '@/redux/reducers/apiData';
import { setToLS } from '@/utils/localStorage';
import { IUserLogin } from '@/interfaces/authInterface';
import { FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const userLogin = async (data: IUserLogin) => {
    toast.promise(
      async () => {
        const res = await FetchNonHeaderUtils.postRequest(
          `${ENDPOINT.AUTH.LOGIN}`,
          data
        );
        if (res.status === 200) {
          setToLS('token', res.data.accessToken);
          setToLS('isAuth', true);
          setTimeout(() => {
            window.location.replace(`${ROUTES.APP_ROOT}`);
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
      toast.warning('Email field is empty. Please provide your email address.');
    } else if (password === '' || password === null) {
      toast.warning('Password field is empty. Please enter your password.');
    } else if (!validateEmail(email)) {
      toast.warning('Please enter a valid email address.');
    } else {
      userLogin({
        username: email,
        password: password,
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
