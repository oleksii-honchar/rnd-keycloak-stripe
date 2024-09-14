import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Footer } from "src/components/Footer";
import { ScrollDownIndicator } from "src/components/ScrollDownIndicator";
import { ScrollToTop } from "src/components/ScrollToTop";
import { PageNavbar } from "src/containers/PageNavbar/PageNavbar";

export function Layout() {
  return (
    <div
      className={`
      flex min-h-screen w-full flex-col 
      theme-layout-bg
    `}
    >
      <ScrollToTop />
      <PageNavbar />
      <main className="w-full flex flex-col flex-1 items-center justify-start rounded-xl theme-main-bg">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
