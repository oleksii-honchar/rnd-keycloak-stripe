import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import pino from "pino";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";

const logger = pino.default({ name: "webpack:config:snippet:module-css" });
logger.info("loading 'Module-CSS'");

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

  const cssConfigFull = {
    test: /\.css$/,
    include: /src\/assets/,
    use: [
      customLoader,
      {
        loader: "css-loader",
      },
    ],
  };

  const cssConfigNull = {
    test: /\.css$/i,
    include: /src\/assets/,
    use: [
      {
        loader: "null-loader",
      },
    ],
  };

  const pcssConfigFull = {
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
              env: env.NODE_ENV,
            },
            config: postCssConfigPath,
          },
        },
      },
    ],
  };

  const pcssConfigNull = {
    test: /\.pcss$/i,
    exclude: /src\/assets/,
    use: [
      {
        loader: "null-loader",
      },
    ],
  };

  const rules = [
    env.TS_TARGET == "es2016" && env.BUILD_LEGACY != "true"
      ? cssConfigNull
      : cssConfigFull,
    env.TS_TARGET == "es2016" && env.BUILD_LEGACY != "true"
      ? pcssConfigNull
      : pcssConfigFull,
  ];

  return {
    plugins: [...(env.LAUNCH_PROD_SERVER ? [] : plugins)],
    module: { rules },
  };
};
