import { lazy, ReactElement, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import { BigSpinner } from "src/components/BigSpinner";
import { ErrorBoundary } from "src/components/ErrorBoundary";
import { NavContextProvider } from "src/contexts/NavigationContext";
import { Layout } from "./components/Layout";

const AboutPage = lazy(() => import("src/pages/About/AboutPage"));
const RestrictedPage = lazy(
  () => import("src/pages/Restricted/RestrictedPage"),
);

function RedirectToAboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/about");
  }, [navigate]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <RedirectToAboutPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "restricted",
        element: <RestrictedPage />,
      },
    ],
  },
]);
export function Root(): ReactElement {
  return (
    <Suspense fallback={<BigSpinner />}>
      <NavContextProvider>
        <RouterProvider router={router} />
      </NavContextProvider>
    </Suspense>
  );
}
