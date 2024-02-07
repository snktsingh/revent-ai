import { setNewTheme } from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import {
  ColorContainer,
  LogoContainer,
  PreviewContainer,
  ThemeContainer,
} from './style';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ColorGrid, ColorItem } from '@/pages/canvas/canvasTools/style';
import { ThemeColor } from '@/pages/canvas/canvasBody/elementData';
import { setTextColor } from '@/redux/reducers/canvas';
import ImageIcon from '@mui/icons-material/Image';
import { CancelUpload } from '@/constants/media';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';

const CanvasThemes = () => {
  const toggleTheme = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const [inputTextColor, setInputTextColor] = useState<string>('');

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
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFiles(files);
    }
  };
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleAddTheme = () => {
    if (imagePreview == null) {
      toast.warning('Please select a logo');
    } else if (inputTextColor === '') {
      toast.warning('Please select a theme color');
    }
  };

  return (
    <Dialog
      open={toggleTheme.openAddTheme}
      onClose={() => dispatch(setNewTheme(false))}
    >
      <DialogTitle>Add New Theme</DialogTitle>
      <DialogContent>
        <DialogContentText>
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" onClick={handleAddTheme}>
          Add Theme
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CanvasThemes;
