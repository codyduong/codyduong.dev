#!/bin/bash

# react-scripts has a dumb module declaration that we override with craco
# Simply delete the lines
reactLib="./node_modules/react-scripts/lib/react-app.d.ts"
if [[ $( cat $reactLib | grep "svg" ) ]]; then
  echo "Removing *.svg module declaration from $reactLib"
  sed '47,57d' $reactLib >  $reactLib".temp"
  mv $reactLib".temp" $reactLib
else
  echo "*.svg module not found in $reactLib"
fi

# only generate if we are not in CI
# if [[ -z "${CI}" && -z "${GCP_PROJECT}" ]]; then
#   yarn graphql-codegen
# fi