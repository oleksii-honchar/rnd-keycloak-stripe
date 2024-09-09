import config from "config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import pino from "pino";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";

const logger = pino.default({ name: "webpack:config:snippet:module-css" });
logger.info("loading 'Module-CSS'");

const nodeEnv = config.get("runtime.environment");

export const cssModuleConfig = (env: any) => {
  const postCssConfigPath = path.join(
    getRootRepoDir(),
    "./config/webpack/postcss.config.ts",
  );

  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ];

  const customLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "/assets/stylesheets/",
    },
  };

  return {
    plugins: [...(env.LAUNCH_PROD_SERVER ? [] : plugins)],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /src\/assets/,
          use: [
            customLoader,
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.pcss$/i,
          exclude: /src\/assets/,
          use: [
            customLoader,
            {
              loader: "css-loader",
              options: {
                modules: false, // true cause to obfuscation
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ctx: {
                    env: nodeEnv,
                  },
                  config: postCssConfigPath,
                },
              },
            },
          ],
        },
      ],
    },
  };
};
