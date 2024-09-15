import { NavLink } from "react-router-dom";
import { classNames } from "src/utils/classNames";
import { UserAccountNavItemCntr } from "./UserAccountNavItemCntr/UserAccountNavItemCntr";

export function PageNavItems() {
  const navItems = [
    { name: "About", path: "/about" },
    { name: "Restricted", path: "/restricted" },
  ];

  return (
    <div
      className={`
        flex flex-row space-x-1 sm:space-x-4 h-10 items-center justify-center overflow-hidden 
        max-w-sm
      `}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => {
            return classNames(
              isActive
                ? "text-md-sys-light-on-primary bg-md-ref-pal-primary400/70"
                : `text-md-sys-light-on-primary
                   hover:text-md-sys-light-on-primary
                   hover:bg-md-ref-pal-primary300/70`,
              `
                active:bg-md-ref-pal-primary200/70
                px-2 sm:px-3 py-1 rounded-xl backdrop-blur-sm
                text-[8px] sm:text-sm font-medium no-underline 
                transition-all duration-200 
                focus:outline-none
              `,
            );
          }}
        >
          {item.name}
        </NavLink>
      ))}
      <UserAccountNavItemCntr />
    </div>
  );
}
