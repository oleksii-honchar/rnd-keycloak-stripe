import { lazy, Suspense, ReactElement } from "react";

import { BigSpinner } from "src/components/BigSpinner.tsx";
import { Layout } from "./components/Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "src/components/ErrorBoundary.tsx";
import { NavContextProvider } from "src/contexts/NavigationContext.tsx";

const AboutPage = lazy(() => import("src/pages/About/AboutPage.tsx"));
const PalettePage = lazy(() => import("src/pages/Palette/PalettePage.tsx"));

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
