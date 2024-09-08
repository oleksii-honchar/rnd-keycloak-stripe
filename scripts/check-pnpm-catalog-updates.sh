#!/usr/bin/env bash
RED='\033[0;31m'
GREEN='\033[0;32m'
BG_GREY='\033[48;5;237m'
YELLOW='\033[38;5;202m'
BOLD_ON='\033[1m'
BOLD_OFF='\033[21m'
NC='\033[0m' # No Color

set -euo pipefail

WORKSPACE_FILE="./pnpm-workspace.yaml"
UPDATE_FLAG=false

# Check if -u flag is provided
while getopts "u" opt; do
  case $opt in
    u)
      UPDATE_FLAG=true
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Function to check for updates
check_updates() {
    local package="$1"
    local current_version="$2"
    local catalog="${3:-}"  # Use empty string as default if $3 is not set
    local catalogName="${catalog:-default}"
    if [[ -z "$package" || -z "$current_version" ]]; then
        return
    fi
    
    local latest_version=$(npm show "$package" version)
    if [ $? -ne 0 ]; then
        echo "Error: Unable to fetch version for $package" >&2
        return
    fi
    printf "$catalogName : $package@$current_version"
    if [ "$current_version" != "$latest_version" ]; then
        printf " -> ${GREEN}$latest_version${NC}\n"
        if $UPDATE_FLAG; then
            if [ -z "$catalog" ]; then
                yq_command="yq -y '.catalog.\"$package\" = \"^$latest_version\"' \"$WORKSPACE_FILE\" -i"
            else
                yq_command="yq -y '.catalogs.\"$catalog\".\"$package\" = \"^$latest_version\"' \"$WORKSPACE_FILE\" -i"
            fi
            # echo "Executing: $yq_command"
            eval "$yq_command"
        fi
    else
        printf "\n"
    fi
}

# Process catalog section
if $UPDATE_FLAG; then
    echo "Updating default catalog:"
else
    echo "Checking default catalog:"
fi

yq '.catalog | to_entries | .[] | "\(.key):\(.value)"' "$WORKSPACE_FILE" | while IFS=: read -r package version; do
    # Skip empty lines and comments
    [[ -z "$package" || "$package" =~ ^[[:space:]]*# ]] && continue
    package=$(echo "$package" | tr -d " '\"")
    version=$(echo "$version" | tr -d " '\"")
    check_updates "$package" "${version#^}"
done

echo ""
if $UPDATE_FLAG; then
    echo "Updating catalogs:"
else
    echo "Checking catalogs:"
fi
yq -r '.catalogs | to_entries[] | .key as $catalog | .value | to_entries[] | "\($catalog):\(.key):\(.value)"' "$WORKSPACE_FILE" | while IFS=: read -r catalog package version; do
    # Skip empty lines and comments
    [[ -z "$catalog" || "$catalog" =~ ^[[:space:]]*# ]] && continue
    catalog=$(echo "$catalog" | tr -d " '")
    package=$(echo "$package" | tr -d " '")
    version=$(echo "$version" | tr -d " '")
    check_updates "$package" "${version#^}" "$catalog"
done

if $UPDATE_FLAG; then
    echo -e "\nUpdates applied to $WORKSPACE_FILE"
else
    echo -e "\nRun with -u flag to apply updates"
fi
