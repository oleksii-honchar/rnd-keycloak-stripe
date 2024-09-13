import { ReactNode } from "react";

interface MenuItemsProps {
  children: ReactNode | ReactNode[];
}

export const MenuItems = ({ children }: MenuItemsProps) => {
  return <div>{children}</div>;
};
