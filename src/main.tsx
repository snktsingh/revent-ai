import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { store } from './redux/store';
import { theme } from './constants/theme';
import Router from './router';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { elementTheme } from './constants/componentTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        {/* <ThemeProvider theme={elementTheme}> */}
          <BrowserRouter>
            <Auth0Provider
              domain="dev-qpotj6mrcodhw84w.us.auth0.com"
              clientId="gLA2jBKZO9mYOZ9KNmnms5Qm9VMBG6O9"
              authorizationParams={{
                redirect_uri: window.location.origin + '/dashboard',
              }}
            >
              <Router />
            </Auth0Provider>
          </BrowserRouter>
        {/* </ThemeProvider> */}
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
``;
