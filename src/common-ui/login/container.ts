import { Password } from '@mui/icons-material';
import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { setFormDisabled } from '@/redux/reducers/apiData';
import { setToLS } from '@/utils/localStorage';
import { IUserLogin } from '@/interfaces/authInterface';
import { FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const userLogin = async (data: IUserLogin) => {
    setIsLoading(true);
      try{
        const res = await FetchNonHeaderUtils.postRequest(
          `${ENDPOINT.AUTH.LOGIN}`,
          data
        );
        if (res.status === 200) {
          setToLS('token', res.data.accessToken);
          setToLS('isAuth', true);
          setTimeout(() => {
            window.location.replace(`${ROUTES.DASHBOARD}`);
            setIsLoading(false);
          }, 1000);
        } else {
          throw new Error('Failed to log in');
          setIsLoading(false);
        }
      } catch(error : any) {
        if (error && error?.status) {
           if (error.status === 401){
              setLoginError('Entered email or password are incorrect. Please check and try again.')
           }
        }
        setIsLoading(false);
      }
  };

  const handleLogin = () => {
    dispatch(setFormDisabled());
    if (email === '' || email === null) {
      setLoginError('Email field is empty. Please provide your email address.');
    } else if (password === '' || password === null) {
      setLoginError('Password field is empty. Please enter your password.');
    } else if (!validateEmail(email)) {
      setLoginError('Please enter a valid email address.');
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
    loginError,
    setLoginError,
    isLoading
  };
};
export default useLogin;
