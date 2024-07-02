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
import { Box, Card } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboard from './container';
import { CardLink, CardTitle, PreviewCard } from './style';
import { togglePresetOpened } from '@/redux/thunk/dashboard';

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
            padding: '14px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            justifyContent: 'space-between',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
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
        </Card>
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>Templates</p>
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
                  <Card
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      justifyContent: 'space-between',
                      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    }}
                  >
                    <img src={PresetIcon} width="100%" height="100%" />
                    <span title={preset.presetName}>{preset.presetName}</span>
                  </Card>
                </CardTitle>
              );
            })}
          </>
        )}
      </Box>
    </div>
  );
};
export default HomeContent;
