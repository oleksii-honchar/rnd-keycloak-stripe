import { lazy, ReactElement, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

import { BigSpinner } from 'src/components/BigSpinner';
import { ErrorBoundary } from 'src/components/ErrorBoundary';
import { ProtectedRoute } from 'src/components/ProtectedRoute';
import { KeyCloakContextProvider } from 'src/contexts/KeyCloakContext';
import { NavContextProvider } from 'src/contexts/NavigationContext';
import { Layout } from './components/Layout';

const AboutPage = lazy(() => import('src/pages/About/AboutPage'));
const RestrictedPage = lazy(() => import('src/pages/Restricted/RestrictedPage'));

function RedirectToAboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/about');
  }, [navigate]);

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RedirectToAboutPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'restricted',
        element: (
          <ProtectedRoute>
            <RestrictedPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const keycloakConfig = {
  url: process.env.KEYCLOAK_URL as string,
  realm: process.env.KEYCLOAK_REALM as string,
  clientId: process.env.KEYCLOAK_CLIENT_ID as string,
};

export function Root(): ReactElement {
  return (
    <Suspense fallback={<BigSpinner />}>
      <KeyCloakContextProvider config={keycloakConfig}>
        <NavContextProvider>
          <RouterProvider router={router} />
        </NavContextProvider>
      </KeyCloakContextProvider>
    </Suspense>
  );
}
