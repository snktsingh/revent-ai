import {
  Autocomplete,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  TextField,
} from '@mui/material';
import {
  BorderColorDiv,
  ColorDiv,
  ColorGrid,
  ColorItem,
  ColorMenuContainer,
  ColorSection,
  FontTool,
  IconsContainer,
  InputForSize,
  MainToolContainer,
  SectionTitle,
  ShapeItem,
  ShapesCard,
} from './style';
import { Add, ShapesIcon, Template } from '@/constants/media';
import MenuItem from '@mui/material/MenuItem';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addSlide } from '@/redux/reducers/slide';
import { toggleTemplateVisibility } from '@/redux/reducers/elements';
import { ToolOutlinedButton, ToolOutlinedSelect } from '../style';
import {
  AddOutlined,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatUnderlinedRounded,
  RemoveOutlined,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import {
  ContentElements,
  ShapesData,
  ThemeColor,
  colorChange,
  shadesData,
} from '../canvasBody/elementData';
import {
  addCanvas,
  handleInputSize,
  handleSize,
  setBorderColor,
  setColor,
  setTextColor,
} from '@/redux/reducers/canvas';
import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import WebFont from 'webfontloader';
import FontsData from '../../../data/fontsData.json';
import CreditsComponent from '@/components/CreditsComponent';

interface FontItem {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: { [key: string]: string };
  category: string;
  kind: string;
  menu: string;
}


const CanvasTools = () => {
  const dispatch = useAppDispatch();
  const newKey = useAppSelector(state => state.slide);
  const { color, textColor, borderColor, canvasList, size } = useAppSelector(
    state => state.canvas
  );
  const tools = useAppSelector(state => state.thunk);
  const obj = { key: newKey.nextKey, name: `Slide ${newKey.nextKey}` };
  const ColorRef = useRef<HTMLInputElement | null>(null);
  const [inputColor, setInputColor] = useState<string>('');
  const [inputTextColor, setInputTextColor] = useState<string>('');
  const [inputBorderColor, setInputBorderColor] = useState<string>('');
  const [googleFonts, setGoogleFonts] = useState<any[]>([]);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(200);
  const [filteredFonts, setFilteredFonts] = useState<any[]>([]);
  const [searchFont, setSearchFont] = useState<string>();
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef(null);
  const { isLoading } = useAppSelector(state => state.thunk);
  const [anchorShapesEl, setAnchorShapesEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorShapesEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorShapesEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorShapesEl(null);
  };

  const [anchorColorEl, setAnchorColorEl] = useState<null | HTMLElement>(null);
  const openColor = Boolean(anchorColorEl);
  const handleColorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorColorEl(event.currentTarget);
  };
  const handleColorClose = () => {
    setAnchorColorEl(null);
  };

  const handleColorInputClick = () => {
    ColorRef.current?.click();
  };

  const [anchorTextColorEl, setAnchorTextColorEl] =
    useState<null | HTMLElement>(null);
  const openTextColor = Boolean(anchorTextColorEl);

  const handleTextColorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorTextColorEl(event.currentTarget);
  };

  const handleTextColorClose = () => {
    setAnchorTextColorEl(null);
  };

  const handleTextColorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputTextColor(e.target.value);
    dispatch(setTextColor(e.target.value));
  };

  const [anchorBorderColorEl, setAnchorBorderColorEl] =
    useState<null | HTMLElement>(null);
  const openBorderColor = Boolean(anchorBorderColorEl);

  const handleBorderColorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorBorderColorEl(event.currentTarget);
  };

  const handleBorderColorClose = () => {
    setAnchorBorderColorEl(null);
  };

  const handleBorderColorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputBorderColor(e.target.value);
    dispatch(setBorderColor(e.target.value));
  };


  useEffect(() => {
    colorChange.colorFillChange();
  }, [color]);

  useEffect(() => {
    colorChange.colorTextChange();
  }, [textColor]);

  useEffect(() => {
    colorChange.colorBorderChange();
  }, [borderColor]);

  const handleColor = (value: string) => {
    dispatch(setColor(value));
  };
  const handleInputColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value);
    dispatch(setColor(e.target.value));
  };

  useEffect(() => {
    fetchFonts(0, 200);
  }, [])

  const fetchFonts = (start: number, end: number) => {
    setGoogleFonts(FontsData.sort((a, b) => a.family.localeCompare(b.family)));
    const fonts = FontsData.slice(start, end);
    setFilteredFonts(fonts);
  };

  const searchFonts = (value: string) => {
    if (value === '') {
      const fonts = googleFonts.slice(0, 200);
      setFilteredFonts(fonts);
    } else {
      const filtered = googleFonts.filter(font =>
        font.family.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFonts(filtered);
    }
  };

  const handleInputChange = (event: any, newInputValue: string) => {
    setSearchFont(newInputValue);
    searchFonts(newInputValue);
  };

  const loadFont = (fontFamily: string) => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
    });
  };

  const handleAddNewSlide = () => {
    dispatch(addCanvas());
    dispatch(addSlide(obj));
  };
  const handleScroll = () => {
    if (
      listRef.current &&
      ((listRef.current as HTMLUListElement).scrollHeight) - (listRef.current as HTMLUListElement).scrollTop <=
      (listRef.current as HTMLUListElement).clientHeight + 1000
    ) {
      // Load more fonts when user reaches the end of the list
      const start = filteredFonts.length;
      const end = start + 200;
      const additionalFonts = googleFonts.slice(start, end);
      setFilteredFonts(prevFonts => [...prevFonts, ...additionalFonts]);
    }
  };

  return (
    <MainToolContainer>
      <Stack
        direction="row"
        spacing={1}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ToolOutlinedButton
          onClick={() => {
            dispatch(toggleTemplateVisibility());
          }}
          disabled={isLoading}
        >
          <Stack direction="row" spacing={1}>
            <img src={Template} />
            <p>Change Theme</p>
          </Stack>
        </ToolOutlinedButton>
        <ToolOutlinedButton
          onClick={handleAddNewSlide}
          disabled={isLoading}
        >
          <Stack direction="row" spacing={1}>
            <img src={Add} />
            <p>New Slide</p>
          </Stack>
        </ToolOutlinedButton>


        {/* <Autocomplete
          sx={{ width: 200 }}
          size="small"
          value={searchFont}
          onChange={(event, newValue) => {
            ContentElements.handleFontFamily(newValue);
          }}
          inputValue={searchFont}
          onInputChange={handleInputChange}
          options={filteredFonts.map(el => el.family) || []}
          renderInput={params => {
            return (
              <TextField
                {...params}
                label="Select a font"
                variant="outlined"
                placeholder="Search fonts"
              />
            );
          }}
          renderOption={(props, option) => {
            loadFont(option);
            return (
              <MenuItem {...props} style={{ fontFamily: option }}>
                {option}
              </MenuItem>
            );
          }}
          ListboxProps={{ onScroll: handleScroll, ref: listRef }}
        /> */}


        {/* <IconButton
          size="small"
          onClick={() => {
            dispatch(handleSize(-1));
            ContentElements.handleFontSize();
          }}
          disabled={size === 1}
        >
          <RemoveOutlined />
        </IconButton>
        <InputForSize
          value={size}
          type="number"
          onChange={e => {
            dispatch(handleInputSize(+e.target.value));
            ContentElements.handleFontSize();
          }}
        />
        <IconButton
          size="small"
          onClick={() => {
            dispatch(handleSize(1));
            ContentElements.handleFontSize();
          }}
        >
          <AddOutlined />
        </IconButton> */}
        {/* <ColorDiv onClick={handleTextColorClick}>
          <FontDownloadOutlinedIcon />
          <div style={{ background: textColor }}></div>
        </ColorDiv> */}

        <Menu
          open={openTextColor}
          anchorEl={anchorTextColorEl}
          onClose={handleTextColorClose}
        >
          <ColorMenuContainer>
            <ColorSection>
              <SectionTitle>Theme Colors</SectionTitle>
              <ColorGrid>
                {ThemeColor.map((color, index) => {
                  return (
                    <ColorItem
                      key={color.theme}
                      style={{ backgroundColor: color.theme }}
                      onClick={() => dispatch(setTextColor(color.theme))}
                    />
                  );
                })}
              </ColorGrid>
            </ColorSection>
            <ColorSection>
              <SectionTitle>General Colors</SectionTitle>
              <ColorGrid>
                {shadesData.map(color => {
                  return (
                    <span
                      key={color.shade1}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <ColorItem
                        key={color.shade1}
                        style={{ backgroundColor: color.shade1 }}
                        onClick={() => dispatch(setTextColor(color.shade1))}
                      />
                      <ColorItem
                        key={color.shade2}
                        style={{ backgroundColor: color.shade2 }}
                        onClick={() => dispatch(setTextColor(color.shade2))}
                      />
                      <ColorItem
                        key={color.shade3}
                        style={{ backgroundColor: color.shade3 }}
                        onClick={() => dispatch(setTextColor(color.shade3))}
                      />
                      <ColorItem
                        key={color.shade4}
                        style={{ backgroundColor: color.shade4 }}
                        onClick={() => dispatch(setTextColor(color.shade4))}
                      />
                      <ColorItem
                        key={color.shade5}
                        style={{ backgroundColor: color.shade5 }}
                        onClick={() => dispatch(setTextColor(color.shade5))}
                      />
                      <ColorItem
                        key={color.shade6}
                        style={{ backgroundColor: color.shade6 }}
                        onClick={() => dispatch(setTextColor(color.shade6))}
                      />
                      <ColorItem
                        key={color.shade7}
                        style={{ backgroundColor: color.shade7 }}
                        onClick={() => dispatch(setTextColor(color.shade7))}
                      />
                    </span>
                  );
                })}
              </ColorGrid>
            </ColorSection>
            <SectionTitle>More Colors</SectionTitle>
            <IconButton
              onClick={handleColorInputClick}
              style={{ backgroundColor: inputTextColor }}
            >
              +
              <input
                type="color"
                style={{ visibility: 'hidden' }}
                ref={ColorRef}
                onChange={handleTextColorInputChange}
              />
            </IconButton>
            <Button onClick={() => dispatch(setTextColor('transparent'))}>
              No Color
            </Button>
          </ColorMenuContainer>
        </Menu>

        <FontTool>
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              onClick={() => ContentElements.handleBold()}
            >
              <FormatBoldRounded />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => ContentElements.handleItalic()}
            >
              <FormatItalicRounded />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => ContentElements.handleUnderlIne()}
            >
              <FormatUnderlinedRounded />
            </IconButton>
            {/* <IconButton onClick={handleColorClick}>
              <ColorLensOutlinedIcon />
            </IconButton>

            <BorderColorDiv onClick={handleBorderColorClick}>
              <ColorizeOutlinedIcon />
              <div style={{ background: borderColor }}></div>
            </BorderColorDiv> */}

            <Menu
              open={openBorderColor}
              anchorEl={anchorBorderColorEl}
              onClose={handleBorderColorClose}
            >
              <ColorMenuContainer>
                <ColorSection>
                  <SectionTitle>Theme Colors</SectionTitle>
                  <ColorGrid>
                    <ColorItem style={{ backgroundColor: '#ff0000' }} />
                    {/* Add more recent colors here */}
                  </ColorGrid>
                </ColorSection>
                <ColorSection>
                  <SectionTitle>General Colors</SectionTitle>
                  <ColorGrid>
                    {shadesData.map(color => {
                      return (
                        <span
                          key={color.shade1}
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <ColorItem
                            key={color.shade1}
                            style={{ backgroundColor: color.shade1 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade1))
                            }
                          />
                          <ColorItem
                            key={color.shade2}
                            style={{ backgroundColor: color.shade2 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade2))
                            }
                          />
                          <ColorItem
                            key={color.shade3}
                            style={{ backgroundColor: color.shade3 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade3))
                            }
                          />
                          <ColorItem
                            key={color.shade4}
                            style={{ backgroundColor: color.shade4 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade4))
                            }
                          />
                          <ColorItem
                            key={color.shade5}
                            style={{ backgroundColor: color.shade5 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade5))
                            }
                          />
                          <ColorItem
                            key={color.shade6}
                            style={{ backgroundColor: color.shade6 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade6))
                            }
                          />
                          <ColorItem
                            key={color.shade7}
                            style={{ backgroundColor: color.shade7 }}
                            onClick={() =>
                              dispatch(setBorderColor(color.shade7))
                            }
                          />
                        </span>
                      );
                    })}
                  </ColorGrid>
                </ColorSection>
                <SectionTitle>More Colors</SectionTitle>
                <IconButton
                  onClick={handleColorInputClick}
                  style={{ backgroundColor: inputBorderColor }}
                >
                  +
                  <input
                    type="color"
                    style={{ visibility: 'hidden' }}
                    ref={ColorRef}
                    onChange={handleBorderColorInputChange}
                  />
                </IconButton>
                <Button onClick={() => dispatch(setBorderColor('transparent'))}>
                  No Color
                </Button>
              </ColorMenuContainer>
            </Menu>
          </Stack>
        </FontTool>
        <Divider orientation="vertical" />
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorColorEl}
        open={openColor}
        onClose={handleColorClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {' '}
        <ColorMenuContainer>
          <ColorSection>
            <SectionTitle>Recent Colors</SectionTitle>
            <ColorGrid>
              <ColorItem style={{ backgroundColor: '#ff0000' }} />
              {/* Add more recent colors here */}
            </ColorGrid>
          </ColorSection>
          <ColorSection>
            <SectionTitle>General Colors</SectionTitle>
            <ColorGrid>
              {shadesData.map(color => {
                return (
                  <span
                    key={color.shade1}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <ColorItem
                      key={color.shade1}
                      style={{ backgroundColor: color.shade1 }}
                      onClick={() => handleColor(color.shade1)}
                    />
                    <ColorItem
                      key={color.shade2}
                      style={{ backgroundColor: color.shade2 }}
                      onClick={() => handleColor(color.shade2)}
                    />
                    <ColorItem
                      key={color.shade3}
                      style={{ backgroundColor: color.shade3 }}
                      onClick={() => handleColor(color.shade3)}
                    />
                    <ColorItem
                      key={color.shade4}
                      style={{ backgroundColor: color.shade4 }}
                      onClick={() => handleColor(color.shade4)}
                    />
                    <ColorItem
                      key={color.shade5}
                      style={{ backgroundColor: color.shade5 }}
                      onClick={() => handleColor(color.shade5)}
                    />
                    <ColorItem
                      key={color.shade6}
                      style={{ backgroundColor: color.shade6 }}
                      onClick={() => handleColor(color.shade6)}
                    />
                    <ColorItem
                      key={color.shade7}
                      style={{ backgroundColor: color.shade7 }}
                      onClick={() => handleColor(color.shade7)}
                    />
                  </span>
                );
              })}
            </ColorGrid>
          </ColorSection>
          <SectionTitle>More Colors</SectionTitle>
          <IconButton
            onClick={handleColorInputClick}
            style={{ backgroundColor: inputColor }}
          >
            +
            <input
              type="color"
              style={{ visibility: 'hidden' }}
              ref={ColorRef}
              onChange={handleInputColor}
            />
          </IconButton>
          <Button onClick={() => dispatch(setColor('transparent'))}>
            No Color
          </Button>
        </ColorMenuContainer>
      </Menu>

      <Stack direction="row" spacing={1}>
        {/* <ToolOutlinedSelect defaultValue={1}>
          <MenuItem value={1}>
            <FormatAlignLeftIcon style={{ display: 'flex' }} />
          </MenuItem>
          <MenuItem value={2}>
            <FormatAlignCenterIcon style={{ display: 'flex' }} />
          </MenuItem>
          <MenuItem value={3}>
            <FormatAlignRightIcon style={{ display: 'flex' }} />
          </MenuItem>
          <MenuItem value={4}>
            <FormatAlignJustifyIcon style={{ display: 'flex' }} />
          </MenuItem>
        </ToolOutlinedSelect> */}
        {/* <ToolOutlinedSelect
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={1}
        >
          <MenuItem value={1}>
            <FormatListBulletedIcon style={{ display: 'flex' }} />
          </MenuItem>
          <MenuItem value={2}>
            <FormatListNumberedIcon style={{ display: 'flex' }} />
          </MenuItem>
        </ToolOutlinedSelect> */}
      </Stack>
      {/* <ShapesCard
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <img src={ShapesIcon} alt="shapes_icon" />
      </ShapesCard> */}

      <CreditsComponent />

      <Menu
        id="basic-menu"
        anchorEl={anchorShapesEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <IconsContainer>
          {ShapesData.map(el => {
            return (
              <ShapeItem
                key={el.id}
                onClick={() => {
                  el.onClick();
                  handleClose();
                }}
              >
                <img src={el.icon} alt={el.name} />
              </ShapeItem>
            );
          })}
        </IconsContainer>
      </Menu>
    </MainToolContainer>
  );
};
export default CanvasTools;
