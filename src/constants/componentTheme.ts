import { createTheme } from '@mui/material';

export const elementTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          position: 'inherit',
          margin: '0px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
        content: {
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '0px',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
  },
});
