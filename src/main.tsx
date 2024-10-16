// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Auth0Provider
    domain='dev-g8l6okgqllb6dkiy.us.auth0.com'
    clientId='KzJ8QK8pF2oYpb8VNA6auZ1L8BcGnbKG'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Auth0Provider>
  // </StrictMode>,
);
