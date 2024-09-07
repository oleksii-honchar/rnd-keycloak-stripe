import { NavLink } from "react-router-dom";
import { classNames } from "src/utils/classNames.ts";
import { Disclosure } from "@headlessui/react";
import { useContext } from "react";
import { NavigationContext } from "src/contexts/NavigationContext.tsx";

export function PageMobileNavItems() {
  const { navItems } = useContext(NavigationContext);
  return (
    <Disclosure.Panel className="sm:hidden ">
      {({ close }) => (
        <div
          className={`
          space-y-1 px-2 pb-3 pt-2 absolute right-0 w-full
          shadow-lg
          bg-md3-ref-primary-primary50
          z-10
        `}
        >
          {navItems!.map((item) => (
            <NavLink
              onClick={() => {
                close();
              }}
              key={item.name}
              to={item.path}
              className={({ isActive, isPending }) => {
                return classNames(
                  isActive
                    ? "text-md3-sys-light-on-primary bg-md3-ref-primary-primary40"
                    : `text-md3-sys-light-on-primary/90
                      hover:text-md3-sys-light-on-primary/90
                      hover:bg-md3-ref-primary-primary40/40
                    `,
                  "block rounded-full px-3 py-2 text-base font-medium"
                );
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </Disclosure.Panel>
  );
}
