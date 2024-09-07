#!/usr/bin/env bash
envFile="$PWD/.configs/envs/production.loc.env"
env-cmd -f $envFile "$PWD/devops/local/scripts/check-env-vars.sh"

source $envFile

env-cmd -f $envFile \
    node ./node_modules/postcss-cli/bin/postcss ./src/stylesheets/index.pcss \
      -c ./.configs/postcss.config.js \
      --verbose