import { exec } from "child_process";
import { promisify } from "util";
import * as emoji from "node-emoji";

import colors from "colors";
import { blablo } from "blablo";

colors.enable();
const execAsync = promisify(exec);
const emoSparkles = emoji.get(emoji.find("✨")?.key ?? "");

/**
 * When launch:prod:server with WebPack I'm using dummy entry to avoid error
 * Let's delete this file
 */
export class PruneDummyEntryInDist {
  outputPath = "";
  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }
  apply(compiler: any) {
    compiler.hooks.done.tap("PruneDummyEntryInDist", async (compilation: any) => {
      blablo
        .log("[plugin:PruneDummyEntryInDist]".cyan, `looking "dummy.bundle.mjs" to prune ❱ Done ${emoSparkles}`)
        .finish();
      try {
        await execAsync(`find ${this.outputPath} -type f -name 'dummy.bundle.mjs' -delete\n`);
      } catch (err) {}
    });
  }
}
