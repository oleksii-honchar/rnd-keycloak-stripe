import { lazy, ReactElement, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BigSpinner } from "src/components/BigSpinner";
import { ErrorBoundary } from "src/components/ErrorBoundary";
import { NavContextProvider } from "src/contexts/NavigationContext";
import { Layout } from "./components/Layout";

const AboutPage = lazy(() => import("src/pages/About/AboutPage"));
const RestrictedPage = lazy(
  () => import("src/pages/Restricted/RestrictedPage"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <AboutPage />,
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
