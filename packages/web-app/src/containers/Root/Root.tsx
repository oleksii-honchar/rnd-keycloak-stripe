import { lazy, ReactElement, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BigSpinner } from "src/components/BigSpinner";
import { ErrorBoundary } from "src/components/ErrorBoundary";
import { NavContextProvider } from "src/contexts/NavigationContext";
import { Layout } from "./components/Layout";

const AboutPage = lazy(() => import("src/pages/About/AboutPage"));
const PalettePage = lazy(() => import("src/pages/Palette/PalettePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PalettePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "palette",
        element: <PalettePage />,
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
