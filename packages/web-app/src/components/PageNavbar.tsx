import { Disclosure } from "@headlessui/react";
import { Logo } from "./Logo.tsx";
import { PageNavHamburgerButton } from "./PageNavHamburgerButton.tsx";
import { PageMobileNavItems } from "./PageMobileNavItems.tsx";
import { PageNavItems } from "./PageNavItems.tsx";
import { Title } from "./Title.tsx";

export function PageNavbar() {
  return (
    <>
      <div
        className={`
        h-12 w-full absolute
        bg-[radial-gradient(ellipse_90%_70%_at_20%_50%,_var(--tw-gradient-stops))] 
        from-md3-ref-primary-primary99 to-md3-ref-primary-primary90
        bg-contain bg-no-repeat bg-top
      `}
      />
      <Disclosure as="nav" className="backdrop-blur-md bg-md3-sys-light-surface/40 shadow-md sticky top-0 z-10">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 max-w-2xl md:max-w-3xl lg:max-w-5xl">
              <div className="relative flex h-12 items-center justify-between">
                <PageNavHamburgerButton open={open} />
                <div className="flex flex-1 items-center justify-center  sm:justify-start">
                  <Logo />
                  <Title />
                  <PageNavItems />
                </div>
              </div>
            </div>

            <PageMobileNavItems />
          </>
        )}
      </Disclosure>
    </>
  );
}
