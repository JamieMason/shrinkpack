#!/usr/bin/env bash

function header() {
  echo ""
  echo "======================================================================="
  echo "$1"
  echo "======================================================================="
  echo ""
}

npm config set loglevel error --global
npm config set registry http://npm_registry:4873

header "install npm@$NPM_VERSION"
npm install -g npm@$NPM_VERSION
INSTALLED_NPM_VERSION="$(npm --version)"

if [ "$NPM_VERSION" != "$INSTALLED_NPM_VERSION" ]; then
  header "failed: installed npm version is $INSTALLED_NPM_VERSION and not $NPM_VERSION"
  exit 1
else
  header "√ installed npm $INSTALLED_NPM_VERSION"
fi

header "install shrinkpack"
cd /usr/src/shrinkpack/
npm install --production

header "control project: install"
cd /usr/src/control-app
npm install
CONTROL_INSTALLATION="$(find ./node_modules | sort)"

header "shrinkpacked project: install"
cd /usr/src/shrinkpacked-app
npm install

header "shrinkpacked project: shrinkwrap"
npm shrinkwrap --dev

header "shrinkpacked project: shrinkpack"
node /usr/src/shrinkpack/cli.js
ON_SHRINKPACK_RUN="$(find ./node_modules | sort)"

if [ "$ON_SHRINKPACK_RUN" != "$CONTROL_INSTALLATION" ]; then
  header "failed: running shrinkpack changes installation"
  exit 1
else
  header "√ running shrinkpack does not affect installation"
fi

header "shrinkpacked project: npm-shrinkwrap.json"
cat npm-shrinkwrap.json

header "shrinkpacked project: re-install"
rm -rf ./node_modules
npm install
ON_SHRINKPACK_INSTALL="$(find ./node_modules | sort)"

if [ "$ON_SHRINKPACK_INSTALL" != "$CONTROL_INSTALLATION" ]; then
  header "failed: reinstalling from shrinkpack produces different output"
  exit 1
else
  header "√ reinstalling from shrinkpack produces expected output"
fi

header "delete app"
rm -rf /usr/src/shrinkpacked-app

header "npm install another project that does not use shrinkwrap or shrinkpack"
cd /usr/src/non-shrinkpacked-app
npm install
ON_OTHER_INSTALL="$(find ./node_modules | sort)"

if [ "$ON_OTHER_INSTALL" != "$CONTROL_INSTALLATION" ]; then
  header "failed: installing a non-shrinkpacked project produces different output"
  exit 1
else
  header "√ installing a non-shrinkpacked project produces expected output"
fi
