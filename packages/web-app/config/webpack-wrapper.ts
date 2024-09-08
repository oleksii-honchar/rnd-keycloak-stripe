/**
 * This wrapper allows to use ESM ts webpack configs in order to have ESM style modules in whole repo
 */
import minimist from 'minimist';
import process from 'node:process';
import path from 'path';
import pino from 'pino';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { getRootRepoDir, setCurrMetaUrl } from '../scripts/esm-utils.ts';
import { pick } from '../scripts/ts-utils.ts';
import type { StringIndex } from '../src/typings/index.d.ts';

setCurrMetaUrl(import.meta.url);

const logger = pino.default({ name: 'webpack:wrapper' });

const parsedArgs = minimist(process.argv.slice(2));
const argv = {
  mode: 'development',
  config: './config/webpack.config.ts',
  watch: false,
  open: false,
  stats: 'minimal',
  launchServer: !!parsedArgs['launch-server'],
  env: [],
  ...parsedArgs,
};

// additional env vars can be passed through Webpack '--env VAR=VALUE' param
// for every VAR needs to be used new --env param, e.g. '--env VAR1=V1 --env VAR2=V2'
argv.env = Array.isArray(argv.env) ? argv.env : [argv.env]; // when single param provided it is string, not array
const customEnv = argv.env.reduce((acc: StringIndex, curr: string) => {
  const [key, value] = curr.split('=');
  if (key) {
    acc[key] = value;
  }
  return acc;
}, {});

const env: StringIndex = {
  LAUNCH_PROD_SERVER: process.env.NODE_ENV === 'production' && !!argv.launchServer,
  ...customEnv,
  ...pick(process.env, ['BUILD_ANALYZE', 'TS_LOADER']),
};

// Let's check if proper ts-TS_LOADER used
if (env.TS_LOADER) {
  const validTSLoaders = ['esbuild', 'ts-loader'];
  const valueIndex = validTSLoaders.indexOf(env.TS_LOADER);
  if (valueIndex === -1) {
    logger.error(`You have to use following options for TS_LOADER: ${validTSLoaders.join(', ')}`);
    process.exit(1);
  }
}

// Param '--watch' used to enable 'build + watch' mode
// Param '--launch-server' used to enable 'build(dev) + static serv' mode
// Param '--open' used to open browser after build. This param works only with --launch-dev-server
let watching = null;
let devServer = null;
const operationMode = argv.launchServer ? 'server' : argv.watch ? 'watch' : 'build';
const cfgPath = path.join(getRootRepoDir(), argv.config);
const { configFactory } = await import(cfgPath);
const config = configFactory(env, argv as any);

logger.debug('config', { config });
logger.info(`starting "${operationMode}" mode`);

if (operationMode === 'server') {
  // expecting config here to be object, not [{},{}]
  const compiler = webpack({ ...config, stats: argv.stats });

  const devServerOptions = { ...config.devServer, open: argv.open };
  // logger.info(logHeader, 'devServerOptions', devServerOptions);
  devServer = new WebpackDevServer(devServerOptions, compiler);
  devServer.startCallback(() => {
    logger.info(
      `Successfully started server on ${`http://localhost:${config.devServer.port}`}`,
    );
  });
} else {
  const compiler = webpack(config);
  const compilerPromise = new Promise((resolve, reject) => {
    const errors: any[] = [];
    const operationCbFn = (err: any, stats: any) => {
      if (err) {
        logger.error(err);
        errors.push(err);
      }

      const info = stats?.toJson();
      if (stats?.hasErrors()) {
        logger.error(info?.errors);
        errors.push(info?.errors);
      }
      !!stats?.hasWarnings() && logger.warn(info?.warnings);

      logger.info(
        stats.toString({
          chunks: false,
          children: false,
          colors: true, // Shows colors in the console
        }),
      );

      if (operationMode == 'watch') {
        logger.info('watching');
        return;
      }

      compiler.close((closeErr) => {
        if (closeErr) {
          logger.error(closeErr);
          errors.push(closeErr);
        }
        if (errors.length) {
          return reject(errors);
        }
        resolve(stats);
      });
    };

    if (operationMode === 'build') {
      compiler.run(operationCbFn);
    } else if (operationMode === 'watch') {
      watching = compiler.watch(config.watchOptions, operationCbFn);
    }
  });

  try {
    await compilerPromise;
  } catch (e) {
    if (operationMode === 'watch' && watching) {
      // @ts-ignore
      watching.close((err: any) => {
        if (err) {
          logger.error(err);
        }
      });
    }
  }
  logger.info(`Done ✨`);
}

process.on('uncaughtException', (err) => {
  logger.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection', { reason });
  // Application specific logging, throwing an error, or other logic here
});
