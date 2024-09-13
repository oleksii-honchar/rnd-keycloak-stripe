import { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export const MenuItem = ({ children, className = "" }: MenuItemProps) => {
  return (
    <div
      className={
        `
        flex flex-row justify-start items-center
        rounded-md px-3 py-1
        hover:bg-md-sys-light-primary/50
        hover:text-md-sys-light-on-primary
        cursor-pointer
      ` +
        " " +
        className
      }
    >
      {children}
    </div>
  );
};
