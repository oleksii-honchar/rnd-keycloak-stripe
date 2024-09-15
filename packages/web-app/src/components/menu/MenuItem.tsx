import { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode | ReactNode[];
  className?: string;
  onClick?: () => void; // Add onClick prop
}

export const MenuItem = ({
  children,
  className = "",
  onClick,
}: MenuItemProps) => {
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
      onClick={onClick} // Attach onClick handler
    >
      {children}
    </div>
  );
};
