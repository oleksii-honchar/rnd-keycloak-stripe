import { DisclosurePanel } from "@headlessui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NavigationContext } from "src/contexts/NavigationContext";
import { classNames } from "src/utils/classNames";

export function PageMobileNavItems() {
  const { navItems } = useContext(NavigationContext);
  return (
    <DisclosurePanel className="sm:hidden ">
      {({ close }) => (
        <div
          className={`
          space-y-1 px-2 pb-3 pt-2 absolute right-0 w-full
          shadow-lg
          bg-md-ref-pal-primary500
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
              className={({ isActive }) => {
                return classNames(
                  isActive
                    ? "text-md-sys-light-on-primary bg-md-ref-pal-primary600"
                    : `text-md-sys-light-on-primary/90
                      hover:text-md-sys-light-on-primary/90
                      hover:bg-md-ref-pal-primary600/40
                    `,
                  "block rounded-full px-3 py-2 text-base font-medium",
                );
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </DisclosurePanel>
  );
}
