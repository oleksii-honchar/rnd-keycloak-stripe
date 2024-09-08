import pino from "pino";

const logger = pino.default({ name: "webpack:config:snippet:prod" });
logger.info("loading 'Production'");

export const prodConfig = {};
