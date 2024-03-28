import { TextField } from '@mui/material';
import {
  CardContainer,
  CardLink,
  CardTitle,
  Loader,
  LoaderText,
  MainContainer,
  PreviewCard,
  Title,
} from './style';
import slideData from './data.json';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { getUserDetails } from '@/redux/thunk/user';
import { MagnifyingGlass } from 'react-loader-spinner';

import '../../../index.css';
import { theme } from '@/constants/theme';
import { fetchPPTList } from '@/redux/thunk/dashboard';
import { Preview } from '@mui/icons-material';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector(state => state.manageUser);
  const { loadingUserDetails, pptList } = useAppSelector(
    state => state.manageDashboard
  );

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(fetchPPTList());
  }, []);

  return (
    <MainContainer>
      <h3>Hello {userDetails?.firstName} !</h3>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Create a Presentation</Title>
        <TextField
          id="outlined-basic"
          label="Search presentation"
          variant="outlined"
        />
      </span>
      <br />
      <CardContainer>
        {slideData.templates.map((slide, index) => {
          return (
            <CardTitle onClick={() => navigate('/themes')}>
              <CardLink>
                <PreviewCard />
                {slide.title}
              </CardLink>
            </CardTitle>
          );
        })}
      </CardContainer>
      <Title>Recent Presentations</Title>

      {loadingUserDetails === false ? (
        <>
          <CardTitle>
            <CardLink>
              <ThumbnailPreview src="https://revent-ppt-output.s3.amazonaws.com/thumbnails/TRIDENT-3ebe416994459888769625469_.png" alt='thumbnail' style={{width: '14vw',height:'15vh'}}/>
              <p>untitled-presentation</p>
            </CardLink>
          </CardTitle>
        </>
      ) : (
        <Loader>
          No Recent Presentations
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            glassColor="#c0efff"
            color={`${theme.colorSchemes.light.palette.primary.main}`}
          />
          <br />
          <LoaderText>
            Gathering your Spectacular Presentations. Please hold tight...
          </LoaderText>
        </Loader>
      )}
    </MainContainer>
  );
};
export default Dashboard;
