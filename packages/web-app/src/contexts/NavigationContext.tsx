import { createContext, ReactNode } from "react";
import type { NavigationItem } from "src/typings/index.d.ts";
interface NavigationContextProps {
  navItems?: NavigationItem[];
  children?: ReactNode[];
}

interface NavigationContextProviderProps {
  children?: ReactNode[];
}

const navigationItemsInitial: NavigationItem[] = [
  { name: "About", path: "about" },
  { name: "Palette", path: "palette" },
];

const navCtxInitial: NavigationContextProps = {
  navItems: navigationItemsInitial,
};

export const NavigationContext = createContext(navCtxInitial);

export function NavContextProvider({ children }: NavigationContextProviderProps) {
  return <NavigationContext.Provider value={navCtxInitial}>{children}</NavigationContext.Provider>;
}
