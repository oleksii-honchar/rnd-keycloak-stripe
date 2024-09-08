#!/usr/bin/env bash
envFile="$PWD/config/envs/production.loc.env"
env-cmd -f $envFile "$PWD/devops/local/scripts/check-env-vars.sh"

source $envFile

env-cmd -f $envFile \
    node ./node_modules/postcss-cli/bin/postcss ./src/stylesheets/index.pcss \
      -c ./config/postcss.config.js \
      --verbose