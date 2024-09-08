/** @type {import('tailwindcss').Config} */
import pino from 'pino';
// @ts-expect-error this is recommended way but TS complains
import defaultTheme from 'tailwindcss/defaultTheme';
import m3DesignTokensColors from './src/stylesheets/md3-design-tokens-v2.json' with { type: 'json' };

const logger = pino.default({ name: "tailwind-css:config" });
logger.info("loading config");

export default {
  corePlugins: {
    animation: true,
    translate: true,
  },
  content: {
    files: ["./src/**/*.{html,js,ts,tsx,hbs}"],
  },
  theme: {
    extend: {
      colors: m3DesignTokensColors,
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
  prefix: "",
};
