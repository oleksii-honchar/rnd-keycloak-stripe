import config from "config";
import path from "path";
import pino from "pino";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";

const logger = pino.default({ name: "webpack:config:snippet:dev-server" });
logger.info("loading 'DevServer'");

export const devServerConfig = (env: any) => {
  logger.info(`Preparing "DevServer" config`);

  return {
    devServer: {
      hot: env.LAUNCH_PROD_SERVER ? false : true,
      client: {
        logging: "info",
      },
      devMiddleware: {
        writeToDisk: true,
        publicPath: "/",
      },
      historyApiFallback: true,
      port: config.get("runtime.port"),
      static: path.join(getRootRepoDir(), "./dist"),
    },
  };
};
