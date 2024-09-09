import pino from "pino";

const logger = pino.default({ name: "webpack:config:snippet:externals" });
logger.info("loading 'Externals'");

export const externalsConfig: object = {
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    moment: "moment",
  },
};
