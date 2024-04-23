import { MenuItem, Tooltip } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import useSettings from '../container';
import { InputContainer, Label, ProfileContainer, StyledInput, StyledSelect } from '../style';

interface ProfileSettingsType {
    editMode: boolean
}

const ProfileSettings: React.FC<ProfileSettingsType> = ({ editMode }) => {

    const { userDetails, userDetailsInputs, handleChange } = useSettings();

    const { firstName, lastName, username, phone, email, linkedinUrl, usePreference } = userDetailsInputs;

    return (
        <ProfileContainer>
            <InputContainer>
                <Label>First Name</Label>
                <StyledInput
                    // variant="standard"
                    name='firstName'
                    value={firstName}
                    disabled={editMode}
                    onChange={handleChange}
                // InputProps={{
                //     endAdornment: (
                //         <InputAdornment position="end">
                //             <PencilIcon />
                //         </InputAdornment>
                //     )
                // }}
                />
            </InputContainer>
            <InputContainer>
                <Label>Last Name</Label>
                <StyledInput
                    // variant="standard"
                    name='lastName'
                    value={lastName}
                    disabled={editMode}
                    onChange={handleChange}
                // InputProps={{
                //     endAdornment: (
                //         <InputAdornment position="end">
                //             <PencilIcon />
                //         </InputAdornment>
                //     )
                // }}
                />
            </InputContainer>
            <InputContainer>
                <Label>Mobile Number</Label>
                {!editMode ? (
                    <Tooltip title="Phone number is not editable" arrow>
                        <span>
                            <StyledInput
                                // variant="standard"
                                name='phone'
                                value={phone}
                                disabled={true}
                                onChange={handleChange}
                            />
                        </span>
                    </Tooltip>
                ) : (
                    <StyledInput
                        // variant="standard"
                        name='phone'
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
                                // variant="standard"
                                disabled={true}
                                name='email'
                                value={email}
                                onChange={handleChange}
                            />
                        </span>
                    </Tooltip>
                ) : (
                    <StyledInput
                        // variant="standard"
                        disabled={true}
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                )}
            </InputContainer>
            <InputContainer>
                <Label>Select Preference</Label>
                <StyledSelect
                    labelId="dropdown-label"
                    // variant="standard"
                    value={usePreference}
                    name='userPreference'
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
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
                    // variant="standard"
                    value={linkedinUrl}
                    name='linkedinUrl'
                    onChange={handleChange}
                    disabled={editMode}
                // InputProps={{
                //     endAdornment: (
                //         <InputAdornment position="end">
                //             <PencilIcon />
                //         </InputAdornment>
                //     )
                // }}
                />
            </InputContainer>

        </ProfileContainer>
    )
}

export default ProfileSettings;