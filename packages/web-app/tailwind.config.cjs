/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const pino = require("pino");

const m3DesignTokensV1 = require("./src/stylesheets/md3-design-tokens-v2.ts");

const logger = pino({ name: "tailwind-css:config" });
logger.info("loading config");

module.exports = {
  corePlugins: {
    animation: true,
    translate: true,
  },
  content: {
    files: ["./src/**/*.{html,js,ts,tsx,hbs}"],
  },
  theme: {
    extend: {
      colors: m3DesignTokensV1.colors,
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
  prefix: "",
};
