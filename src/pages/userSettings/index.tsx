import {
  ButtonContainer,
  ChevronIcon,
  IconButton,
  MainSettingsContainer,
  ProfileAvatarText,
  ProfileImage,
  ProfileImgContainer,
  ProfileTitle,
  RightSideContainer,
  SectionTitle,
  SectionTitleContainer,
  SettingsContainer,
  SideBar,
  StyledTab,
  StyledTabs,
} from './style';
import { Link } from 'react-router-dom';
import { Logo } from '@/constants/media';
import {
  GridRowCenter,
  GridRowEven,
  StackColCenter,
} from '@/styles/common-styles/style';
import { ROUTES } from '@/constants/endpoint';
import { theme } from '@/constants/theme';
import ProfileMenu from '@/common-ui/profileMenu';
import ProfileSettings from './profileSettings';
import LinkedinSettings from './linkedinSettings';
import CompanyDetails from './companySettings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateUserDetails } from '@/redux/thunk/user';
import BreadCrumb from './navigationBreadcrumb';
import useSettings from './container';
import { IUserAccountDetails } from '@/interfaces/authInterface';
import { toast } from 'react-toastify';
import { error } from 'console';
import NavBar from '@/common-ui/NavBar';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const initialUserDetails = {
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
};

const UserSettings: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [userAccountOrg, setUserAccount] =
    useState<IUserAccountDetails>(initialUserDetails);
  const [userDetails, setUserDetails] =
    useState<IUserAccountDetails>(initialUserDetails);

  const { editMode, setEditMode } = useSettings();
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const userDetailsFrmStore = useAppSelector(state => state.manageUser);
  const [isImageBroken, setIsImageBroken] = useState(false);
  const dispatch = useAppDispatch();

  const handleImageError = () => {
    setIsImageBroken(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  // const TabComponents = () => {
  //   switch (tab) {
  //     case 1:
  //       return (
  //         <ProfileSettings />
  //       );
  //     case 2:
  //       return (
  //         <LinkedinSettings />
  //       );
  //     case 3:
  //       return (
  //         <CompanyDetails />
  //       );
  //     default:
  //       return (
  //         <div>
  //           {/* Default content */}
  //           <p>Default tab content</p>
  //         </div>
  //       );
  //   }
  // };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  function getFirstLettersForAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  useEffect(() => {
    if(userDetailsFrmStore.userDetails){
      setUserDetails(userDetailsFrmStore.userDetails);
      setUserAccount(userDetailsFrmStore.userDetails);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleUpdateUserDetails = () => {
    const propertiesToCheck: (keyof IUserAccountDetails)[] = [
      'firstName',
      'lastName',
      'email',
      'linkedIn',
      'phone',
      'companyName',
      'companySize',
      'companyRole',
    ];
    let edited = false;

    if (userDetails.linkedIn && !isValidLinkedInUrl(userDetails.linkedIn)) {
      toast.warning('Please add a valid LinkedIn URL.');
      return;
    }

    for (const property of propertiesToCheck) {
      if (userAccountOrg[property] !== userDetails[property]) {
        edited = true;
        break;
      }
    }

    if (edited) {
      dispatch(updateUserDetails(userDetails))
        .then(res => {
          toast.success('User details have been updated!');
          setEditMode(true);
        })
        .catch(error => {
          toast.info('Something Went Wrong!');
          setEditMode(true);
        });
    } else {
      setEditMode(true);
      toast.info('No changes were made to user details.');
    }
  };

  const isValidLinkedInUrl = (url: string): boolean => {
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedInRegex.test(url);
  };

  return (
    <>
      <NavBar />
      {/* main settings */}
      <MainSettingsContainer>
        <BreadCrumb />
        <SettingsContainer>
          <SideBar>
            <ProfileImgContainer>
              {!isImageBroken ? (
                <ProfileImage
                  src="https//img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  alt="Rashesh Majithia"
                  onError={handleImageError}
                />
              ) : (
                <ProfileAvatarText>
                  {(userDetails?.firstName || '').slice(0, 1)}
                  {(userDetails?.lastName || '').slice(0, 1)}
                </ProfileAvatarText>
              )}
              <ProfileTitle>
                {userDetails?.firstName} {userDetails?.lastName}
              </ProfileTitle>
            </ProfileImgContainer>

            <StyledTabs>
              <StyledTab
                isactive={tab === 1}
                onClick={() => setTab(1)}
                endIcon={<ChevronIcon />}
              >
                General Settings
              </StyledTab>
            </StyledTabs>
          </SideBar>

          <RightSideContainer>
            <SectionTitleContainer>
              <SectionTitle>Personal Details</SectionTitle>
            </SectionTitleContainer>
            <ProfileSettings
              handleChange={handleChange}
              userDetails={userDetails}
              editMode={editMode}
            />
            <SectionTitleContainer>
              <SectionTitle>Company Details</SectionTitle>
            </SectionTitleContainer>
            <CompanyDetails
              handleChange={handleChange}
              userDetails={userDetails}
              editMode={editMode}
            />

            <ButtonContainer>
              <IconButton
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleUpdateUserDetails}
                disabled={editMode}
              >
                Save
              </IconButton>
              <IconButton
                variant="contained"
                startIcon={editMode ? <EditIcon /> : <CancelIcon />}
                onClick={toggleEditMode}
              >
                {editMode ? 'Edit' : 'Cancel'}
              </IconButton>
            </ButtonContainer>
          </RightSideContainer>
        </SettingsContainer>
      </MainSettingsContainer>
    </>
  );
};

export default UserSettings;
