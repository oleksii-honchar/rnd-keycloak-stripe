import { createContext } from "react";
import type { AppConfig } from "src/typings/index.d.ts";

export const appConfig: AppConfig = {
  name: process.env.PKG_NAME as string,
  version: process.env.PKG_VERSION as string,
  config: {
    logLevel: process.env.LOG_LEVEL,
    isNode: false,
    startApp: true,
  },
};

const AppConfigContext = createContext({} as AppConfig);
export const AppConfigProvider = AppConfigContext.Provider;

// export const useAppConfig = () => {
//   const appConfig = useContext(AppConfigContext);
//   if (!appConfig) throw new Error('Can\'t create "UseAppConfig"');
//
//   return appConfig;
// };
