import config from "config";
import CopyWebpackPlugin from "copy-webpack-plugin";
import moment from "moment";
import path from "path";
import pino from "pino";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";

import pkg from "../../package.json" with { type: "json" };
const { PruneLicenseFilesInDist } = await import(
  "./plugins/PruneLicenseFilesInDist.plugin.ts"
);
const { PruneDummyEntryInDist } = await import(
  "./plugins/PruneDummyEntryInDist.plugin.ts"
);

const logger = pino.default({ name: "webpack:config:snippet:base" });
logger.info("loading 'Base'");

const outputPath = path.join(getRootRepoDir(), "./dist/assets");

const logLevel = config.get("runtime.logLevel");

export const baseConfig = (env: any = {}) => {
  const outputSuff = env.TS_TARGET === "es2016" ? "es2016.js" : "mjs";
  const nodeEnv = env.NODE_ENV;

  logger.info(`'Base' processing '${env.TS_TARGET}' config`);

  const plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv),
        LOG_LEVEL: JSON.stringify(logLevel),
        PKG_NAME: JSON.stringify(pkg.name),
        PKG_VERSION: JSON.stringify(pkg.version),
        BUILD_VERSION: JSON.stringify(moment().format("YYYYMMDDHHmmss")),
        KEYCLOAK_URL: JSON.stringify(config.get("keycloak.url")),
        KEYCLOAK_REALM: JSON.stringify(config.get("keycloak.realm")),
        KEYCLOAK_CLIENT_ID: JSON.stringify(config.get("keycloak.clientId")),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: nodeEnv !== "production",
      minimize: nodeEnv === "production",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: ".",
          globOptions: {
            ignore: [
              "**/*.hbs",
              "**/.DS_Store",
              "**/index.hbs",
              "**/assets/icons/**",
            ],
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/icons",
          to: "../assets/icons",
        },
      ],
    }),
  ];

  return {
    stats: "minimal",
    mode: nodeEnv,
    cache: true,
    devtool: nodeEnv === "production" ? false : "inline-source-map",
    resolve: {
      fallback: {
        os: false,
      },
      extensions: [".js", ".jsx", ".html", ".ts", ".tsx", ".css", ".pcss"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
      modules: ["src", "node_modules"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.join(
            getRootRepoDir(),
            `./tsconfig.${env.TS_TARGET}.json`,
          ),
          logLevel: "INFO",
        }),
      ],
    },
    output: {
      path: outputPath,
      filename: `[name].bundle.${outputSuff}`,
      chunkFilename: `[name].bundle.${outputSuff}`,
      sourceMapFilename: `[name].${env.TS_TARGET}.map`,
      // publicPath: "/assets/",
      publicPath: "/",
    },
    plugins: [
      ...(env.LAUNCH_PROD_SERVER
        ? [new PruneDummyEntryInDist(outputPath)]
        : plugins),
      new PruneLicenseFilesInDist(outputPath) as webpack.WebpackPluginInstance,
    ],
    node: false,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 1000,
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 20000,
      },
    },
  };
};
