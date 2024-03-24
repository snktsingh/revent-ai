import { useAppSelector } from '@/redux/store';
import React, { useState } from 'react';

const useSettings = () => {
  const { userDetails } = useAppSelector(state => state.manageUser);
  
  const [userDetailsInputs, setUserDetailsInputs] = useState({
    firstName: userDetails?.firstName || 'Unknown',
    lastName: userDetails?.lastName || 'User',
    username: 'admin123',
    email: userDetails?.email || 'example@examplemail.com',
    phone: '123-456-7890',
    linkedinUrl: 'https://www.linkedin.com/in/example_username',
    usePreference : 'Personal',
    companyName : "Revent",
    roleInCompany : 'Developer',
    companySize: '10-20'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetailsInputs({ ...userDetailsInputs, [name]: value });
  };

  return { userDetails, userDetailsInputs, handleChange };
};

export default useSettings;
