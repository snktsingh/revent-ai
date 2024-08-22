import { setNewTheme } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  BrowseButton,
  CancelUploadImage,
  ColorContainer,
  FileUploadDesign,
  FileUploadDiv,
  FileUploadLabel,
  H1,
  HeadText,
  Img,
  Label,
  LoaderContainer,
  LoadingBar,
  LogoContainer,
  PreviewContainer,
  StyledCloudUploadIcon,
  StyledFileInput,
  StyledText,
  SubText,
  SuccessContainer,
  TextBox,
  TextContent,
  ThemeContainer,
  ThemeSelectCard,
  UploadedFileContainer,
  UploadedFileImage,
  UploadedFileName,
  UploadedFileText,
} from './style';

import { setTextColor } from '@/redux/reducers/canvas';
import ImageIcon from '@mui/icons-material/Image';
import {
  CancelUpload,
  DoneGif,
  Favicon,
  FileUploadIcon,
  PptTheme,
  UploadTick,
  UrlTheme,
} from '@/constants/media';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import { uploadCustomTheme } from '@/redux/thunk/thunk';
import UseCreateTheme from './container';
import { FetchUtils } from '@/utils/fetch-utils';
import ENDPOINT from '@/constants/endpoint';

const CanvasThemes = () => {
  const toggleTheme = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const [inputTextColor, setInputTextColor] = useState<string>('');
  const fileUploadLabelRef = useRef<HTMLLabelElement>(null);
  const ColorRef = useRef<HTMLInputElement | null>(null);
  const [webUrl, setWebUrl] = useState<string>('');
  const [isCreating, setIsCreating] = useState(true);

  const handleColorInputClick = () => {
    ColorRef.current?.click();
  };
  const handleTextColorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputTextColor(e.target.value);
    dispatch(setTextColor(e.target.value));
  };
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUrlAdded, setIsUrlAdded] = useState<boolean>(false);
  const [isLogoUploaded, setIsLogoUploaded] = useState<boolean>(false);
  const [isPPTUploaded, setIsPPTUploaded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  useEffect(() => {
    setIsFileUploaded(false);
    setIsCreating(false);
    setSelectedFiles(null);
  }, [toggleTheme.openAddTheme === false]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setIsUrlAdded(false);
    setIsLogoUploaded(false);
    event.preventDefault();
    const files = event.target.files;
    console.log({ files });
    if (files && files[0]) {
      const reader = new FileReader();
      // reader.onload = () => {
      //   setImagePreview(reader.result as string);
      // };
      reader.readAsDataURL(files[0]);
      setSelectedFiles(files[0]);
    }
  };
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleLogoClick = () => {
    logoRef.current?.click();
  };

  useEffect(() => {}, []);

  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files) {
      console.log('event');
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
      setSelectedLogo(event.target.files[0]);
    }
  };

  const handleUrl = (value: string) => {
    if (value === '') {
      setIsLogoUploaded(true);
      setIsPPTUploaded(true);
    } else {
      setWebUrl(value);
      setIsLogoUploaded(false);
      setIsPPTUploaded(false);
    }
  };

  const setThemeURL = async (url: string, logo: any) => {
    setIsCreating(true);
    const logoTheme = new FormData();
    if (url !== '') {
      logoTheme.append('websiteUrl', url);
    } else {
      logoTheme.append('logo', logo);
    }
    try {
      const res = await FetchUtils.postRequest(
        `${ENDPOINT.THEME.SET_THEME_URL}`,
        logoTheme
      );
      setIsCreating(false);
      setIsFileUploaded(true);
      console.log(res);
    } catch (Error) {
      console.log(Error);
    }
  };

  const handleAddTheme = () => {
    if (webUrl) {
      setThemeURL(webUrl, null);
    } else if (selectedLogo) {
      setThemeURL('', selectedLogo);
    } else if (selectedFiles) {
      if (!selectedFiles) {
        toast.error('Please select a PPT file');
      } else {
        setIsFileUploaded(false);
        setIsCreating(true);
        dispatch(uploadCustomTheme(selectedFiles))
          .then(res => {
            console.log({ res });
            if (res.payload === 'Files uploaded successfully') {
              setIsFileUploaded(true);
              setIsCreating(false);
              toast.success(`Successfully uploaded ${selectedFiles!.name}`);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const preventDefaults = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    preventDefaults(event);
    fileUploadLabelRef.current?.classList.add('dragover');
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    preventDefaults(event);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    preventDefaults(event);
    fileUploadLabelRef.current?.classList.remove('dragover');
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    preventDefaults(event);
    fileUploadLabelRef.current?.classList.remove('dragover');
    const files = event.dataTransfer.files;
    console.log({ files });
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFiles(files[0]);
    }
  };

  const handleClose = () => {
    setIsSelected(true);
    setIsPPTUploaded(false);
    setIsUrlAdded(false);
    setIsLogoUploaded(false);
    setSelectedFiles(null);
    setImagePreview(null);
    setWebUrl('');
    setSelectedLogo(null);
    setIsFileUploaded(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={toggleTheme.openAddTheme}
      onClose={() => dispatch(setNewTheme(false))}
    >
      {isUploading ? (
        <></>
      ) : (
        <>
          {!isFileUploaded && (
            <DialogTitle>
              <HeadText>Create new theme</HeadText>
            </DialogTitle>
          )}
        </>
      )}
      <DialogContent>
        {!isSelected && (
          <div
            style={{
              cursor: 'pointer',
              color: '#004fba',
              marginBottom: '14px',
            }}
            onClick={handleClose}
          >
            Back
          </div>
        )}
        {isSelected && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2%',
            }}
          >
            <ThemeSelectCard
              onClick={() => {
                setIsSelected(false);
                setIsLogoUploaded(true);
              }}
            >
              <img
                src={Favicon}
                alt="LogoTheme"
                width="7%"
                style={{ margin: '0px 12px' }}
              />
              Create theme using Logo
            </ThemeSelectCard>
            <ThemeSelectCard
              onClick={() => {
                setIsSelected(false);
                setIsUrlAdded(true);
              }}
            >
              <img
                src={UrlTheme}
                alt="LogoTheme"
                width="8%"
                style={{ margin: '0px 12px' }}
              />
              Create theme using URL
            </ThemeSelectCard>
            <ThemeSelectCard
              onClick={() => {
                setIsSelected(false);
                setIsPPTUploaded(true);
              }}
            >
              <img
                src={PptTheme}
                alt="LogoTheme"
                width="9%"
                style={{ margin: '0px 12px' }}
              />
              Create theme using PPT
            </ThemeSelectCard>
          </span>
        )}
        {isUrlAdded && (
          <>
            {isCreating ? (
              <LoaderContainer>
                <Label>Uploading Theme...</Label>
                <LoadingBar />
              </LoaderContainer>
            ) : isFileUploaded ? (
              <SuccessContainer>
                <img src={DoneGif} width={200} alt="uploadDone" />
                <StyledText>
                  Thank you for adding a theme on Revent Press! You will be
                  notified via email once the theme is ready to use.
                </StyledText>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    dispatch(setNewTheme(false));
                    handleClose();
                  }}
                  style={{ backgroundColor: '#004FBA', color: 'white' }}
                >
                  Close
                </Button>
              </SuccessContainer>
            ) : (
              <>
                {/* <SubText style={{ marginBottom: '10px' }}>
                  Provide your website URL
                </SubText> */}
                <TextField
                  size="small"
                  fullWidth
                  onChange={e => handleUrl(e.target.value)}
                  placeholder="Enter your website URL"
                />
                <br />
              </>
            )}
          </>
        )}
        {isLogoUploaded && (
          <>
            {isCreating ? (
              <LoaderContainer>
                <Label>Uploading Theme...</Label>
                <LoadingBar />
              </LoaderContainer>
            ) : isFileUploaded ? (
              <SuccessContainer>
                <img src={DoneGif} width={200} alt="uploadDone" />
                <StyledText>
                  Thank you for adding a theme on Revent Press! You will be
                  notified via email once the theme is ready to use.
                </StyledText>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    dispatch(setNewTheme(false));
                    handleClose();
                  }}
                  style={{ backgroundColor: '#004FBA', color: 'white' }}
                >
                  Close
                </Button>
              </SuccessContainer>
            ) : (
              <>
                <DialogContentText>
                  {/* <SubText style={{ marginBottom: '10px' }}>
                    Provide your company logo
                  </SubText> */}
                </DialogContentText>
                <ThemeContainer>
                  {!imagePreview && (
                    <LogoContainer
                      onClick={handleLogoClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <input
                        type="file"
                        ref={logoRef}
                        onChange={handleLogo}
                        accept=".png, .jpeg, .jpg"
                        style={{ display: 'none' }}
                      />
                      <ImageIcon />
                      <br />
                      <span>Browse Logo</span>
                    </LogoContainer>
                  )}
                  {imagePreview && (
                    <LogoContainer
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '160px',
                        gap: '30px',
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        width="140px"
                        height="120px"
                        onClick={handleLogoClick}
                      />
                      <img
                        src={CancelUpload}
                        width="30px"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setImagePreview(null)}
                      />
                    </LogoContainer>
                  )}
                  {/* <ColorContainer
            onClick={handleColorInputClick}
            style={{ backgroundColor: inputTextColor }}
          >
            <input
              type="color"
              style={{ visibility: 'hidden' }}
              ref={ColorRef}
              onChange={handleTextColorInputChange}
            />
          </ColorContainer> */}
                  {/* <span>
            <Button
              onClick={() => {
                dispatch(setTextColor('transparent'));
                setInputTextColor('');
              }}
            >
              <HighlightOffIcon />
            </Button>
          </span> */}
                </ThemeContainer>
              </>
            )}
          </>
        )}
        {isPPTUploaded && (
          <>
            {/* <SubText style={{ marginBottom: '10px' }}>
              Provide presentation with your company logo
            </SubText> */}
            {isCreating ? (
              <LoaderContainer>
                <Label>Uploading Theme...</Label>
                <LoadingBar />
              </LoaderContainer>
            ) : isFileUploaded ? (
              <SuccessContainer>
                <img src={DoneGif} width={200} alt="uploadDone" />
                <StyledText>
                  Thank you for adding a theme on Revent Press! You will be
                  notified via email once the theme is ready to use.
                </StyledText>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    dispatch(setNewTheme(false));
                    handleClose();
                  }}
                  style={{ backgroundColor: '#004FBA', color: 'white' }}
                >
                  Close
                </Button>
              </SuccessContainer>
            ) : (
              <>
                {selectedFiles ? (
                  <UploadedFileContainer>
                    <br />
                    <UploadedFileImage src={UploadTick} />
                    <br />
                    <UploadedFileText>File Uploaded</UploadedFileText>
                    <UploadedFileName>{selectedFiles.name}</UploadedFileName>
                    <br />
                    <CancelUploadImage
                      src={CancelUpload}
                      onClick={() => setSelectedFiles(null)}
                    />
                  </UploadedFileContainer>
                ) : (
                  <FileUploadDiv>
                    <FileUploadLabel
                      ref={fileUploadLabelRef}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <FileUploadDesign>
                        <img
                          src={FileUploadIcon}
                          width={200}
                          alt="fileUpload"
                        />
                        <Typography>Drag and Drop</Typography>
                        <Typography>or</Typography>
                        <BrowseButton>Browse file</BrowseButton>
                        <StyledFileInput
                          id="file"
                          type="file"
                          accept=".ppt, .pptx"
                          onChange={handleFileChange}
                          ref={inputRef}
                        />
                      </FileUploadDesign>
                    </FileUploadLabel>
                  </FileUploadDiv>
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {isCreating ? (
          <></>
        ) : isFileUploaded ? (
          <></>
        ) : (
          <>
            {isUrlAdded || isPPTUploaded || isLogoUploaded ? (
              <Button
                type="submit"
                variant="contained"
                onClick={handleAddTheme}
                style={{
                  backgroundColor: '#004FBA',
                  color: 'white',
                  marginRight: 11,
                }}
              >
                Add Theme
              </Button>
            ) : (
              <></>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default CanvasThemes;
