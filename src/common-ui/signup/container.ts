import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';
import { Password } from '@mui/icons-material';
import { count, error } from 'console';
import { useState } from 'react';

interface SignUpState {
  [key: string]: string;
}

interface ValidationState {
  title: string;
  message: string;
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
    country: ''
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState<ValidationState>({ title: '', message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleCountryChange = (country: string) => {
    setValues({...values, country})
  };

  const handleRegister = async () => {
    values.login = values.email;
    setLoading(true);
    try {
      const res = await FetchNonHeaderUtils.postRequest(
        `${ENDPOINT.AUTH.SIGNIN}`,
        values
      );
      if (res.status === 201) {
        setTimeout(() => {
          setIsPreview(true);
        }, 1000);
        setValidation({ title: 'Success', message: 'Registered Successfully...' });
      } else {
        throw new Error('Failed to log in');
      }
    } catch (error : any) {
      console.log(error)
      if (error.data.message === "emailexists") {
        setValidation({ title: 'email', message: 'This account already exists. Please log in instead.' });
      } else {
        console.error(error);
        setValidation({ title: 'Error', message: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    values.login = values.email;
    for (const key in values) {
      if (values[key] === '' && key !== 'country') {
        console.log({key})
        setValidation({ title: key, message: `Please enter your ${key.toLowerCase()}` });        
        return;
      }
    }
    if (!validateEmail(values.email)) {
      setValidation({ title: 'email', message: 'Please enter a valid email address' });
    } else if (confirmPassword === '') {
      setValidation({ title: 'Confirm Password', message: 'Please confirm your password' });
    } else if (values.password !== confirmPassword) {
      setValidation({ title: 'password', message: 'Passwords do not match. Please try again.' });
    } else if (!validatePassword(values.password)) {
      setValidation({ title: 'password', message: 'Password must be 8+ characters with uppercase, lowercase, numbers, and special characters.' });    
    } else if (values.country === '') {
      setValidation({ title: 'country', message: 'Please select your country' });
    } else {
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
    handleClickShowConfirmPassword,
    validation,
    loading,
    handleCountryChange
  };
};
export default useSignup;