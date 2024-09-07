/**
 * This wrapper allows to use ESM ts webpack configs in order to have esm style modules in whole repo
 */
// eslint-disable-next-line import/default
import webpack from "webpack";
// eslint-disable-next-line import/default
import WebpackDevServer from "webpack-dev-server";
// eslint-disable-next-line import/default
import minimist from "minimist";
import process from "node:process";
import colors from "colors";
import * as emoji from "node-emoji";
import path from "path";

import type { StringIndex } from "src/typings/index.d.ts";
import { pick } from "scripts/ts-utils.ts";
import { blablo } from "blablo";
import { getRootRepoDir, setCurrMetaUrl } from "scripts/esm-utils.ts";
import { nl } from "src/utils/native-lodash.ts";

setCurrMetaUrl(import.meta.url);
colors.enable();

const logHeader = "[Webpack]".cyan.bold;
const emoSparkles: string = emoji.get(emoji.find("✨")?.key ?? "") || "";
const parsedArgs = minimist(process.argv.slice(2));
const argv = {
  mode: "development",
  config: "./.configs/webpack.config.ts",
  watch: false,
  open: false,
  stats: "minimal",
  launchServer: !!parsedArgs["launch-server"],
  env: [],
  ...parsedArgs,
};

// additional env vars can be passed through Webpack "--env VAR=VALUE" param
// for every VAR needs to be used new --env param, e.g. "--env VAR1=V1 --env VAR2=V2"
argv.env = Array.isArray(argv.env) ? argv.env : [argv.env]; // when single param provided it is string, not array
const customEnv = argv.env.reduce((acc: StringIndex, curr: string) => {
  const [key, value] = curr.split("=");
  acc[key] = value;
  return acc;
}, {});

const env: StringIndex = {
  LAUNCH_PROD_SERVER: process.env.NODE_ENV === "production" && !!argv.launchServer,
  ...customEnv,
  ...pick(process.env, ["NODE_ENV", "BUILD_ANALYZE", "TS_LOADER", "LOG_LEVEL", "SERVE_PORT"]),
};

// Let's check if proper ts-TS_LOADER used
if (env.TS_LOADER) {
  const validTSLoaders = ["esbuild", "ts-loader"];
  const valueIndex = validTSLoaders.indexOf(env.TS_LOADER);
  if (valueIndex === -1) {
    blablo.error(`You have to use following options for TS_LOADER: ${validTSLoaders.join(", ")}`.red);
    process.exit(1);
  }
}

// blablo.cleanLog(argv);
// blablo.cleanLog(env);

// Param "--watch" used to enable "build + watch" mode
// Param "--launch-server" used to enable "build(dev) + static serv" mode
// Param "--open" used to open browser after build. This param works only with --launch-dev-server
let watching = null;
let devServer = null;
const operationMode = argv.launchServer ? "server" : argv.watch ? "watch" : "build";
const cfgPath = path.join(getRootRepoDir(), argv.config);
const { configFactory } = await import(cfgPath);
const config = configFactory(env, argv as any);

// blablo.cleanLog(logHeader, "config", config);
blablo.cleanLog(logHeader, `starting ${operationMode.white.bold}`, emoji.get(emoji.find("rocket")?.key ?? ""));

// @ts-ignore

if (operationMode === "server") {
  // expecting config here to be object, not [{},{}]
  const compiler = webpack({ ...config, stats: argv.stats });

  const devServerOptions = { ...config.devServer, open: argv.open };
  // blablo.cleanLog(logHeader, "devServerOptions", devServerOptions);
  devServer = new WebpackDevServer(devServerOptions, compiler);
  devServer.startCallback(() => {
    blablo.cleanLog(
      logHeader,
      `Successfully started server on ${`http://localhost:${config.devServer.port}`.cyan.bold}`,
    );
  });
} else {
  const compiler = webpack(config);
  const compilerPromise = new Promise((resolve, reject) => {
    const errors: any[] = [];
    const operationCbFn = (err: any, stats: any) => {
      blablo.finish();
      if (err) {
        blablo.error(err);
        errors.push(err);
      }

      const info = stats?.toJson();
      if (stats?.hasErrors()) {
        blablo.error(info?.errors);
        errors.push(info?.errors);
      }
      !!stats?.hasWarnings() && blablo.warn(info?.warnings);

      blablo.cleanLog(
        stats.toString({
          chunks: false,
          children: false,
          colors: true, // Shows colors in the console
        }),
      );

      if (operationMode == "watch") {
        blablo.useSpinner("toggle7").log(logHeader, " watching");
        return;
      }

      compiler.close((closeErr) => {
        if (closeErr) {
          blablo.error(closeErr);
          errors.push(closeErr);
        }
        if (errors.length) {
          return reject(errors);
        }
        resolve(stats);
      });
    };

    if (operationMode === "build") {
      compiler.run(operationCbFn);
    } else if (operationMode === "watch") {
      watching = compiler.watch(config.watchOptions, operationCbFn);
    }
  });

  try {
    await compilerPromise;
  } catch (e) {
    if (operationMode === "watch" && watching) {
      // @ts-ignore
      watching.close((err: any) => {
        if (err) {
          blablo.error(err);
        }
      });
    }
  }
  blablo.cleanLog(logHeader, `Done ${emoSparkles}`);
}

process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});
