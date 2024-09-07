import path from "path";
import { blablo } from "blablo";
import { getRootRepoDir } from "scripts/esm-utils.ts";

const logHeader = "[webpack:config:snippet]".cyan;
blablo.log(logHeader, "loading", "'DevServer'".white.bold).finish();

export const devServerConfig = (env: any) => {
  blablo.cleanLog(logHeader, `Base: processing "${env.TS_TARGET}" config`);

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
      port: env.SERVE_PORT,
      static: path.join(getRootRepoDir(), "./dist"),
    },
  };
};
