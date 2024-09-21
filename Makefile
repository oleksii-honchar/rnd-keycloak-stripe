ifneq (,$(wildcard ./.env))
	include ./.env
endif

export SMTP_USER=$(shell security find-generic-password -s "SMTP_USER" -w)
export SMTP_PASSWORD=$(shell security find-generic-password -s "SMTP_PASSWORD" -w)
export SMTP_HOST=$(shell security find-generic-password -s "SMTP_HOST" -w)


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

check-realm: ## Check if rnd realm added to the container
	@pnpm dotenvx -- node --no-warnings --experimental-strip-types scripts/check-realm.ts | npx pino-pretty

platform-up: check-node-env ## Start the platform using docker-compose
	@docker-compose up -d
	@make check-realm

platform-down: check-node-env ## Stop the platform using docker-compose
	@docker-compose down

platform-restart: check-node-env ## Stop the platform using docker-compose
	@docker-compose down
	@docker-compose up -d
	@make check-realm

platform-logs: check-node-env ## Show the logs of the platform using docker-compose
	@docker-compose logs -f
