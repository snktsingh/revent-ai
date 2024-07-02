import { MenuItem, Tooltip } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import useSettings from '../container';
import {
  InputContainer,
  Label,
  ProfileContainer,
  StyledInput,
  StyledSelect,
} from '../style';
import { IUserAccountDetails } from '@/interfaces/authInterface';

interface ProfileFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userDetails: IUserAccountDetails;
  editMode: boolean;
}

const ProfileSettings: React.FC<ProfileFormProps> = ({
  handleChange,
  userDetails,
  editMode,
}) => {
  const { userDetailsInputs } = useSettings();

  const { firstName, lastName, phone, email, linkedIn } = userDetails;

  return (
    <ProfileContainer>
      <InputContainer>
        <Label>First Name</Label>
        <StyledInput
          name="firstName"
          value={firstName}
          disabled={editMode}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Last Name</Label>
        <StyledInput
          name="lastName"
          value={lastName}
          disabled={editMode}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <Label>Mobile Number</Label>
        {!editMode ? (
          <Tooltip title="Phone number is not editable" arrow>
            <span>
              <StyledInput
                name="phone"
                value={phone}
                disabled={true}
                onChange={handleChange}
              />
            </span>
          </Tooltip>
        ) : (
          <StyledInput
            name="phone"
            value={phone}
            onChange={handleChange}
            disabled={true}
          />
        )}
      </InputContainer>
      <InputContainer>
        <Label>Email</Label>
        {!editMode ? (
          <Tooltip title="Email is not editable" arrow>
            <span>
              <StyledInput
                disabled={true}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </span>
          </Tooltip>
        ) : (
          <StyledInput
            disabled={true}
            name="email"
            value={email}
            onChange={handleChange}
          />
        )}
      </InputContainer>
      <InputContainer>
        <Label>Select Preference</Label>
        <StyledSelect
          labelId="dropdown-label"
          value={'Personal'}
          name="userPreference"
          onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
          disabled={editMode}
        >
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Academic">Academic</MenuItem>
        </StyledSelect>
      </InputContainer>

      <InputContainer>
        <Label>Linkedin Url</Label>
        <StyledInput
          value={linkedIn}
          name="linkedIn"
          onChange={handleChange}
          disabled={editMode}
        />
      </InputContainer>
    </ProfileContainer>
  );
};

export default ProfileSettings;
