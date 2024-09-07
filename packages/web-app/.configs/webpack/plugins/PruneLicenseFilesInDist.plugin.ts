import { exec } from "child_process";
import { promisify } from "util";
import * as emoji from "node-emoji";

import colors from "colors";
import { blablo } from "blablo";

colors.enable();
const execAsync = promisify(exec);
const emoSparkles = emoji.get(emoji.find("✨")?.key ?? "");

/**
 * Some of the open-source lib creating additional license files on build. Let's prune them
 */
export class PruneLicenseFilesInDist {
  outputPath = "";
  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }
  apply(compiler: any) {
    compiler.hooks.done.tap("PruneLicenseFilesInDist", async (compilation: any) => {
      blablo
        .log("[plugin:PruneLicenseFilesInDist]".cyan, `looking *.LICENCE.txt to prune ❱ Done ${emoSparkles}`)
        .finish();
      try {
        await execAsync(`find ${this.outputPath} -type f -name '*LICENSE*' -delete\n`);
        // await execAsync(`ls -al ${this.outputPath}`);
      } catch (err) {}
    });
  }
}
