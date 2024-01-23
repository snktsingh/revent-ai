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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <BrowserRouter>
          <Auth0Provider
            domain="dev-qpotj6mrcodhw84w.us.auth0.com"
            clientId="OyB6ngw5kRsG7BYQBl4LI93skFS7KnGT"
            authorizationParams={{
              redirect_uri: 'http://localhost:3000/dashboard',
            }}
          >
            <Router />
          </Auth0Provider>
        </BrowserRouter>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
``;
