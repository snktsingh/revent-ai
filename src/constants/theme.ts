import {
  createTheme,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    darkGrey: string;
    background: string;
    lightGrey: string;
    buttonHover: string;
    border: string;
    subtext: string;
    steelBlue: string;
  }
}

export const theme = extendTheme({
  typography: {
    fontFamily: 'Red Hat Display, sans-serif',
    allVariants: {
      textTransform: 'none',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '17px',
    },
    button: {
      textTransform: 'none',
    },
  },

  colorSchemes: {
    light: {
      palette: {
        common: {
          black: '#000',
          white: '#fff',
          lightGrey: '#2f2f2f',
          darkGrey: '#4D4D4D',
          background: '#F3F3F3',
          buttonHover: '#5373BC',
          border: '#D9D9D9',
          subtext: '#A9A9A9',
          steelBlue: '#B0BCDE',
        },
        primary: {
          main: '#004FBA',
        },
        secondary: {
          main: '#27C59A',
        },
      },
    },
  },
});

export type Theme = typeof theme;
