<a name="0.12.5"></a>
## [0.12.5](https://github.com/JamieMason/shrinkpack/compare/0.12.4...v0.12.5) (2016-05-30)


### Bug Fixes

* **npm:** regression appeared in npm 3.8.8, not 3.8.9 ([3b55ab2](https://github.com/JamieMason/shrinkpack/commit/3b55ab2))



<a name="0.12.4"></a>
## [0.12.4](https://github.com/JamieMason/shrinkpack/compare/0.12.3...0.12.4) (2016-05-28)


### Bug Fixes

* **npm:** warn of regression in npm 3.8.9 ([b49d36f](https://github.com/JamieMason/shrinkpack/commit/b49d36f))



<a name="0.12.3"></a>
## [0.12.3](https://github.com/JamieMason/shrinkpack/compare/0.12.2...0.12.3) (2016-04-24)


### Bug Fixes

* **shrinkpack:** don't quit if repo is already shrinkpacked ([bbe9cf5](https://github.com/JamieMason/shrinkpack/commit/bbe9cf5))


### Performance Improvements

* **resolve:** only fix "resolved" property for packages that need downloading ([b2cf8b3](https://github.com/JamieMason/shrinkpack/commit/b2cf8b3)), closes [#37](https://github.com/JamieMason/shrinkpack/issues/37)



<a name="0.12.2"></a>
## [0.12.2](https://github.com/JamieMason/shrinkpack/compare/0.12.1...0.12.2) (2016-04-21)


### Performance Improvements

* **resolve:** bring back glob.sync when globbing npm2 packages ([cbb338d](https://github.com/JamieMason/shrinkpack/commit/cbb338d))



<a name="0.12.1"></a>
## [0.12.1](https://github.com/JamieMason/shrinkpack/compare/0.10.2...0.12.1) (2016-04-19)


### Bug Fixes

* **resolve:** ensure package.json version matches when searching locally ([effa5b9](https://github.com/JamieMason/shrinkpack/commit/effa5b9)), closes [#35](https://github.com/JamieMason/shrinkpack/issues/35)
* **resolve:** revert bb8f7df ([0934e70](https://github.com/JamieMason/shrinkpack/commit/0934e70))


### Features

* **logging:** display time taken in summary ([d8b99d0](https://github.com/JamieMason/shrinkpack/commit/d8b99d0))
* **resolve:** improve logging on how tarballs are being resolved ([7880716](https://github.com/JamieMason/shrinkpack/commit/7880716))


### Performance Improvements

* **resolve:** resolve package.json according to npm version ([eb286a3](https://github.com/JamieMason/shrinkpack/commit/eb286a3))



<a name="0.10.2"></a>
## [0.10.2](https://github.com/JamieMason/shrinkpack/compare/0.10.0...0.10.2) (2016-04-18)


### Bug Fixes

* **resolve:** consider a package unresolved if it resolves to shrinkpack ([bb8f7df](https://github.com/JamieMason/shrinkpack/commit/bb8f7df))
* **shrinkpack:** removeFromBundle is provided a tarball path ([f6efe47](https://github.com/JamieMason/shrinkpack/commit/f6efe47)), closes [#30](https://github.com/JamieMason/shrinkpack/issues/30)


### Performance Improvements

* **resolve:** avoid using glob.sync to resolve tarball url ([28a1bdb](https://github.com/JamieMason/shrinkpack/commit/28a1bdb))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/JamieMason/shrinkpack/compare/0.6.0...0.10.0) (2016-04-13)


### Bug Fixes

* **logging:** improve consistency of error messages ([3f26bc2](https://github.com/JamieMason/shrinkpack/commit/3f26bc2))
* **logging:** improve how errors are serialised ([22e852f](https://github.com/JamieMason/shrinkpack/commit/22e852f))
* **promises:** ensure promises are always rejected with an error object ([dfe779c](https://github.com/JamieMason/shrinkpack/commit/dfe779c))
* **resolve:** forward dependency on error ([f28197a](https://github.com/JamieMason/shrinkpack/commit/f28197a))
* **shell:** don't reject promise on stderr ([cc5e55e](https://github.com/JamieMason/shrinkpack/commit/cc5e55e)), closes [#26](https://github.com/JamieMason/shrinkpack/issues/26)
* **shell:** rate-limit disk operations ([3c3de88](https://github.com/JamieMason/shrinkpack/commit/3c3de88))


### Features

* **logging:** add prompts for when npm shrinkwrap needs to be run ([f3a3eed](https://github.com/JamieMason/shrinkpack/commit/f3a3eed))
* **logging:** add prompts for when npm shrinkwrap needs to be run ([409062c](https://github.com/JamieMason/shrinkpack/commit/409062c))
* **shrinkpack:** refactor into tasks, improve logging ([c8aa147](https://github.com/JamieMason/shrinkpack/commit/c8aa147))
* **shrinkwrap:** query registry if unable to patch missing resolved property locally ([1aa9964](https://github.com/JamieMason/shrinkpack/commit/1aa9964))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/JamieMason/shrinkpack/compare/0.5.0...0.6.0) (2016-04-04)


### Bug Fixes

* **resolve:** normalize scoped module dependency name ([d02cc3e](https://github.com/JamieMason/shrinkpack/commit/d02cc3e))


### Features

* **shrinkwrap:** handle dependencies with a missing "resolved" property ([ef5ecd2](https://github.com/JamieMason/shrinkpack/commit/ef5ecd2)), closes [#18](https://github.com/JamieMason/shrinkpack/issues/18)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/JamieMason/shrinkpack/compare/0.4.1...0.5.0) (2016-04-03)


### Features

* **resolve:** add support for git dependencies ([13b8604](https://github.com/JamieMason/shrinkpack/commit/13b8604)), closes [#12](https://github.com/JamieMason/shrinkpack/issues/12) [#18](https://github.com/JamieMason/shrinkpack/issues/18) [#19](https://github.com/JamieMason/shrinkpack/issues/19)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/JamieMason/shrinkpack/compare/0.4.0...0.4.1) (2015-11-04)


### Bug Fixes

* **rewrite:** handle urls in resolved properties ([ef02a10](https://github.com/JamieMason/shrinkpack/commit/ef02a10))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/JamieMason/shrinkpack/compare/0.3.3...0.4.0) (2015-10-26)


### Features

* **rewrite:** include .tar.gz files ([cf14888](https://github.com/JamieMason/shrinkpack/commit/cf14888))



<a name="0.3.3"></a>
## [0.3.3](https://github.com/JamieMason/shrinkpack/compare/0.3.2...0.3.3) (2015-10-26)


### Bug Fixes

* **rewrite:** ignore deps not resolving to a tgz ([ad98849](https://github.com/JamieMason/shrinkpack/commit/ad98849))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/JamieMason/shrinkpack/compare/0.3.1...0.3.2) (2015-10-26)


### Bug Fixes

* **rewrite:** update all resolved props inc. dupes ([dfe6083](https://github.com/JamieMason/shrinkpack/commit/dfe6083))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/JamieMason/shrinkpack/compare/0.3.0...0.3.1) (2015-10-23)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/JamieMason/shrinkpack/compare/db4f279...0.3.0) (2015-10-23)


### Bug Fixes

* **shrinkpack:** Rate-limit shell operations ([c474b40](https://github.com/JamieMason/shrinkpack/commit/c474b40))
* **shrinkpack:** Repair support for Windows ([bc5e53c](https://github.com/JamieMason/shrinkpack/commit/bc5e53c))


### Features

* **shrinkpack:** Create working proof of concept ([db4f279](https://github.com/JamieMason/shrinkpack/commit/db4f279))
* **shrinkpack:** Improve speed and log output ([821b470](https://github.com/JamieMason/shrinkpack/commit/821b470))
* **shrinkpack:** Include devDependencies ([fd834b7](https://github.com/JamieMason/shrinkpack/commit/fd834b7))



