# React app template (TS + Webpack)

- [Build & Configuration](#build--configuration)
- [Web App Modules](#web-app-modules)
- [Git hooks](#git-hooks)
- [How to use](#how-to-use)
- [TODO](#todo)

This bootstrap template contains multiple tools configuration in "ready to use", i.e copy & paste state.

When I make my way back to development from management and consulting, I usually start from the basics. I have compiled the most valuable and not overly complex cases to set up most of the features.

It's not a minimal setup, but it provides sufficient setup for web-app development, including the most recent updates in frontend technology.

My favorite stack includes the following: TypeScript, React, TailWindCSS, PostCSS, WebPack, ESLint+Prettier.

## Build & Configuration

- `project.env` file and environments configs
- Latest TypeScript & separate configs for node, es2016 and es2022
- ESM modules both for node and react configured using custom loader
- ESLint + Prettier(as plugin) for React and Node
- Husky + Cimmitizen github hooks
- Custom WebPack TS wrapper
- Extended WebPack config including:
  - `post-css` + TailWindCSS
  - `purge-css`, prune licenses and fund requests
  - Custom index.html based on HandleBars
  - `es-build` TS loader
- Code Splitting and route async loading(lazy loading)
- Nginx based simple docker for static serve
- [TBD] Terraform based deploy to AWS

## Web App Modules

- React + React-Router
- TailWindCSS with MaterialDesign v3 Palette Tokens
- [TBD] MD3 colors in TailWindCSS color palette notation
- [TBD] XState example
- [TBD] unit testing
- [TBD] e2e testing

## Git hooks

Husky hooks in package.json doesn't work. You need to create separate hooks with the command below.

`./.configs/commitlint.config.cjs`

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

```bash
npm install husky --save-dev
npm install @commitlint/cli --save-dev
npm install @commitlint/config-conventional --save-dev
npx husky install # will add .husky folder w/o hooks! Also will change global git config hooksPath -> .husky
npx husky add .husky/pre-commit "npm run check:all"
npx husky add .husky/commit-msg "npx commitlint --edit $1 --config=./.configs/commitlint.config.cjs"git add .husky/commit-msg
git add .husky/commit-msg .husky/pre-commit
```

## How to use

- `make install-tools` - Install optional tools: `jq`, `ncu`, `markdown-toc`
- `npm run launch:loc` - Run development server with types watch
- `npm run build` - Build `prod` files
- `npm run build:loc` - Build `development`/`local` files
- `make build-docker` - Build [`tuiteraz/jaba-static`](https://github.com/oleksii-honchar/jaba) based docker to serve `/dist` files
- `make up-docker` - Start `jaba` container on the `SERVE_PORT` for `statics` testing
- `make down-docker` - Start `jaba` container

Also one can check `Makefile` for more details on automation commands.

## TODO

- resolve typecheck errors
- switch to `shebang` routes
