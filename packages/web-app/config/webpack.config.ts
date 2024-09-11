import pino from "pino";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";

import { baseConfig } from "./webpack/base.config.ts";
import { devServerConfig } from "./webpack/dev-server.config.ts";
import { externalsConfig } from "./webpack/externals.config.ts";
import { cssModuleConfig } from "./webpack/module-css.config.ts";
import { moduleConfig } from "./webpack/module.config.ts";
import GenerateIndexHTML from "./webpack/plugins/GenerateIndexHTML.plugin.ts";
import { prodConfig } from "./webpack/prod.config.ts";

const logger = pino.default({
  level: "info",
  name: "webpack:config",
});
logger.info("Starting config composition");

// Short usage reference
// `NODE_ENV` = development | test | production
// `LOG_LEVEL` = error | warn | info | debug

export const configFactory = (
  env: any = {},
  argv: { mode: string; launchServer?: boolean },
) => {
  env = {
    BUILD_ANALYZE: null,
    TS_LOADER: "esbuild", // or ts-build
    ...env,
  };

  const nodeEnv = env.NODE_ENV;
  logger.info(`using "${nodeEnv}" mode`);

  const envES2022 = { ...env, TS_TARGET: "es2022" };

  let cfgES2022 = baseConfig(envES2022); //@ts-expect-error merging configs
  cfgES2022 = merge(cfgES2022, moduleConfig(envES2022)); //@ts-expect-error merging configs
  cfgES2022 = merge(cfgES2022, cssModuleConfig(env)); //@ts-expect-error merging configs
  cfgES2022 = merge(cfgES2022, externalsConfig);

  if (argv.launchServer === true) {
    // @ts-expect-error merging configs
    cfgES2022 = merge(cfgES2022, devServerConfig(envES2022));
  }

  if (env.LAUNCH_PROD_SERVER) {
    cfgES2022 = merge(cfgES2022, {
      // @ts-expect-error merging configs
      entry: {
        dummy: "./config/webpack/dummy-entry.ts",
      },
    });
  } else {
    cfgES2022 = merge(cfgES2022, {
      // @ts-expect-error merging configs
      entry: {
        app: "./src/index.es2022.tsx",
      },
      plugins: [new GenerateIndexHTML(env)],
    });
  }

  if (env.BUILD_ANALYZE === "true") {
    logger.info(`bundle analyzer included`);
    // @ts-expect-error merging configs
    cfgES2022 = merge(cfgES2022, {
      plugins: [new BundleAnalyzerPlugin(env)],
    });
  }

  if (env.NODE_ENV !== "production" || argv.launchServer === true) {
    logger.info(`config composition completed`);
    return cfgES2022;
  }

  // for prod will add es2016 cfg
  const envES2016 = { ...env, TS_TARGET: "es2016" };
  let cfgES2016 = baseConfig(envES2016); // @ts-expect-error merging configs
  cfgES2016 = merge(cfgES2016, moduleConfig(envES2016)); // @ts-expect-error merging configs
  cfgES2016 = merge(cfgES2016, externalsConfig);
  cfgES2016 = merge(cfgES2016, {
    // @ts-expect-error merging configs
    entry: {
      app: "./src/index.es2016.tsx",
    },
  });

  let configs = [cfgES2022, cfgES2016];

  // @ts-expect-error merging configs
  configs = configs.map((cfg) => merge(cfg, prodConfig));

  logger.info(`config composition completed`);
  return configs;
};
