import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { getRootRepoDir } from "scripts/esm-utils.ts";
import { blablo } from "blablo";

const logHeader = "[webpack:config:snippet]".cyan;
blablo.log(logHeader, "loading", "'Module-CSS'".white.bold).finish();

export const cssModuleConfig = (env: any) => {
  const isProd = env.NODE_ENV === "production";

  const postCssConfigPath = path.join(getRootRepoDir(), "./.configs/webpack/postcss.config.ts");

  const plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ];

  const customLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "/assets/stylesheets/",
    },
  };

  return {
    plugins: [...(env.LAUNCH_PROD_SERVER ? [] : plugins)],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /src\/assets/,
          use: [
            customLoader,
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.pcss$/i,
          exclude: /src\/assets/,
          use: [
            customLoader,
            {
              loader: "css-loader",
              options: {
                modules: false, // true cause to obfuscation
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ctx: {
                    env: env.NODE_ENV,
                  },
                  config: postCssConfigPath,
                },
              },
            },
          ],
        },
      ],
    },
  };
};
