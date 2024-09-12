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
      bg-[radial-gradient(ellipse_90%_50%_at_50%_10%,_var(--tw-gradient-stops))] 
      bg-gradient-to-br
      from-md-ref-pal-primary200 to-md-ref-pal-tertiary600
      bg-contain bg-no-repeat bg-top bg-cover
    `}
    >
      <ScrollToTop />
      <PageNavbar />
      <main className="w-full flex flex-col flex-1 items-center justify-start">
        <Outlet />
        <ScrollDownIndicator />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
