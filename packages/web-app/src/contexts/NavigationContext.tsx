import { createContext, ReactNode } from "react";
import type { NavigationItem } from "src/typings";
interface NavigationContextProps {
  navItems?: NavigationItem[];
  children?: ReactNode[];
}

interface NavigationContextProviderProps {
  children: ReactNode | ReactNode[];
}

const navigationItemsInitial: NavigationItem[] = [
  { name: "About", path: "about" },
  { name: "Restricted", path: "restricted" },
];

const navCtxInitial: NavigationContextProps = {
  navItems: navigationItemsInitial,
};

export const NavigationContext = createContext(navCtxInitial);

export const NavContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  return (
    <NavigationContext.Provider value={navCtxInitial}>
      {Array.isArray(children) ? children : [children]}
    </NavigationContext.Provider>
  );
};
