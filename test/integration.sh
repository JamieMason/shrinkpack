#!/usr/bin/env bash

function header {
  echo "-----------------------------------------------------------------------"
  echo "$1"
  echo "-----------------------------------------------------------------------"
}

PROJECT_DIR="$PWD"
TEST_DIR="$TMPDIR/shrinkpack-integration-test"

# reset
rm -rf $TEST_DIR
npm cache clear --force

# create new project
mkdir $TEST_DIR
cd $TEST_DIR
git init
npm init --yes

# add common ignores
echo "*.log.*" >> .gitignore
echo "*.log" >> .gitignore
echo "node_modules" >> .gitignore

# set sensible npm defaults
echo "save-exact=true" >> .npmrc
echo "save=true" >> .npmrc

# create an npm cache for this project only
echo "cache=$TMPDIR/node_cache" >> .npmrc

header "install some stuff"
npm install --save-dev @telerik/eslint-config @types/core-js

header "shrinkpack the project"
node "$PROJECT_DIR/dist/bin.js" .

header "look at cache contents"
npm cache ls

header "do a clean install from offline"
npm cache clear --force
rm -rf node_modules
npm ci --offline

header "look again at cache contents"
npm cache ls

header "install more stuff"
npm install --save expect-more

header "look again at cache contents"
npm cache ls

header "shrinkpack the project again"
node "$PROJECT_DIR/dist/bin.js" .

header "do a clean install from offline"
npm cache clear --force
rm -rf node_modules
npm ci --offline

header "uninstall something"
npm uninstall @telerik/eslint-config

header "look again at cache contents"
npm cache ls

header "shrinkpack the project again"
node "$PROJECT_DIR/dist/bin.js" .

header "do a clean install from offline"
npm cache clear --force
rm -rf node_modules
npm ci --offline

header "install it back"
npm install @telerik/eslint-config

header "shrinkpack the project again"
node "$PROJECT_DIR/dist/bin.js" .

header "do a clean install from offline"
npm cache clear --force
rm -rf node_modules
npm ci --offline

header "uninstall the other 2 packages"
npm uninstall @types/core-js expect-more

header "shrinkpack the project again"
node "$PROJECT_DIR/dist/bin.js" .

header "do a clean install from offline"
npm cache clear --force
rm -rf node_modules
npm ci --offline
