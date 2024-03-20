import React, { useState } from 'react';
import { InputContainer, ProfileContainer, StyledInput, Label, StyledSelect, PencilIcon, SectionTitle } from '../style';
import { InputAdornment, MenuItem } from '@mui/material';

interface ProfileSettingsType {
    editMode : boolean
}

const ProfileSettings : React.FC<ProfileSettingsType> = ({editMode}) => {

    const [firstName, setFirstName] = useState('Admin');
    const [lastName, setLastName] = useState('One');
    const [username, setUsername] = useState('admin123');
    const [email, setEmail] = useState('admin@localhost.com');
    const [phone, setPhone] = useState('123-456-7890');
    const [linkedinUrl, setLinkedinUrl] = useState('https://www.linkedin.com/in/example_username')
    

    return (
        <ProfileContainer>
            <InputContainer>
                <Label>First Name</Label>
                <StyledInput
                    // variant="standard"
                    value={firstName}
                    disabled={editMode}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    disabled={editMode}
                    onChange={(e) => setLastName(e.target.value)}
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
                <StyledInput
                    // variant="standard"
                    value={phone}
                    disabled={editMode}
                    onChange={(e) => setPhone(e.target.value)}
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
                <Label>Email</Label>
                <StyledInput
                    // variant="standard"
                    disabled={editMode}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Label>Username</Label>
                <StyledInput
                    // variant="standard"
                    value={username}
                    onChange={(e) => setFirstName(e.target.value)}
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
            <InputContainer>
                <Label>Select Preference</Label>
                <StyledSelect
                    labelId="dropdown-label"
                    // variant="standard"
                    value={"Personal"}
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
                    onChange={(e) => setLinkedinUrl(e.target.value)}
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