import config from "config";
import CopyWebpackPlugin from "copy-webpack-plugin";
import moment from "moment";
import path from "path";
import pino from "pino";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack, { WebpackPluginInstance } from "webpack";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";

import pkg from "../../package.json" with { type: "json" };
const { PruneLicenseFilesInDist } = await import("./plugins/PruneLicenseFilesInDist.plugin.ts");
const { PruneDummyEntryInDist } = await import("./plugins/PruneDummyEntryInDist.plugin.ts");

const logger = pino.default({ name: "webpack:config:snippet:base" });
logger.info("loading 'Base'");

const outputPath = path.join(getRootRepoDir(), "./dist/assets");

const nodeEnv = config.get("runtime.environment");
const logLevel = config.get("runtime.logLevel");

export const baseConfig = (env: any = {}) => {
  const outputSuff = env.TS_TARGET === "es2016" ? "es2016.js" : "mjs";

  logger.info(`'Base' processing '${env.TS_TARGET}' config`);

  const plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv),
        LOG_LEVEL: JSON.stringify(logLevel),
        PKG_NAME: JSON.stringify(pkg.name),
        PKG_VERSION: JSON.stringify(pkg.version),
        BUILD_VERSION: JSON.stringify(moment().format("YYYYMMDDHHmmss")),
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
          globOptions: { ignore: ["**/*.hbs", "**/.DS_Store", "**/index.hbs", "**/favicons/**"] },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/favicons",
          to: "../favicons",
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
          configFile: path.join(getRootRepoDir(), `./tsconfig.${env.TS_TARGET}.json`),
          logLevel: "INFO",
        }),
      ],
    },
    output: {
      path: outputPath,
      filename: `[name].bundle.${outputSuff}`,
      chunkFilename: `[name].bundle.${outputSuff}`,
      sourceMapFilename: `[name].${env.TS_TARGET}.map`,
      publicPath: "/assets/",
    },
    plugins: [
      ...(env.LAUNCH_PROD_SERVER ? [new PruneDummyEntryInDist(outputPath)] : plugins),
      new PruneLicenseFilesInDist(outputPath) as WebpackPluginInstance,
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
