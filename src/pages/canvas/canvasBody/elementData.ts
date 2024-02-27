import {
  AddBullet,
  AddCycle,
  AddFunnel,
  AddHeading,
  AddImage,
  AddList,
  AddParagraph,
  AddProcess,
  AddPyramid,
  AddQuote,
  AddSubtitle,
  AddTable,
  AddTimeline,
  AddTitle,
  ArrowIcon,
  CircleIcon,
  Diamond,
  Hexagon,
  LeftArrowIcon,
  LineIcon,
  RectIcon,
  RightArrowIcon,
  SaveTemplate,
  StarIcon,
  TriangleIcon,
} from '@/constants/media';

interface IElementData {
  key: number;
  icon: string;
  title: string;
  subtitle: string;
  onClick: Function;
}

export const elementData: IElementData[] = [
  // {
  //   key: 1,
  //   icon: SaveTemplate,
  //   title: 'Save Template',
  //   subtitle: 'Save the current slide as template',
  //   onClick: () => {},
  // },
  {
    key: 2,
    icon: AddTitle,
    title: 'Title',
    subtitle: 'Add a Title onto the canvas',
    onClick: () => {},
  },
  {
    key: 3,
    icon: AddSubtitle,
    title: 'Subtitle',
    subtitle: 'Add a Subtitle onto the canvas',
    onClick: () => {},
  },
  // {
  //   key: 4,
  //   icon: AddHeading,
  //   title: 'Heading',
  //   subtitle: 'Add Heading to the Canvas',
  //   onClick: () => {},
  // },
  {
    key: 5,
    icon: AddParagraph,
    title: 'Paragraph',
    subtitle: 'Add a Paragraph onto the canvas',
    onClick: () => {},
  },
  {
    key: 6,
    icon: AddBullet,
    title: 'Bullet',
    subtitle: 'Add Bullet Points onto the canvas',
    onClick: () => {},
  },
  {
    key: 7,
    icon: AddImage,
    title: 'Image',
    subtitle: 'Add Images onto the canvas',
    onClick: () => {},
  },
  {
    key: 8,
    icon: AddTable,
    title: 'Table',
    subtitle: 'Add Tables onto the canvas',
    onClick: () => {},
  },
  {
    key: 9,
    icon: AddQuote,
    title: 'Quotes',
    subtitle: 'Suitable for Client Testimonials, Management Commentary',
    onClick: () => {},
  },
  {
    key: 10,
    icon: AddList,
    title: 'List',
    subtitle: 'Suitable for Client Lists, Team Lists',
    onClick: () => {},
  },
  {
    key: 11,
    icon: AddCycle,
    title: 'Cycle',
    subtitle: 'Suitable for cyclical processes',
    onClick: () => {},
  },
  {
    key: 12,
    icon: AddProcess,
    title: 'Process',
    subtitle: 'Suitable to demonstrate steps or order',
    onClick: () => {},
  },
  {
    key: 13,
    icon: AddTimeline,
    title: 'Timeline',
    subtitle: 'Suitable to show roadmaps and similar plans',
    onClick: () => {},
  },
  {
    key: 14,
    icon: AddFunnel,
    title: 'Funnel',
    subtitle: 'Suitable for stages, pipelines relating to customers',
    onClick: () => {},
  },
  {
    key: 15,
    icon: AddPyramid,
    title: 'Pyramid',
    subtitle: 'Suitable for data in hierarchical order',
    onClick: () => {},
  },
];

export interface Shapes {
  id: number;
  name: string;
  icon?: string;
  onClick: Function;
}

export const ShapesData: Shapes[] = [
  {
    id: 1,
    name: 'Rectangle',
    icon: RectIcon,
    onClick: () => {},
  },
  {
    id: 2,
    name: 'Arrow',
    icon: ArrowIcon,
    onClick: () => {},
  },
  {
    id: 3,
    name: 'Line',
    icon: LineIcon,
    onClick: () => {},
  },
  {
    id: 4,
    name: 'Circle',
    icon: CircleIcon,
    onClick: () => {},
  },
  {
    id: 5,
    name: 'Triangle',
    icon: TriangleIcon,
    onClick: () => {},
  },
  {
    id: 6,
    name: 'Star',
    icon: StarIcon,
    onClick: () => {},
  },
  {
    id: 7,
    name: 'Right Arrow',
    icon: RightArrowIcon,
    onClick: () => {},
  },
  {
    id: 8,
    name: 'Left Arrow',
    icon: LeftArrowIcon,
    onClick: () => {},
  },
  {
    id: 9,
    name: 'HexagonOutlinedIcon',
    icon: Hexagon,
    onClick: () => {},
  },
  {
    id: 10,
    name: 'Diamond',
    icon: Diamond,
    onClick: () => {},
  },
];

