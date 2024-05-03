import { setNewTheme } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  BrowseButton,
  Card,
  ColorContainer,
  FileUploadDesign,
  FileUploadDiv,
  FileUploadLabel,
  H1,
  Img,
  Label,
  LoaderContainer,
  LoadingBar,
  LogoContainer,
  PreviewContainer,
  StyledCloudUploadIcon,
  StyledFileInput,
  StyledText,
  SuccessContainer,
  TextBox,
  TextContent,
  ThemeContainer,
} from './style';

import { setTextColor } from '@/redux/reducers/canvas';
import ImageIcon from '@mui/icons-material/Image';
import { CancelUpload, DoneGif, FileUploadIcon } from '@/constants/media';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import { uploadCustomTheme } from '@/redux/thunk/thunk';

const CanvasThemes = () => {
  const toggleTheme = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const [inputTextColor, setInputTextColor] = useState<string>('');
  const fileUploadLabelRef = useRef<HTMLLabelElement>(null);
  const ColorRef = useRef<HTMLInputElement | null>(null);
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
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(()=> {
     setIsFileUploaded(false);
     setIsUploading(false);
     setSelectedFiles(null);
  }, [toggleTheme.openAddTheme === false])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    console.log({ files })
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFiles(files[0]);
    }
  };
  const handleButtonClick = () => {
    // inputRef.current?.click();
  };

  const handleAddTheme = () => {
    if (!selectedFiles) {
      toast.error('Please select a PPT file')
    } else {
      setIsFileUploaded(false);
      setIsUploading(true)
      dispatch(uploadCustomTheme(selectedFiles)).then((res) => {
        console.log({ res })
        if (res.payload === "Files uploaded successfully") {
          setIsFileUploaded(true);
          setIsUploading(false);
          toast.success(
            `Successfully uploaded ${selectedFiles!.name}`
          )
        }
      }).catch(err => {
        console.log(err)
      });
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
    console.log({ files })
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFiles(files[0]);
    }
  };

  return (
    <Dialog
      open={toggleTheme.openAddTheme}
      onClose={() => dispatch(setNewTheme(false))}
    >
      {isUploading ? <></> : <DialogTitle>Add New Theme</DialogTitle> }
      <DialogContent>
        {/* <DialogContentText>
          Please select a logo and a color code to create a new theme.
        </DialogContentText>
        <ThemeContainer>
          {!imagePreview && (
            <LogoContainer
              onClick={handleButtonClick}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept=".png, .jpeg, .jpg"
                style={{ display: 'none' }}
              />
              <ImageIcon />
              <br />
              <span>Browse Logo</span>
            </LogoContainer>
          )}

          {imagePreview && (
            <PreviewContainer>
              <img
                src={imagePreview}
                alt="Preview"
                width="200px"
                height="150px"
                onClick={handleButtonClick}
              />
              <img
                src={CancelUpload}
                width="30px"
                style={{ cursor: 'pointer' }}
                onClick={() => setImagePreview(null)}
              />
            </PreviewContainer>
          )}
          <ColorContainer
            onClick={handleColorInputClick}
            style={{ backgroundColor: inputTextColor }}
          >
            <input
              type="color"
              style={{ visibility: 'hidden' }}
              ref={ColorRef}
              onChange={handleTextColorInputChange}
            />
          </ColorContainer>

          <span>
            <Button
              onClick={() => {
                dispatch(setTextColor('transparent'));
                setInputTextColor('');
              }}
            >
              <HighlightOffIcon />
            </Button>
          </span>
        </ThemeContainer>
        <div>
          <Stack direction="row" spacing={4}>
            <span>
              <span></span>
            </span>
          </Stack>
        </div> */}

        {
          isUploading ?
            <LoaderContainer >
              <Label>Uploading Theme...</Label>
              <LoadingBar />
            </LoaderContainer>
            :
            isFileUploaded ?
              <SuccessContainer>
                <img src={DoneGif} width={200} alt="uploadDone" />
                <StyledText>Your submission has been received successfully. We'll process it and notify you via email once it's available. Thank you for your patience!</StyledText>
                <Button type="submit" variant="contained" onClick={() => dispatch(setNewTheme(false))} style={{ backgroundColor: '#004FBA', color: 'white' }}>
                  Close
                </Button>
              </SuccessContainer>
              :
              <FileUploadDiv >
                <FileUploadLabel
                  ref={fileUploadLabelRef}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <FileUploadDesign>
                    <img src={FileUploadIcon} width={200} alt="fileUpload" />
                    <Typography>Drag and Drop</Typography>
                    <Typography>or</Typography>
                    <BrowseButton>
                      Browse file
                    </BrowseButton>
                  </FileUploadDesign>
                  <StyledFileInput id="file" type="file" accept=".ppt, .pptx" onChange={handleFileChange} ref={inputRef} />
                </FileUploadLabel>
                {selectedFiles && 
                 <Card>
                 <Img >.PPTX</Img>
                 <TextBox>
                   <TextContent>
                     <H1>{selectedFiles!.name}</H1>
                   </TextContent>
                 </TextBox>
               </Card>
               }
              </FileUploadDiv>
        }
      </DialogContent>
      <DialogActions>
        {
          isUploading ?  <></> : isFileUploaded ? <></> :
            <Button type="submit" variant="contained" onClick={handleAddTheme} style={{ backgroundColor: '#004FBA', color: 'white', marginRight: 11 }}>
              Add Theme
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
};
export default CanvasThemes;
