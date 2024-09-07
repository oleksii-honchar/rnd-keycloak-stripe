ifneq (,$(wildcard ./.env))
	include ./.env
endif

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