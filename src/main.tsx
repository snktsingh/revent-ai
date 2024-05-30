import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { store } from './redux/store';
import { theme } from './constants/theme';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.css';
import Application from './application';
import { Slide, ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/Error';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            transition={Slide}
          />
          <Application />
        </BrowserRouter>
      </CssVarsProvider>
    </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
``;
