import {
  Blank,
  Create,
  DeleteFile,
  DocUpload,
  Empty,
  PresetIcon,
  Proceed,
  UploadTick,
} from '@/constants/media';
import { setSelectedDocFile } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Box, Card, IconButton, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboard from './container';
import {
  BlankImageCard,
  CardLink,
  CardTitle,
  Loader,
  LoaderText,
  PPTCard,
  PPTTitle,
  PreviewCard,
  TagCard,
  ThumbnailCard,
  TitleCard,
  TransformCard,
} from './style';
import { togglePresetOpened } from '@/redux/thunk/dashboard';
import { MagnifyingGlass } from 'react-loader-spinner';
import { theme } from '@/constants/theme';
import { MoreVert } from '@mui/icons-material';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { FetchUtils } from '@/utils/fetch-utils';
import ENDPOINT from '@/constants/endpoint';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';

const HomeContent = ({ onFileSelect }: any) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { presetList } = useAppSelector(state => state.manageDashboard);
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
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);

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

  const handleContextMenu = (event: React.MouseEvent, presentation: any) => {
    event.preventDefault();
    setCurrentPresentation(presentation);
    setContextMenu({ x: event.clientX, y: event.clientY });
    // setContextMenu(contextMenu === null ? { x: event.clientX, y: event.clientY } : null);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
      dispatch(setSelectedDocFile(selected));
      onFileSelect(selected);
    }
  };

  const handleDocsPPt = async () => {
    navigate('/themes');
  };

  const { loadingUserDetails } = useAppSelector(state => state.manageDashboard);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pptList, setPptList] = useState<[]>([]);

  const fetchPPTList = async () => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=16`
    );
    setPptList(res.data);
  };

  useEffect(() => {
    fetchPPTList();
    setIsLoading(false);
  }, []);

  return (
    <div>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Empty} width="20%" style={{ margin: '80px 0px 40px' }} />
      </Box> */}
      <Box
        sx={{
          marginTop: '35px',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '20px',
        }}
      >
        <Card
          style={{
            width: '28%',
            padding: '14px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}
          onClick={() => navigate('/themes')}
        >
          <img src={Create} width="100%" />
          <span
            style={{
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Create New Presentation
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '400',
                color: 'grey',
              }}
            >
              Generate PPT/Slides for presentation
            </span>
          </span>
        </Card>
        <Card
          style={{
            width: '28%',
            // padding: '14px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            justifyContent: 'space-between',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}
        >
          <TagCard></TagCard>
          <TransformCard>
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
                    marginTop: '10px',
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
                    }}
                  >
                    {selectedFile.name}
                  </p>
                </span>
              ) : (
                <img src={DocUpload} width="100%" />
              )}
            </div>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  marginTop: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Transform Documents to PPT
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: 'grey',
                  }}
                >
                  Transform Docx / Doc to ppt
                </span>
              </span>
              <span style={{ marginTop: '14px' }}>
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
          </TransformCard>
        </Card>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>
          Recent Presentations
        </p>
        {isLoading === false ? (
          <Box onContextMenu={e => e.preventDefault()} sx={{ marginTop: '3%' }}>
            <Box height="78vh" overflow="auto">
              <CardTitle>
                {pptList.map((ppt: any, index) => {
                  return (
                    <PPTCard
                      key={ppt.presentationId}
                      onContextMenu={e => handleContextMenu(e, ppt)}
                    >
                      <ThumbnailCard>
                        {ppt.thumbnailUrl !== '' ? (
                          <img
                            src={ppt.thumbnailUrl}
                            alt={ppt.name}
                            width={'100%'}
                            height={'80%'}
                            style={{
                              borderRadius: '6px',
                              cursor: 'pointer',
                              marginBottom: '10px',
                            }}
                            onClick={() => {
                              navigate(
                                `/presentation/${
                                  ppt.presentationId
                                }-${faker.string.uuid()}`
                              );
                            }}
                          />
                        ) : (
                          <BlankImageCard>
                            <img
                              src={Blank}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                navigate(
                                  `/presentation/${
                                    ppt.presentationId
                                  }-${faker.string.uuid()}`
                                );
                              }}
                            />
                          </BlankImageCard>
                        )}
                        <TitleCard>
                          <Stack direction="column" spacing={0.5}>
                            <PPTTitle title={ppt.name}>
                              {ppt.name == undefined
                                ? 'Untitled-presentation'
                                : ppt.name}
                            </PPTTitle>
                            <div
                              style={{
                                width: '100%',
                                padding: '0px 0px 0px 0px',
                                fontSize: '11px',
                                color: 'grey',
                                fontWeight: '200',
                              }}
                            >
                              Opened -{' '}
                              {moment(ppt.lastModifiedDate).format(
                                'DD/MM/YYYY'
                              )}
                            </div>
                          </Stack>
                          <IconButton
                            onClick={event => {
                              handleContextMenu(event, ppt);
                              setPptId(ppt.presentationId);
                            }}
                            id="more_menu"
                          >
                            <MoreVert id="more_menu" fontSize="small" />
                          </IconButton>
                        </TitleCard>
                      </ThumbnailCard>
                    </PPTCard>
                  );
                })}
              </CardTitle>{' '}
            </Box>
          </Box>
        ) : (
          <Loader>
            <MagnifyingGlass
              visible={true}
              height="30"
              width="30"
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
      </Box>
    </div>
  );
};
export default HomeContent;
