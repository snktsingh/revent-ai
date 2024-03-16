import React, { useState } from 'react';
import { InputContainer, ProfileContainer, StyledInput, Label, StyledSelect, PencilIcon } from '../style';
import { InputAdornment, MenuItem } from '@mui/material';


const CompanyDetails = () => {
    const [companyName, setCompanyName] = useState('Revent');
    const [companySize, setCompanySize] = useState('10-20');
    const [roleInCompany, setRoleInCompany] = useState('Developer');
  
    const handleCompanyNameChange = (event : any) => {
      setCompanyName(event.target.value);
    };
  
    const handleCompanySizeChange = (event : any) => {
      setCompanySize(event.target.value);
    };
  
    const handleRoleInCompanyChange = (event : any) => {
      setRoleInCompany(event.target.value);
    };
  
    return (
      <ProfileContainer>
        <InputContainer>
          <Label>Company Name</Label>
          <StyledInput
            variant="standard"
            value={companyName}
            onChange={handleCompanyNameChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PencilIcon />
                </InputAdornment>
              )
            }}
          />
        </InputContainer>
        <InputContainer>
          <Label>Company Size</Label>
          <StyledInput
            variant="standard"
            value={companySize}
            onChange={handleCompanySizeChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PencilIcon />
                </InputAdornment>
              )
            }}
          />
        </InputContainer>
        <InputContainer>
          <Label>Role in Company</Label>
          <StyledInput
            variant="standard"
            value={roleInCompany}
            onChange={handleRoleInCompanyChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PencilIcon />
                </InputAdornment>
              )
            }}
          />
        </InputContainer>
      </ProfileContainer>
    );
  };
  
  export default CompanyDetails;