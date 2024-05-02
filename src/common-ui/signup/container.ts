import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';
import { Password } from '@mui/icons-material';
import { error } from 'console';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface SignUpState {
  [key: string]: string;
}

const useSignup = () => {
  const [values, setValues] = useState<SignUpState>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    imageUrl: 'http://placehold.it/50x50',
    langKey: 'en',
    login: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleRegister = async () => {
    values.login = values.email;
    toast.promise(
      async () => {
        try {
          const res = await FetchNonHeaderUtils.postRequest(
            `${ENDPOINT.AUTH.SIGNIN}`,
            values
          );
          if (res.status === 201) {
            setTimeout(() => {
              setIsPreview(true);
            }, 1000);
            toast.success('Registered Successfully...');
          } else {
            throw new Error('Failed to log in');
          }
        } catch (error : any) {
          if (error.message === "emailexists") {
            toast.info('This account already exists. Please log in instead.');
          } else {
            console.error(error);
            toast.error('An unexpected error occurred. Please try again later.');
          }
        }
      },
      {
        pending: 'Registering please wait...',
      }
    );
  };

  const handleSubmit = () => {
    values.login = values.email;
    for (const key in values) {
      if (values[key] === '') {
        toast.warning(`Please fill in ${key}`);
        return;
      }
    }
    if(!validateEmail(values.email)){
      toast.warning('Please enter a valid email address');
    }else if (confirmPassword === '') {
      toast.warning('Please confirm your password');
    } else if (values.password !== confirmPassword) {
      toast.warning('Please match the passwords');
    } else if(!validatePassword(values.password)){
      toast.warning('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.');
    }
     else {
      handleRegister();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password)
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return {
    values,
    setValues,
    handleChange,
    confirmPassword,
    isDisabled,
    setIsDisabled,
    handleSubmit,
    setConfirmPassword,
    setIsPreview,
    isPreview,
    handleClickShowPassword,
    handleMouseDownPassword,
    showPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword
  };
};
export default useSignup;
