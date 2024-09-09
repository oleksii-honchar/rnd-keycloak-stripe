import pino from "pino";
import webpack from "webpack";

import { generateIndexHtml } from "../libs/generateIndexHtml.ts";

const { Compilation } = webpack;

const logger = pino.default({ name: "plugin:GenerateIndexHTML" });

export default class GenerateIndexHTML
  implements webpack.WebpackPluginInstance
{
  env = [];

  constructor(env: any = {}) {
    this.env = env;
  }

  apply(compiler: any) {
    compiler.hooks.thisCompilation.tap("Replace", (compilation: any) => {
      compilation.hooks.processAssets.tap(
        {
          name: "Replace",
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        () => {
          logger.info("processing asset index.hbs ❱ dist/index.html");
          generateIndexHtml(this.env);
          logger.info("Done ✨");
        },
      );
    });
  }
}
