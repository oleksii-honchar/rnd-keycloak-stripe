import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { NavigationContext } from "src/contexts/NavigationContext";
import { classNames } from "src/utils/classNames";

export function PageNavItems() {
  const { navItems } = useContext(NavigationContext);

  return (
    <div className="hidden sm:block absolute right-0">
      <div className="flex space-x-4">
        {navItems!.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => {
              return classNames(
                isActive
                  ? "text-md-sys-light-on-primary bg-md-ref-pal-primary600"
                  : `text-md-sys-light-on-surface-container/90  
                   hover:text-md-sys-light-on-primary/90
                   hover:bg-md-ref-pal-primary600/40`,
                "rounded-full px-3 py-2 text-sm font-medium",
              );
            }}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
