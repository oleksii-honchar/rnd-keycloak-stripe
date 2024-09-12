import { NavLink } from "react-router-dom";
import { classNames } from "src/utils/classNames";
import { UserAccountNavItemCntr } from "./UserAccountNavItemCntr/UserAccountNavItemCntr";

export function PageNavItems() {
  const navItems = [
    { name: "About", path: "/about" },
    { name: "Restricted", path: "/restricted" },
  ];

  return (
    <div className="flex flex-row space-x-4 h-10 items-center justify-center overflow-hidden ">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => {
            return classNames(
              isActive
                ? "text-md-sys-light-on-primary bg-md-sys-light-primary"
                : `text-md-sys-light-primary
                   hover:text-md-sys-light-on-primary
                   hover:bg-md-sys-light-primary`,
              `
                active:bg-md-ref-pal-primary200
                px-3 py-4 
                text-sm font-medium no-underline 
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
