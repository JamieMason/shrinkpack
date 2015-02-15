# shrinkpack

A simple way to check in your npm dependencies, remove the npm registry as a SPOF, and speed up builds.

## Status

This is a new project which in it's current form is a working proof of concept.

## Installation

```
npm install -g shrinkpack
```

## Usage Example

> After running this example, all future calls to `npm install` in this project will use the .tgz files from within node_shrinkwrap, instead of going across the network to the npm registry.

You have a project called `my-project` with the following `package.json`.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "license": "ISC",
  "dependencies": {
    "chalk": "0.5.1",
    "lodash": "3.2.0"
  }
}
```

Running `shrinkpack` from the `my-project` directory will result in the following output;

```
clean /Users/fold_left/Development/my-project
npm install into /Users/fold_left/Development/my-project/node_modules
npm shrinkwrap into /Users/fold_left/Development/my-project/npm-shrinkwrap.json
analysing dependency graph
saving dependencies to /Users/fold_left/Development/my-project/node_shrinkwrap
save /Users/fold_left/Development/my-project/node_shrinkwrap/chalk-0.5.1.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/ansi-styles-1.1.0.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/escape-string-regexp-1.0.2.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/has-ansi-0.1.0.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/ansi-regex-0.2.1.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/strip-ansi-0.3.0.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/ansi-regex-0.2.1.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/supports-color-0.2.0.tgz
save /Users/fold_left/Development/my-project/node_shrinkwrap/lodash-3.2.0.tgz
update /Users/fold_left/Development/my-project/npm-shrinkwrap.json
done
```

...the following directory structure;

```
├── node_modules
│   ├── chalk
│   │   ├── index.js
│   │   ├── node_modules
│   │   │   ├── (lots of files and folders)
├── node_shrinkwrap
│   ├── ansi-regex-0.2.1.tgz
│   ├── ansi-styles-1.1.0.tgz
│   ├── chalk-0.5.1.tgz
│   ├── escape-string-regexp-1.0.2.tgz
│   ├── has-ansi-0.1.0.tgz
│   ├── lodash-3.2.0.tgz
│   ├── strip-ansi-0.3.0.tgz
│   └── supports-color-0.2.0.tgz
├── npm-shrinkwrap.json
└── package.json
```

...and the following `npm-shrinkwrap.json`;

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "chalk": {
      "version": "0.5.1",
      "from": "chalk@>=0.5.1 <0.6.0",
      "resolved": "node_shrinkwrap/chalk-0.5.1.tgz",
      "dependencies": {
        "ansi-styles": {
          "version": "1.1.0",
          "from": "ansi-styles@>=1.1.0 <2.0.0",
          "resolved": "node_shrinkwrap/ansi-styles-1.1.0.tgz"
        },
        "escape-string-regexp": {
          "version": "1.0.2",
          "from": "escape-string-regexp@>=1.0.0 <2.0.0",
          "resolved": "node_shrinkwrap/escape-string-regexp-1.0.2.tgz"
        },
        "has-ansi": {
          "version": "0.1.0",
          "from": "has-ansi@>=0.1.0 <0.2.0",
          "resolved": "node_shrinkwrap/has-ansi-0.1.0.tgz",
          "dependencies": {
            "ansi-regex": {
              "version": "0.2.1",
              "from": "ansi-regex@>=0.2.0 <0.3.0",
              "resolved": "node_shrinkwrap/ansi-regex-0.2.1.tgz"
            }
          }
        },
        "strip-ansi": {
          "version": "0.3.0",
          "from": "strip-ansi@>=0.3.0 <0.4.0",
          "resolved": "node_shrinkwrap/strip-ansi-0.3.0.tgz",
          "dependencies": {
            "ansi-regex": {
              "version": "0.2.1",
              "from": "ansi-regex@>=0.2.0 <0.3.0",
              "resolved": "node_shrinkwrap/ansi-regex-0.2.1.tgz"
            }
          }
        },
        "supports-color": {
          "version": "0.2.0",
          "from": "supports-color@>=0.2.0 <0.3.0",
          "resolved": "node_shrinkwrap/supports-color-0.2.0.tgz"
        }
      }
    },
    "lodash": {
      "version": "3.2.0",
      "from": "lodash@>=3.2.0 <4.0.0",
      "resolved": "node_shrinkwrap/lodash-3.2.0.tgz"
    }
  }
}
```
