<a name="0.18.1"></a>

## [0.18.1](https://github.com/jamiemason/shrinkpack/compare/0.17.1...v0.18.1) (2016-12-21)

### Bug Fixes

* **shell:** migrate from deprecated execa.spawn ([2dc7919](https://github.com/jamiemason/shrinkpack/commit/2dc7919))

### Features

* **shrinkpack:** remove nested optional dependencies in npm >= 3.10.8 ([3e8969a](https://github.com/jamiemason/shrinkpack/commit/3e8969a)), closes [#75](https://github.com/jamiemason/shrinkpack/issues/75)

<a name="0.17.1"></a>

## [0.17.1](https://github.com/jamiemason/shrinkpack/compare/0.17.0...0.17.1) (2016-10-17)

### Bug Fixes

* **npm:** modify semver range for npm engine ([261203f](https://github.com/jamiemason/shrinkpack/commit/261203f))

<a name="0.17.0"></a>

# [0.17.0](https://github.com/jamiemason/shrinkpack/compare/0.16.3...0.17.0) (2016-08-25)

### Features

* **api:** expose cli runner through node.js api ([d7ccf2a](https://github.com/jamiemason/shrinkpack/commit/d7ccf2a)), closes [#67](https://github.com/jamiemason/shrinkpack/issues/67)

<a name="0.16.3"></a>

## [0.16.3](https://github.com/jamiemason/shrinkpack/compare/0.16.2...0.16.3) (2016-08-10)

### Bug Fixes

* **shell:** handle seemingly uncompressed tgz files ([8d3836e](https://github.com/jamiemason/shrinkpack/commit/8d3836e))

<a name="0.16.2"></a>

## [0.16.2](https://github.com/jamiemason/shrinkpack/compare/0.16.1...0.16.2) (2016-08-10)

### Bug Fixes

* **shrinkpack:** apply a rate-limit to file copying ([6b71a36](https://github.com/jamiemason/shrinkpack/commit/6b71a36))

<a name="0.16.1"></a>

## [0.16.1](https://github.com/jamiemason/shrinkpack/compare/0.13.1...0.16.1) (2016-08-09)

### Bug Fixes

* **cli:** default to cwd if no directory is provided ([708e745](https://github.com/jamiemason/shrinkpack/commit/708e745))
* **npm:** move lodash.assign out of devDependencies ([ef50a10](https://github.com/jamiemason/shrinkpack/commit/ef50a10))
* **shrinkwrap:** rewrite npm-shrinkwrap.json on update ([2ebcf92](https://github.com/jamiemason/shrinkpack/commit/2ebcf92))

### Features

* **help:** display explanation of icons used ([2762942](https://github.com/jamiemason/shrinkpack/commit/2762942))
* **shrinkpack:** decompress by default, provide --compress option ([7b2f341](https://github.com/jamiemason/shrinkpack/commit/7b2f341)), closes [#40](https://github.com/jamiemason/shrinkpack/issues/40)
* **shrinkpack:** ignore optionalDependencies by default, provide --keep-optional ([75265ac](https://github.com/jamiemason/shrinkpack/commit/75265ac)), closes [#17](https://github.com/jamiemason/shrinkpack/issues/17)

<a name="0.13.1"></a>

## [0.13.1](https://github.com/jamiemason/shrinkpack/compare/0.12.3...0.13.1) (2016-07-01)

### Bug Fixes

* **npm:** regression appeared in npm 3.8.8, not 3.8.9 ([0056417](https://github.com/jamiemason/shrinkpack/commit/0056417))
* **npm:** regression fixed in npm 3.10.4 ([cb87a87](https://github.com/jamiemason/shrinkpack/commit/cb87a87)), closes [#45](https://github.com/jamiemason/shrinkpack/issues/45)
* **npm:** warn of regression in npm 3.8.9 ([c17c90a](https://github.com/jamiemason/shrinkpack/commit/c17c90a))

### Features

* **shrinkwrap:** support private/scoped packages ([2707067](https://github.com/jamiemason/shrinkpack/commit/2707067)), closes [#50](https://github.com/jamiemason/shrinkpack/issues/50)

<a name="0.12.3"></a>

## [0.12.3](https://github.com/jamiemason/shrinkpack/compare/0.12.2...0.12.3) (2016-04-24)

### Bug Fixes

* **shrinkpack:** don't quit if repo is already shrinkpacked ([bbe9cf5](https://github.com/jamiemason/shrinkpack/commit/bbe9cf5))

### Performance Improvements

* **resolve:** only fix "resolved" property for packages that need downloading ([b2cf8b3](https://github.com/jamiemason/shrinkpack/commit/b2cf8b3)), closes [#37](https://github.com/jamiemason/shrinkpack/issues/37)

<a name="0.12.2"></a>

## [0.12.2](https://github.com/jamiemason/shrinkpack/compare/0.12.1...0.12.2) (2016-04-21)

### Performance Improvements

* **resolve:** bring back glob.sync when globbing npm2 packages ([cbb338d](https://github.com/jamiemason/shrinkpack/commit/cbb338d))

<a name="0.12.1"></a>

## [0.12.1](https://github.com/jamiemason/shrinkpack/compare/0.10.2...0.12.1) (2016-04-19)

### Bug Fixes

* **resolve:** ensure package.json version matches when searching locally ([effa5b9](https://github.com/jamiemason/shrinkpack/commit/effa5b9)), closes [#35](https://github.com/jamiemason/shrinkpack/issues/35)
* **resolve:** revert bb8f7df ([0934e70](https://github.com/jamiemason/shrinkpack/commit/0934e70))

### Features

* **logging:** display time taken in summary ([d8b99d0](https://github.com/jamiemason/shrinkpack/commit/d8b99d0))
* **resolve:** improve logging on how tarballs are being resolved ([7880716](https://github.com/jamiemason/shrinkpack/commit/7880716))

### Performance Improvements

* **resolve:** resolve package.json according to npm version ([eb286a3](https://github.com/jamiemason/shrinkpack/commit/eb286a3))

<a name="0.10.2"></a>

## [0.10.2](https://github.com/jamiemason/shrinkpack/compare/0.10.0...0.10.2) (2016-04-18)

### Bug Fixes

* **resolve:** consider a package unresolved if it resolves to shrinkpack ([bb8f7df](https://github.com/jamiemason/shrinkpack/commit/bb8f7df))
* **shrinkpack:** removeFromBundle is provided a tarball path ([f6efe47](https://github.com/jamiemason/shrinkpack/commit/f6efe47)), closes [#30](https://github.com/jamiemason/shrinkpack/issues/30)

### Performance Improvements

* **resolve:** avoid using glob.sync to resolve tarball url ([28a1bdb](https://github.com/jamiemason/shrinkpack/commit/28a1bdb))

<a name="0.10.0"></a>

# [0.10.0](https://github.com/jamiemason/shrinkpack/compare/0.6.0...0.10.0) (2016-04-13)

### Bug Fixes

* **logging:** improve consistency of error messages ([3f26bc2](https://github.com/jamiemason/shrinkpack/commit/3f26bc2))
* **logging:** improve how errors are serialised ([22e852f](https://github.com/jamiemason/shrinkpack/commit/22e852f))
* **promises:** ensure promises are always rejected with an error object ([dfe779c](https://github.com/jamiemason/shrinkpack/commit/dfe779c))
* **resolve:** forward dependency on error ([f28197a](https://github.com/jamiemason/shrinkpack/commit/f28197a))
* **shell:** don't reject promise on stderr ([cc5e55e](https://github.com/jamiemason/shrinkpack/commit/cc5e55e)), closes [#26](https://github.com/jamiemason/shrinkpack/issues/26)
* **shell:** rate-limit disk operations ([3c3de88](https://github.com/jamiemason/shrinkpack/commit/3c3de88))

### Features

* **logging:** add prompts for when npm shrinkwrap needs to be run ([f3a3eed](https://github.com/jamiemason/shrinkpack/commit/f3a3eed))
* **logging:** add prompts for when npm shrinkwrap needs to be run ([409062c](https://github.com/jamiemason/shrinkpack/commit/409062c))
* **shrinkpack:** refactor into tasks, improve logging ([c8aa147](https://github.com/jamiemason/shrinkpack/commit/c8aa147))
* **shrinkwrap:** query registry if unable to patch missing resolved property locally ([1aa9964](https://github.com/jamiemason/shrinkpack/commit/1aa9964))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/jamiemason/shrinkpack/compare/0.5.0...0.6.0) (2016-04-04)

### Bug Fixes

* **resolve:** normalize scoped module dependency name ([d02cc3e](https://github.com/jamiemason/shrinkpack/commit/d02cc3e))

### Features

* **shrinkwrap:** handle dependencies with a missing "resolved" property ([ef5ecd2](https://github.com/jamiemason/shrinkpack/commit/ef5ecd2)), closes [#18](https://github.com/jamiemason/shrinkpack/issues/18)

<a name="0.5.0"></a>

# [0.5.0](https://github.com/jamiemason/shrinkpack/compare/0.4.1...0.5.0) (2016-04-03)

### Features

* **resolve:** add support for git dependencies ([13b8604](https://github.com/jamiemason/shrinkpack/commit/13b8604)), closes [#12](https://github.com/jamiemason/shrinkpack/issues/12) [#18](https://github.com/jamiemason/shrinkpack/issues/18) [#19](https://github.com/jamiemason/shrinkpack/issues/19)

<a name="0.4.1"></a>

## [0.4.1](https://github.com/jamiemason/shrinkpack/compare/0.4.0...0.4.1) (2015-11-04)

### Bug Fixes

* **rewrite:** handle urls in resolved properties ([ef02a10](https://github.com/jamiemason/shrinkpack/commit/ef02a10))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/jamiemason/shrinkpack/compare/0.3.3...0.4.0) (2015-10-26)

### Features

* **rewrite:** include .tar.gz files ([cf14888](https://github.com/jamiemason/shrinkpack/commit/cf14888))

<a name="0.3.3"></a>

## [0.3.3](https://github.com/jamiemason/shrinkpack/compare/0.3.2...0.3.3) (2015-10-26)

### Bug Fixes

* **rewrite:** ignore deps not resolving to a tgz ([ad98849](https://github.com/jamiemason/shrinkpack/commit/ad98849))

<a name="0.3.2"></a>

## [0.3.2](https://github.com/jamiemason/shrinkpack/compare/0.3.1...0.3.2) (2015-10-26)

### Bug Fixes

* **rewrite:** update all resolved props inc. dupes ([dfe6083](https://github.com/jamiemason/shrinkpack/commit/dfe6083))

<a name="0.3.1"></a>

## [0.3.1](https://github.com/jamiemason/shrinkpack/compare/0.3.0...0.3.1) (2015-10-23)

<a name="0.3.0"></a>

# [0.3.0](https://github.com/jamiemason/shrinkpack/compare/db4f279...0.3.0) (2015-10-23)

### Bug Fixes

* **shrinkpack:** Rate-limit shell operations ([c474b40](https://github.com/jamiemason/shrinkpack/commit/c474b40))
* **shrinkpack:** Repair support for Windows ([bc5e53c](https://github.com/jamiemason/shrinkpack/commit/bc5e53c))

### Features

* **shrinkpack:** Create working proof of concept ([db4f279](https://github.com/jamiemason/shrinkpack/commit/db4f279))
* **shrinkpack:** Improve speed and log output ([821b470](https://github.com/jamiemason/shrinkpack/commit/821b470))
* **shrinkpack:** Include devDependencies ([fd834b7](https://github.com/jamiemason/shrinkpack/commit/fd834b7))
