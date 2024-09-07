import path from "path";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import moment from "moment";
// @ts-ignore
import LoaderOptionsPlugin from "webpack/lib/LoaderOptionsPlugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import { getRootRepoDir } from "scripts/esm-utils.ts";
import { blablo } from "blablo";

const { PruneLicenseFilesInDist } = await import("./plugins/PruneLicenseFilesInDist.plugin.ts");
const { PruneDummyEntryInDist } = await import("./plugins/PruneDummyEntryInDist.plugin.ts");

const logHeader = "[webpack:config:snippet]".cyan;
blablo.log(logHeader, "loading", "'Base'".white.bold).finish();

const outputPath = path.join(getRootRepoDir(), "./dist/assets");
import pkg from "package.json" assert { type: "json" };

export const baseConfig = (env: any = {}) => {
  const outputSuff = env.TS_TARGET === "es2016" ? "es2016.js" : "mjs";

  blablo.cleanLog(logHeader, `'Base' processing '${env.TS_TARGET}' config`);

  const plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        LOG_LEVEL: JSON.stringify(env.LOG_LEVEL),
        PKG_NAME: JSON.stringify(pkg.name),
        PKG_VERSION: JSON.stringify(pkg.version),
        BUILD_VERSION: JSON.stringify(moment().format("YYYYMMDDHHmmss")),
      },
    }),
    new LoaderOptionsPlugin({
      debug: env.NODE_ENV !== "production",
      minimize: env.NODE_ENV === "production",
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
    mode: env.NODE_ENV,
    cache: true,
    devtool: env.NODE_ENV === "production" ? false : "inline-source-map",
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
          configFile: path.join(getRootRepoDir(), `./.configs/tsconfig.${env.TS_TARGET}.json`),
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
      new PruneLicenseFilesInDist(outputPath),
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
