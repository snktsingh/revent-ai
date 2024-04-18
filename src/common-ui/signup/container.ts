import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';
import { Password } from '@mui/icons-material';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface SignUpState {
  [key: string]: string;
}

const useSignup = () => {
  const [values, setValues] = useState<SignUpState>({
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    imageUrl: 'http://placehold.it/50x50',
    langKey: 'en',
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
    toast.promise(
      async () => {
        const res = await FetchNonHeaderUtils.postRequest(
          `${ENDPOINT.AUTH.SIGNIN}`,
          values
        );
        if (res.status === 201) {
          setTimeout(() => {
            setIsPreview(true);
          }, 1000);
        } else {
          throw new Error('Failed to log in');
        }
      },
      {
        pending: 'Registering please wait...',
        success: 'Registered Successfully...',
      }
    );
  };

  const handleSubmit = () => {
    for (const key in values) {
      if (values[key] === '') {
        toast.warning(`Please fill in ${key}`);
        return;
      }
    }
    if (confirmPassword === '') {
      toast.warning('Please confirm your password');
    } else if (values.password !== confirmPassword) {
      toast.warning('Please match the passwords');
    } else {
      handleRegister();
    }
    console.log(values);
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
