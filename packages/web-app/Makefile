SHELL=/bin/bash
RED=\033[0;31m
GREEN=\033[0;32m
BG_GREY=\033[48;5;237m
YELLOW=\033[38;5;202m
BOLD_ON=\033[1m
BOLD_OFF=\033[21m
NC=\033[0m # No Color

ifneq (,$(wildcard ./.env))
	include ./.env
endif

IMAGE_VERSION := $(shell jq -r '.version' package.json)

.PHONY: help

help:
	@echo Automation commands:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

check-node-env:
	ifndef NODE_ENV
		@printf "${YELLOW}NODE_ENV not provided. Using ${BOLD_ON}'NODE_ENV=development'${BOLD_OFF} as default${NC}\n"
		export NODE_ENV = development
	endif

clean-dist:  ## Cleaning ./dist folder
	@printf "${RED}Cleaning ./dist folder:${NC}"
	@rm -rf ./dist
	@printf "${RED}DONE${NC}\n"
.PHONY: clean-dist

build: clean-dist ## Build production version
	@printf "${BG_GREY}[build] Start${NC}\n"
	@npx node --no-warnings --experimental-strip-types ./config/webpack-wrapper.ts\
		--config ./config/webpack.config.ts \
		--mode production \
		--env BUILD_ANALYZE=$(BUILD_ANALYZE) \
		--env NODE_ENV=production \
		| pino-pretty -c
	@printf "${BG_GREY}[build] Done${NC}\n"

build-analyze: ## Build prod and analyze bundle content
	$(MAKE) build BUILD_ANALYZE=true

build-dev: clean-dist ## Build local version
	@printf "${BG_GREY}[build-dev] Start${NC}\n"
	@npx node --no-warnings --experimental-strip-types ./config/webpack-wrapper.ts\
		--config ./config/webpack.config.ts \
		--mode development \
		--env BUILD_ANALYZE=$(BUILD_ANALYZE) \
		--env NODE_ENV=development \
		| pino-pretty -c
	@printf "${BG_GREY}[build-dev] DONE${NC}\n"

build-dev-analyze: ## Build local and analyze bundle content
	$(MAKE) build-dev BUILD_ANALYZE=true

dev: clean-dist ## Launches local Webpack dev-server
	@printf "${BG_GREY}[dev] Start${NC}\n"
	@npx node --no-warnings --experimental-strip-types ./config/webpack-wrapper.ts\
		--mode development --launch-server \
		--env NODE_ENV=development \
		--stats normal \
		| pino-pretty -c
	@printf "${BG_GREY}[dev] DONE${NC}\n"

prod: ## Launches local Webpack dev-server in production mode
	@printf "${BG_GREY}[prod] Start${NC}\n"
	@npx node --no-warnings --experimental-strip-types ./config/webpack-wrapper.ts\
		--mode production --launch-server \
		--stats normal \
		--env NODE_ENV=production \
		| pino-pretty -c
	@printf "${BG_GREY}[prod] DONE${NC}\n"


watch-dev: ## No dev server - only file watch and rebuild
	@npx node --no-warnings --experimental-specifier-resolution=node \
		--loader ./scripts/ts-esm-loader-with-tsconfig-paths.js ./config/webpack-wrapper.ts \
		--config ./config/webpack.config.ts \
		--mode development \
		--watch --progress

install-tools: ## install ncu for new node version
	npm i -g npm-check-updates
	npm i -g tsconf-checker
	npm i -g markdown-toc
	brew install jq

# make build 
build-docker: ## build image
	@docker build --load --build-arg LATEST_VERSION=$(LATEST_VERSION) --build-arg IMAGE_NAME=$(IMAGE_NAME) -t $(IMAGE_NAME):$(LATEST_VERSION) .

.ONESHELL:
up-docker: ## docker up static image resolver
	@if [ $$(docker ps -a -q -f name=$(CONTAINER_NAME)) ]; then docker stop $(CONTAINER_NAME); fi
	@export $$(grep -v '^#' $(envFileLoc) | xargs)
	docker run -d --rm --name $(CONTAINER_NAME) -p $(SERVE_PORT):80 $(IMAGE_NAME):$(LATEST_VERSION)
	@docker logs --follow $(CONTAINER_NAME)

down-docker: ## docker down static image resolver
	@docker stop $(CONTAINER_NAME)

# make tag-latest
tag-latest: ## tag  image as latest
	@docker tag $(IMAGE_NAME):$(LATEST_VERSION) $(IMAGE_NAME):latest
