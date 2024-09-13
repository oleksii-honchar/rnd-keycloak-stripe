import { ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
  className?: string;
}

export const Menu = ({ children, className }: MenuProps) => {
  return <div className={className}>{children}</div>;
};
