import { createRequire } from "module";
import path from "path";
import pino from "pino";

import type { StringIndex } from "../../src/typings/index.d.ts";

import { getRootRepoDir } from "../../scripts/esm-utils.ts";
import tailwindConfig from "../../tailwind.config.ts";

const require = createRequire(import.meta.url);
const logger = pino.default({ name: "post-css:config" });
logger.info("loading config");

export default function postCssConfig(params: {
  file: any;
  options: StringIndex;
  env: any;
}) {
  const rootRepoDir = getRootRepoDir();
  const basePath = path.join(rootRepoDir, "src/assets");

  logger.info("rootRepoDir: " + rootRepoDir);
  logger.info("basePath: " + basePath);
  logger.info("params.file: " + params.file);
  const tailwind = require("tailwindcss")(tailwindConfig);

  const mdlPostCssUrl = require("postcss-url");
  const postCssUrl = mdlPostCssUrl({
    url: "inline",
    maxSize: 10,
    // both basePath and assetsPath are needed for postcss-url 'inline' to work
    basePath: path.join(rootRepoDir, "src"),
    assetsPath: path.join(rootRepoDir, "src"),
  });
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
      postCssImport,
      postCssUrl,
      "tailwindcss/nesting",
      tailwind,
      postCssPresetEnv,
      cssNanoCfg,
      // params.env === "production" ? purgeCssConfig : false, - still misses TailwindCSS
    ],
  };
}
