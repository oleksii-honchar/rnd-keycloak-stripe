import { Outlet } from "react-router-dom";

import { PageNavbar } from "src/components/PageNavbar.tsx";
import { Footer } from "src/components/Footer.tsx";
import { ScrollToTop } from "src/components/ScrollToTop.tsx";
import { ScrollDownIndicator } from "src/components/ScrollDownIndicator.tsx";

export function Layout({}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-md3-white ">
      <ScrollToTop />
      <PageNavbar />
      <main className="w-full flex flex-col flex-1 items-center justify-start">
        <Outlet />
        <ScrollDownIndicator />
      </main>
      <Footer />
    </div>
  );
}
