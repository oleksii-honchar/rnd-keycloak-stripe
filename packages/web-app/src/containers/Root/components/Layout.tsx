import { Outlet } from "react-router-dom";

import { Footer } from "src/components/Footer";
import { PageNavbar } from "src/components/PageNavbar";
import { ScrollDownIndicator } from "src/components/ScrollDownIndicator";
import { ScrollToTop } from "src/components/ScrollToTop";

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
