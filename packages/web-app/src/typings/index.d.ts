export * from "./AppConfig.d.ts";

declare global {
  const PKG_NAME: string;
  const PKG_VERSION: string;

  interface Window {
    config: object;
  }
}

declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "@ciklum/logan";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StringIndex = Record<string, any>;

export type NavigationItem = {
  name: string;
  path: string;
};
