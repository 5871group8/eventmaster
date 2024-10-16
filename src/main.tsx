// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Auth0Provider
    domain='dev-g8l6okgqllb6dkiy.us.auth0.com'
    clientId='KzJ8QK8pF2oYpb8VNA6auZ1L8BcGnbKG'
    authorizationParams={{
      redirect_uri: `${window.location.origin}/eventmaster`,
    }}
  >
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Auth0Provider>
  // </StrictMode>,
);
