import { exec } from "child_process";
import pino from "pino";
import { promisify } from "util";
import { WebpackPluginInstance } from "webpack";

const execAsync = promisify(exec);
const logger = pino.default({ name: "plugin:PruneDummyEntryInDist" });

/**
 * When launch:prod:server with WebPack I'm using dummy entry to avoid error
 * Let's delete this file
 */
export class PruneDummyEntryInDist implements WebpackPluginInstance {
  outputPath = "";

  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }

  apply(compiler: any) {
    compiler.hooks.done.tap("PruneDummyEntryInDist", async (compilation: any) => {
      logger.info("looking 'dummy.bundle.mjs' to prune");
      try {
        await execAsync(`find ${this.outputPath} -type f -name 'dummy.bundle.mjs' -delete\n`);
      } catch (err) { }
      logger.info("Done ✨");
    });
  }
}
