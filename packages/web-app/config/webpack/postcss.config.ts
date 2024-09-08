import { createRequire } from "module";
import path from "path";
import pino from "pino";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";
import type { StringIndex } from "../../src/typings/index.d.ts";

const require = createRequire(import.meta.url);
const logger = pino.default({ name: "post-css:config" });
logger.info("loading config");

export default function postCssConfig(params: { file: any; options: StringIndex; env: any }) {
  const tailwindConfigPath = path.join(getRootRepoDir(), "tailwind.config.cjs");
  const tailwind = require("tailwindcss")(require(tailwindConfigPath));

  const mdlPostCssImport = require("postcss-import");
  const postCssImport = mdlPostCssImport({ root: path.dirname(params?.file) });

  const mdl = require("postcss-preset-env");
  const postCssPresetEnv = mdl({
    stage: 3,
    features: {
      "nesting-rules": true,
    },
  });

  let cssNanoCfg: any = null;
  if (params.env === "production") {
    const mdlCssNano = require("cssnano");
    cssNanoCfg = mdlCssNano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    });
  } else {
    cssNanoCfg = require("postcss-discard-comments");
  }

  return {
    plugins: [
      tailwind,
      postCssImport,
      postCssPresetEnv,
      cssNanoCfg,
      // params.env === "production" ? purgeCssConfig : false, - still misses TailwindCSS
    ],
  };
}
