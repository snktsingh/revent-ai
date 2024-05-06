import { IUserAccountDetails } from '@/interfaces/authInterface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserDetails, updateUserDetails } from '@/redux/thunk/user';
import React, { useEffect, useState } from 'react';

const useSettings = () => {
  // const { userDetails } = useAppSelector(state => state.manageUser);
  const [editMode, setEditMode] = useState(true);
  const [userAccount, setUserAccount] = useState({});
  const [userDetails, setUserDetails] = useState<IUserAccountDetails>({
    id: null,
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: 'http://placehold.it/50x50',
    activated: true,
    langKey: 'en',
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    authorities: [''],
    linkedIn: '',
    phone: '',
    companyName: '',
    companySize: '',
    companyRole: '',
    termsConditionId: null,
    userCredit: null,
  });
  const dispatch = useAppDispatch();
  const [userDetailsInputs, setUserDetailsInputs] = useState({
    firstName: userDetails?.firstName || 'Unknown',
    lastName: userDetails?.lastName || 'User',
    username: '',
    email: userDetails?.email || 'example@examplemail.com',
    phone: userDetails?.phone || '123-4567-8901',
    linkedinUrl: userDetails?.linkedIn || '',
    usePreference: 'Personal',
    companyName: userDetails?.companyName || '',
    roleInCompany: userDetails?.companyRole || '',
    companySize: userDetails?.companySize || '',
  });

  // useEffect(() => {
  //   dispatch(getUserDetails()).then(res => {
  //     setUserDetails(res.payload);
  //     // setUserAccount(res.payload);
  //   });
  // }, []);

  

  const handleUpdateUserDetails = () => {
    //  dispatch(updateUserDetails(userDetails))
    console.log({userAccount})
  };

  return {
    userDetailsInputs,
    editMode,
    setEditMode,
    handleUpdateUserDetails,
  };
};

export default useSettings;
