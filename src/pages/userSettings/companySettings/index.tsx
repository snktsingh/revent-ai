import React, { ChangeEvent, useState } from 'react';
import { InputContainer, ProfileContainer, StyledInput, Label, StyledSelect, PencilIcon } from '../style';
import { InputAdornment, MenuItem } from '@mui/material';
import useSettings from '../container';
import { IUserAccountDetails } from '@/interfaces/authInterface';

interface ProfileFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userDetails: IUserAccountDetails;
  editMode : boolean;
}

const CompanyDetails: React.FC<ProfileFormProps> = ({ handleChange, userDetails, editMode }) => {

  const { companyName, companySize, companyRole } = userDetails;


  return (
    <ProfileContainer>
      <InputContainer>
        <Label>Company Name</Label>
        <StyledInput
          disabled={editMode}
          value={companyName}
          name='companyName'
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Company Size</Label>
        <StyledInput
          disabled={editMode}
          value={companySize}
          name='companySize'
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Role in Company</Label>
        <StyledInput
          disabled={editMode}
          value={companyRole}
          name='companyRole'
          onChange={handleChange}
        />
      </InputContainer>
    </ProfileContainer>
  );
};

export default CompanyDetails;