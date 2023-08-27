#!/bin/bash

printf "Overwriting node_modules\n\n"
modules=$(find ./node_modules_override -maxdepth 1 -mindepth 1 -type d)
for module in $modules; do
  if [ -d $module ]; then
    echo "Found $module, overriding..."
    rsync -av $module ./node_modules
  else
    echo "Could not find module $module, skipping..."
  fi
done

# only generate if we are not in CI
# if [[ -z "${CI}" && -z "${GCP_PROJECT}" ]]; then
#   yarn graphql-codegen
# fi