export interface ColorsType {
  title: string;
  color: string;
}

export const ColorsData: ColorsType[] = [
  {
    title: 'Red',
    color: ' #ff0000',
  },
  {
    title: 'Green',
    color: '#008000',
  },
  {
    title: 'Blue',
    color: '#0000ff',
  },
  {
    title: 'Yellow',
    color: '#ffff00',
  },
  {
    title: 'Purple',
    color: '#800080',
  },
  {
    title: 'Orange',
    color: '#ffA500',
  },
  {
    title: 'Pink',
    color: '#ffc0cb',
  },
  {
    title: 'Brown',
    color: '#a52a2a',
  },
  {
    title: 'Black',
    color: '#000000',
  },
  {
    title: 'White',
    color: '#ffffff',
  },
];

export const ThemeColor = [
  { theme: '#000000' },
  { theme: '#004080' },
  { theme: '#00802b' },
  { theme: '#e60000' },
  { theme: '#990099' },
  { theme: '#000099' },
  { theme: '#ffcc00' },
  { theme: '#b300b3' },
];

export interface ShadesType {
  shade1: string;
  shade2: string;
  shade3: string;
  shade4: string;
  shade5: string;
  shade6: string;
  shade7: string;
}

export const shadesData: ShadesType[] = [
  {
    shade1: '#ffffff',
    shade2: '#f2f2f2',
    shade3: '#e6e6e6',
    shade4: '#bfbfbf',
    shade5: '#999999',
    shade6: '#737373',
    shade7: '#1a1a1a',
  },
  {
    shade1: '#e6f5ff',
    shade2: '#b3e0ff',
    shade3: '#80ccff',
    shade4: '#4db8ff',
    shade5: '#1aa3ff',
    shade6: '#008ae6',
    shade7: '#006bb3',
  },
  {
    shade1: '#ebfaeb',
    shade2: '#c2f0c2',
    shade3: '#99e699',
    shade4: '#70db70',
    shade5: '#47d147',
    shade6: '#2eb82e',
    shade7: '#248f24',
  },
  {
    shade1: '#ffcccc',
    shade2: '#ff9999',
    shade3: '#ff6666',
    shade4: '#ff3333',
    shade5: '#ff0000',
    shade6: '#cc0000',
    shade7: '#990000',
  },
  {
    shade1: '#f5ccff',
    shade2: '#eb99ff',
    shade3: '#e066ff',
    shade4: '#d633ff',
    shade5: '#cc00ff',
    shade6: '#a300cc',
    shade7: '#7a0099',
  },
  {
    shade1: '#e6e6ff',
    shade2: '#b3b3ff',
    shade3: '#8080ff',
    shade4: '#4d4dff',
    shade5: '#1a1aff',
    shade6: '#0000e6',
    shade7: '#0000b3',
  },
  {
    shade1: '#fff5cc',
    shade2: '#ffeb99',
    shade3: '#ffe066',
    shade4: '#ffd633',
    shade5: '#ffcc00',
    shade6: '#cca300',
    shade7: '#997a00',
  },
  {
    shade1: '#ffe6ff',
    shade2: '#ffb3ff',
    shade3: '#ff80ff',
    shade4: '#ff4dff',
    shade5: '#ff1aff',
    shade6: '#e600e6',
    shade7: '#b300b3',
  },
];
interface ColorChangeType {
  colorFillChange: Function;
  colorBorderChange: Function;
  colorTextChange: Function;
}
export let colorChange: ColorChangeType = {
  colorFillChange: () => {},
  colorBorderChange: () => {},
  colorTextChange: () => {},
};

interface ContentEle {
  addTitle: Function;
  openFullScreen: Function;
  handleBold: Function;
  handleItalic: Function;
  handleUnderlIne: Function;
  handleOpenTable: Function;
  handleFunnel: Function;
  handlePyramid: Function;
  handleCycle: Function;
  handleProcess: Function;
  handleTimeline: Function;
  handleFontSize: Function;
  handleFontFamily: Function;
}

export const ContentElements: ContentEle = {
  addTitle: () => {},
  openFullScreen: () => {},
  handleBold: () => {},
  handleItalic: () => {},
  handleUnderlIne: () => {},
  handleOpenTable: () => {},
  handleFunnel: () => {},
  handlePyramid: () => {},
  handleCycle: () => {},
  handleProcess: () => {},
  handleTimeline: () => {},
  handleFontSize: () => {},
  handleFontFamily: () => {},
};

interface variantsType {
  addVariantsCanvas: Function;
}
