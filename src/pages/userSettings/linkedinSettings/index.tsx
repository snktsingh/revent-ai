import React, { useState } from 'react';
import { InputContainer, ProfileContainer, StyledInput, Label, StyledSelect, PencilIcon } from '../style';
import { InputAdornment, MenuItem } from '@mui/material';

const LinkedinSettings = () => {

    const [age, setAge] = React.useState('24');
    const [gender, setGender] = React.useState('Male');
    const [location, setLocation] = React.useState('Mumbai');
    const [company, setCompany] = React.useState('Revent');
    const [role, setRole] = React.useState('Designer');

    const handleAgeChange = (event : any) => {
        setAge(event.target.value);
    };

    const handleGenderChange = (event : any) => {
        setGender(event.target.value);
    };

    const handleLocationChange = (event : any) => {
        setLocation(event.target.value);
    };

    const handleCompanyChange = (event : any) => {
        setCompany(event.target.value);
    };

    const handleRoleChange = (event : any) => {
        setRole(event.target.value);
    };

    return (
        <ProfileContainer>
            <InputContainer>
                <Label>Age</Label>
                <StyledInput
                    variant="standard"
                    value={age}
                    onChange={handleAgeChange}
                    disabled={true}
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
                <Label>Gender</Label>
                <StyledSelect
                    variant="standard"
                    value={"Male"}
                    onChange={() => { }} // Placeholder handler, update as needed
                    disabled={true}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </StyledSelect>
            </InputContainer>
            <InputContainer>
                <Label>Location</Label>
                <StyledInput
                    variant="standard"
                    value={location}
                    onChange={handleLocationChange}
                    disabled={true}
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
                <Label>Company</Label>
                <StyledInput
                    variant="standard"
                    value={company}
                    onChange={handleCompanyChange}
                    disabled={true}
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
                <Label>Role</Label>
                <StyledInput
                    variant="standard"
                    value={role}
                    onChange={handleRoleChange}
                    disabled={true}
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
    )
}

export default LinkedinSettings