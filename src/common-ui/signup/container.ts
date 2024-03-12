import ENDPOINT, { ROUTES } from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
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
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleRegister = async () => {
    toast.promise(
      async () => {
        const res = await FetchUtils.postRequest(
          `${ENDPOINT.AUTH.SIGNIN}`,
          values
        );
        if (res.status === 200) {
          setTimeout(() => {
            window.location.replace(`${ROUTES.LOGIN}`);
          }, 1500);
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

  return {
    values,
    setValues,
    handleChange,
    confirmPassword,
    isDisabled,
    setIsDisabled,
    handleSubmit,
    setConfirmPassword,
  };
};
export default useSignup;
