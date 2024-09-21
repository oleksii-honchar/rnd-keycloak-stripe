import { Logo } from "src/components/Logo";
import { Title } from "src/components/Title";
import { PageNavItems } from "./PageNavItems";

export function PageNavbar() {
  return (
    <div
      id="PageNavbar"
      className={`
        w-full mx-auto h-10
        flex items-center justify-center
        theme-navbar-bg
        theme-navbar-shadow
      `}
    >
      <div
        className={`
          w-full  px-2 
          md:max-w-6xl lg:max-w-6xl 
          relative flex h-10 space-x-2
          items-center justify-start
        `}
      >
        <Logo />
        <Title />
        <PageNavItems />
      </div>
    </div>
  );
}
