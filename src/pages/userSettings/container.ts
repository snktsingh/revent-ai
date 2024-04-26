import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserDetails } from '@/redux/thunk/user';
import React, { useEffect, useState } from 'react';

const useSettings = () => {
  const { userDetails } = useAppSelector(state => state.manageUser);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    dispatch(getUserDetails());
  },[])

  const [userDetailsInputs, setUserDetailsInputs] = useState({
    firstName: userDetails?.firstName || 'Unknown',
    lastName: userDetails?.lastName || 'User',
    username: '',
    email: userDetails?.email || 'example@examplemail.com',
    phone: userDetails?.phone || '123-4567-8901',
    linkedinUrl: userDetails?.linkedIn || '',
    usePreference : 'Personal',
    companyName : userDetails?.companyName || "",
    roleInCompany : userDetails?.companyRole || '',
    companySize: userDetails?.companySize ||  ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetailsInputs({ ...userDetailsInputs, [name]: value });
  };

  return { userDetails, userDetailsInputs, handleChange };
};

export default useSettings;
