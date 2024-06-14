import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import {
  BlankImageCard,
  CardContainer,
  CardLink,
  CardTitle,
  Loader,
  LoaderText,
  MainContainer,
  NewPPTCard,
  PPTCard,
  PPTTitle,
  PreviewCard,
  ThumbnailCard,
  Title,
  TitleCard,
} from './style';
import slideData from './data.json';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import '../../../index.css';
import { theme } from '@/constants/theme';
import {
  IPresentation,
  fetchPPTList,
  fetchPresets,
  togglePresetOpened,
} from '@/redux/thunk/dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import useDashboard from './container';
import ProfileMenu from '@/common-ui/profileMenu';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { faker } from '@faker-js/faker';
import {
  Blank,
  CancelUpload,
  DeleteFile,
  Folder,
  Proceed,
  UploadTick,
} from '@/constants/media';
import NavBar from '@/common-ui/NavBar';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardBox, UploadSubtitle } from '../homepage/style';
import { setSelectedDocFile } from '@/redux/reducers/theme';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const Dashboard = ({ onFileSelect }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isDeletePptAlertOpen,
    openProfileMenu,
    handleCloseProfileMenu,
    handleOpenProfile,
    handleDeletePpt,
    handleClose,
    setPptId,
    pptId,
    removePresentation,
    getFirstLettersForAvatar,
    setOpenProfileMenu,
    handlePptDelCheckBox,
    fetchPreset,
  } = useDashboard();

  const { userDetails } = useAppSelector(state => state.manageUser);
  const { loadingUserDetails, pptList, presetList } = useAppSelector(
    state => state.manageDashboard
  );
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);
  useEffect(() => {
    dispatch(fetchPPTList(0));
    dispatch(fetchPresets());

    function handleClick(e: any) {
      if (contextMenuRef.current) {
        if (
          !contextMenuRef.current.contains(e.target) &&
          e.target.id !== 'more_menu'
        ) {
          setContextMenu(null);
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleMore = async () => {
    await dispatch(fetchPPTList(1));
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPptList, setFilteredPptList] = useState<IPresentation[]>([]);
  // const filteredPptList =
  //   searchTerm.length > 0
  //     ? pptList.filter((ppt: IPresentation) =>
  //         ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     : pptList;

  useEffect(() => {
    const filteredList =
      searchTerm.length > 0
        ? pptList.filter((ppt: IPresentation) =>
            ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : pptList;

    setFilteredPptList(filteredList);
  }, [pptList, searchTerm]);

  const handleContextMenu = (event: React.MouseEvent, presentation: any) => {
    event.preventDefault();
    setCurrentPresentation(presentation);
    setContextMenu({ x: event.clientX, y: event.clientY });
    // setContextMenu(contextMenu === null ? { x: event.clientX, y: event.clientY } : null);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const inputRef = React.createRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
      dispatch(setSelectedDocFile(selected));
      onFileSelect(selected);
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      const droppedFile = files[0];
      setSelectedFile(droppedFile);
      dispatch(setSelectedDocFile(droppedFile));
      onFileSelect(droppedFile);
    }
  };

  const handleDocsPPt = async () => {
    navigate('/themes');
  };

  return (
    <>
      <NavBar />
      <MainContainer>
        <ProfileMenu
          anchorElForProfileMenu={openProfileMenu}
          handleCloseProfileMenu={handleCloseProfileMenu}
          setAnchorElForProfileMenu={setOpenProfileMenu}
        />
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title>Create a Presentation</Title>
        </span>
        <br />
        <CardContainer>
          {slideData.templates.map((slide, index) => {
            return (
              <NewPPTCard
                key={slide.title + index}
                onClick={() => navigate('/themes')}
              >
                <CardLink>
                  <PreviewCard>
                    <AddToQueueIcon
                      sx={{
                        fontSize: '3rem',
                        color: `${theme.colorSchemes.light.palette.primary.main}`,
                      }}
                    />
                  </PreviewCard>
                  <span title={slide.title}>{slide.title}</span>
                </CardLink>
              </NewPPTCard>
            );
          })}
          <CardLink>
            <PreviewCard>
              <CardBox
                style={{
                  border: 'none',
                }}
              >
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  onClick={handleContainerClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".docx,.doc"
                    onChange={handleFileChange}
                    ref={inputRef}
                    style={{ display: 'none' }}
                  />
                  {selectedFile !== null ? (
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <br />
                      <img src={UploadTick} width="30px" />
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'inherit',
                          textAlign: 'center',
                          width: '140px',
                          height: '16px',
                        }}
                      >
                        {selectedFile.name}
                      </p>
                    </span>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <img src={Folder} width="30px" />
                      <br /> <br />
                      <span>
                        <b>Browse Files</b>
                        <br />
                      </span>
                    </div>
                  )}
                </div>
              </CardBox>
            </PreviewCard>{' '}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '6px',
              }}
            >
              <span>Transform</span>
              <span>
                {selectedFile && (
                  <img
                    title="Delete File"
                    src={DeleteFile}
                    width="25px"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => setSelectedFile(null)}
                  />
                )}
                {selectedFile && (
                  <img
                    title="Proceed for Transformation"
                    src={Proceed}
                    width="25px"
                    style={{ cursor: 'pointer' }}
                    onClick={handleDocsPPt}
                  />
                )}
              </span>
            </span>
          </CardLink>
          {presetList.length > 0 && (
            <>
              {presetList.map((preset, index) => {
                return (
                  <CardTitle
                    key={preset.presetName + index}
                    onClick={() => {
                      navigate('/themes');
                      fetchPreset(preset.id);
                      dispatch(togglePresetOpened(true));
                    }}
                  >
                    <CardLink>
                      <PreviewCard>
                        <img src={Blank} width="100%" height="30%" />
                      </PreviewCard>
                      <span title={preset.presetName}>{preset.presetName}</span>
                    </CardLink>
                  </CardTitle>
                );
              })}
            </>
          )}
        </CardContainer>
        <br />
        <Divider />
        <br />
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Title>Recent Presentations</Title>
          <TextField
            id="outlined-basic"
            label="Search presentation"
            variant="outlined"
            size="small"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Stack>
        <Dialog
          open={isDeletePptAlertOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <b>Delete Presentation ? </b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanently delete the current
              presentation?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={19} mt={-1} alignItems={'center'}>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox size="small" onChange={handlePptDelCheckBox} />
                  }
                  label="Don't show me again"
                />
              </Stack>
              <Stack direction="row">
                <Button onClick={handleClose}>No</Button>
                <Button
                  color="error"
                  onClick={() => {
                    removePresentation(currentPresentation.presentationId);
                    handleClose();
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Dialog>
        {loadingUserDetails === false ? (
          <Box onContextMenu={e => e.preventDefault()}>
            <Box height="40vh" overflow="auto">
              <CardTitle>
                {filteredPptList.map((ppt: any, index) => {
                  return (
                    <PPTCard
                      key={ppt.presentationId}
                      onContextMenu={e => handleContextMenu(e, ppt)}
                    >
                      <ThumbnailCard
                        onClick={() => {
                          navigate(
                            `/presentation/${
                              ppt.presentationId
                            }-${faker.string.uuid()}`
                          );
                        }}
                      >
                        {ppt.thumbnailUrl !== '' ? (
                          <img
                            src={ppt.thumbnailUrl}
                            alt={ppt.name}
                            width={'100%'}
                            style={{ borderRadius: 'inherit' }}
                          />
                        ) : (
                          <BlankImageCard>
                            <img src={Blank} />
                          </BlankImageCard>
                        )}
                      </ThumbnailCard>
                      <TitleCard>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          display="flex"
                          alignItems="center"
                        >
                          <PPTTitle
                            title={ppt.name}
                            onClick={() => {
                              navigate(
                                `/presentation/${
                                  ppt.presentationId
                                }-${faker.string.uuid()}`
                              );
                            }}
                          >
                            {ppt.name == undefined
                              ? 'Untitled-presentation'
                              : ppt.name}
                          </PPTTitle>
                          <IconButton
                            onClick={event => {
                              handleContextMenu(event, ppt);
                              setPptId(ppt.presentationId);
                            }}
                            id="more_menu"
                          >
                            <MoreVertIcon id="more_menu" fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TitleCard>
                    </PPTCard>
                  );
                })}
              </CardTitle>{' '}
            </Box>
            {/* <Button
              variant="outlined"
              sx={{ marginTop: '10px' }}
              onClick={handleMore}
              disabled={!hasMore} // Disable the button if no more presentations
            >
              Load more
            </Button> */}
          </Box>
        ) : (
          <Loader>
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
        <PresentationCardContextMenu
          anchorPoint={contextMenu || { x: 0, y: 0 }}
          isOpen={contextMenu !== null}
          onClose={handleCloseContextMenu}
          presentation={currentPresentation}
          contextMenuRef={contextMenuRef}
        />
      </MainContainer>
    </>
  );
};

export default Dashboard;
