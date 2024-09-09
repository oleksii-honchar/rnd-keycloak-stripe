import { exec } from "child_process";
import pino from "pino";
import { promisify } from "util";
import webpack from "webpack";

const execAsync = promisify(exec);
const logger = pino.default({ name: "plugin:PruneLicenseFilesInDist" });

/**
 * Some of the open-source lib creating additional license files on build. Let's prune them
 */
export class PruneLicenseFilesInDist implements webpack.WebpackPluginInstance {
  outputPath = "";

  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }

  apply(compiler: any) {
    compiler.hooks.done.tap("PruneLicenseFilesInDist", async () => {
      logger.info("looking *.LICENCE.txt to prune");
      try {
        await execAsync(
          `find ${this.outputPath} -type f -name '*LICENSE*' -delete\n`,
        );
        // await execAsync(`ls -al ${this.outputPath}`);
      } catch (err) {
        logger.error(err);
      }
      logger.info("Done ✨");
    });
  }
}
