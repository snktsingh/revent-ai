import React, { ChangeEvent, useState } from 'react';
import { InputContainer, ProfileContainer, StyledInput, Label, StyledSelect, PencilIcon } from '../style';
import { InputAdornment, MenuItem } from '@mui/material';
import useSettings from '../container';

interface CompanySettingsType {
  editMode: boolean
}

const CompanyDetails: React.FC<CompanySettingsType> = ({ editMode }) => {
  const { userDetailsInputs, handleChange } = useSettings();

  const { companyName, companySize, roleInCompany } = userDetailsInputs;


  return (
    <ProfileContainer>
      <InputContainer>
        <Label>Company Name</Label>
        <StyledInput
          // variant="standard"
          disabled={editMode}
          value={companyName}
          name='companyName'
          onChange={handleChange}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <PencilIcon />
        //     </InputAdornment>
        //   )
        // }}
        />
      </InputContainer>
      <InputContainer>
        <Label>Company Size</Label>
        <StyledInput
          // variant="standard"
          disabled={editMode}
          value={companySize}
          name='companySize'
          onChange={handleChange}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <PencilIcon />
        //     </InputAdornment>
        //   )
        // }}
        />
      </InputContainer>
      <InputContainer>
        <Label>Role in Company</Label>
        <StyledInput
          // variant="standard"
          disabled={editMode}
          value={roleInCompany}
          name='roleInCompany'
          onChange={handleChange}
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <PencilIcon />
        //     </InputAdornment>
        //   )
        // }}
        />
      </InputContainer>
    </ProfileContainer>
  );
};

export default CompanyDetails;