# [0.20.0](https://github.com/JamieMason/shrinkpack/compare/0.19.0...0.20.0) (2022-01-03)


### Features

* **package-lock:** handle missing resolved fields ([41a304f](https://github.com/JamieMason/shrinkpack/commit/41a304f4ea7914f497c45cb095aeae9f70cc50c8))



# [0.19.0](https://github.com/JamieMason/shrinkpack/compare/0.18.1...0.19.0) (2021-12-29)


### Features

* **shrinkpack:** add support for npm >= 7 ([0118a09](https://github.com/JamieMason/shrinkpack/commit/0118a09749b7aa91117f9d875eb02ea953584e10))


### BREAKING CHANGES

* **shrinkpack:** - Removed `--compress` option.
- Removed `--keep-optional`, optional dependencies are kept by default.
- Dropped support for npm@6 and older.
- Dropped support for git+ssh and git+https dependencies (but this may return in the future).
- Rename node_shrinkwrap directory to node_shrinkpack.



## [0.18.1](https://github.com/JamieMason/shrinkpack/compare/0.17.1...0.18.1) (2016-12-21)


### Bug Fixes

* **shell:** migrate from deprecated execa.spawn ([2dc7919](https://github.com/JamieMason/shrinkpack/commit/2dc7919bb9c852be261e43265b7dc69b7accd6f9))


### Features

* **shrinkpack:** remove nested optional dependencies in npm >= 3.10.8 ([3e8969a](https://github.com/JamieMason/shrinkpack/commit/3e8969adb7c5c2db9054e7a8a98c23775b8700d6)), closes [#75](https://github.com/JamieMason/shrinkpack/issues/75)



## [0.17.1](https://github.com/JamieMason/shrinkpack/compare/0.17.0...0.17.1) (2016-10-17)


### Bug Fixes

* **npm:** modify semver range for npm engine ([261203f](https://github.com/JamieMason/shrinkpack/commit/261203fdc6a25b9ba27c6ecf0e7ff619335a9446))



# [0.17.0](https://github.com/JamieMason/shrinkpack/compare/0.16.3...0.17.0) (2016-08-25)


### Features

* **api:** expose cli runner through node.js api ([d7ccf2a](https://github.com/JamieMason/shrinkpack/commit/d7ccf2a4d7f83e8a71ebb9872ebcdd2924bad3e4)), closes [#67](https://github.com/JamieMason/shrinkpack/issues/67)



## [0.16.3](https://github.com/JamieMason/shrinkpack/compare/0.16.2...0.16.3) (2016-08-10)


### Bug Fixes

* **shell:** handle seemingly uncompressed tgz files ([8d3836e](https://github.com/JamieMason/shrinkpack/commit/8d3836e56b64010baf9dc9fa859ed2df8d4c00c7))



## [0.16.2](https://github.com/JamieMason/shrinkpack/compare/0.16.1...0.16.2) (2016-08-10)


### Bug Fixes

* **shrinkpack:** apply a rate-limit to file copying ([6b71a36](https://github.com/JamieMason/shrinkpack/commit/6b71a3650a5c6eb4574a708504b12117c0b51d8c))



## [0.16.1](https://github.com/JamieMason/shrinkpack/compare/0.13.1...0.16.1) (2016-08-09)


### Bug Fixes

* **cli:** default to cwd if no directory is provided ([708e745](https://github.com/JamieMason/shrinkpack/commit/708e7455a3ef0b154fce2cd8bf06bc44fca991a3))
* **npm:** move lodash.assign out of devDependencies ([ef50a10](https://github.com/JamieMason/shrinkpack/commit/ef50a10265b158497802a24c47d4fec17b7af653))
* **shrinkwrap:** rewrite npm-shrinkwrap.json on update ([2ebcf92](https://github.com/JamieMason/shrinkpack/commit/2ebcf925722c19566dc10d6a68c868cd35e06444))


### Features

* **help:** display explanation of icons used ([2762942](https://github.com/JamieMason/shrinkpack/commit/276294299ed5edae80b20df317fc58992b02d206))
* **shrinkpack:** decompress by default, provide --compress option ([7b2f341](https://github.com/JamieMason/shrinkpack/commit/7b2f341408be4f0415714ec57534debfdaaa3fbf)), closes [#40](https://github.com/JamieMason/shrinkpack/issues/40)
* **shrinkpack:** ignore optionalDependencies by default, provide --keep-optional ([75265ac](https://github.com/JamieMason/shrinkpack/commit/75265aca8019b72ffe67f34818bf73262865b582)), closes [#17](https://github.com/JamieMason/shrinkpack/issues/17)



## [0.13.1](https://github.com/JamieMason/shrinkpack/compare/0.12.3...0.13.1) (2016-07-01)


### Bug Fixes

* **npm:** regression appeared in npm 3.8.8, not 3.8.9 ([0056417](https://github.com/JamieMason/shrinkpack/commit/005641765743b02a39401d305aa41e5d4432472d))
* **npm:** regression fixed in npm 3.10.4 ([cb87a87](https://github.com/JamieMason/shrinkpack/commit/cb87a87051293d4450ea5486265afee3ffd5a500)), closes [#45](https://github.com/JamieMason/shrinkpack/issues/45)
* **npm:** warn of regression in npm 3.8.9 ([c17c90a](https://github.com/JamieMason/shrinkpack/commit/c17c90a72d205e07b48df34ee8eac881b7a034d7))


### Features

* **shrinkwrap:** support private/scoped packages ([2707067](https://github.com/JamieMason/shrinkpack/commit/2707067d65c7dd5a800dc3c5e3b3b3dbbd25c391)), closes [#50](https://github.com/JamieMason/shrinkpack/issues/50)



## [0.12.3](https://github.com/JamieMason/shrinkpack/compare/0.12.2...0.12.3) (2016-04-24)


### Bug Fixes

* **shrinkpack:** don't quit if repo is already shrinkpacked ([bbe9cf5](https://github.com/JamieMason/shrinkpack/commit/bbe9cf5597f31f451a000830926829d94b0c615a)), closes [#31](https://github.com/JamieMason/shrinkpack/issues/31)


### Performance Improvements

* **resolve:** only fix "resolved" property for packages that need downloading ([b2cf8b3](https://github.com/JamieMason/shrinkpack/commit/b2cf8b3d6c1ca9bffd8a9a24b36145f9ed8df536)), closes [#37](https://github.com/JamieMason/shrinkpack/issues/37)



## [0.12.2](https://github.com/JamieMason/shrinkpack/compare/0.12.1...0.12.2) (2016-04-21)


### Performance Improvements

* **resolve:** bring back glob.sync when globbing npm2 packages ([cbb338d](https://github.com/JamieMason/shrinkpack/commit/cbb338d892ec3ecd84a61882e789d045b353b486))



## [0.12.1](https://github.com/JamieMason/shrinkpack/compare/0.10.2...0.12.1) (2016-04-19)


### Bug Fixes

* **resolve:** ensure package.json version matches when searching locally ([effa5b9](https://github.com/JamieMason/shrinkpack/commit/effa5b95b4615219a56317d803c7896c2a0242e0)), closes [#35](https://github.com/JamieMason/shrinkpack/issues/35)
* **resolve:** revert bb8f7df ([0934e70](https://github.com/JamieMason/shrinkpack/commit/0934e7010950452923d1e6e2364fb97d5309238b))


### Features

* **logging:** display time taken in summary ([d8b99d0](https://github.com/JamieMason/shrinkpack/commit/d8b99d09e5555d7ab1c808d958faf7ce293ec964))
* **resolve:** improve logging on how tarballs are being resolved ([7880716](https://github.com/JamieMason/shrinkpack/commit/7880716b8a2bcb0a1b61ddf2ab28378fdf45c753))


### Performance Improvements

* **resolve:** resolve package.json according to npm version ([eb286a3](https://github.com/JamieMason/shrinkpack/commit/eb286a3b2f5a687956dafdf1bf8b272c4b2fe6ec))



## [0.10.2](https://github.com/JamieMason/shrinkpack/compare/0.10.0...0.10.2) (2016-04-18)


### Bug Fixes

* **resolve:** consider a package unresolved if it resolves to shrinkpack ([bb8f7df](https://github.com/JamieMason/shrinkpack/commit/bb8f7df8b2543998ef2214ac1a87ba854cf15e50))
* **shrinkpack:** removeFromBundle is provided a tarball path ([f6efe47](https://github.com/JamieMason/shrinkpack/commit/f6efe472ce278086d9e525d007f2e38c2912bb9e)), closes [#30](https://github.com/JamieMason/shrinkpack/issues/30)


### Performance Improvements

* **resolve:** avoid using glob.sync to resolve tarball url ([28a1bdb](https://github.com/JamieMason/shrinkpack/commit/28a1bdbf2b803e77027f5aa5840fadeff516345f)), closes [#32](https://github.com/JamieMason/shrinkpack/issues/32)



# [0.10.0](https://github.com/JamieMason/shrinkpack/compare/0.6.0...0.10.0) (2016-04-13)


### Bug Fixes

* **logging:** improve consistency of error messages ([3f26bc2](https://github.com/JamieMason/shrinkpack/commit/3f26bc211c097dd6de15a3c50e83a09996ca5bff))
* **logging:** improve how errors are serialised ([22e852f](https://github.com/JamieMason/shrinkpack/commit/22e852f297597c4c1e2c55c2ca78d8f6daa173a6)), closes [#25](https://github.com/JamieMason/shrinkpack/issues/25)
* **promises:** ensure promises are always rejected with an error object ([dfe779c](https://github.com/JamieMason/shrinkpack/commit/dfe779ce5d7dafa1de5c787e091400e132fa1fb1))
* **resolve:** forward dependency on error ([f28197a](https://github.com/JamieMason/shrinkpack/commit/f28197ae331f920ab44a3f836cc721ca767f1bba)), closes [#25](https://github.com/JamieMason/shrinkpack/issues/25)
* **shell:** don't reject promise on stderr ([cc5e55e](https://github.com/JamieMason/shrinkpack/commit/cc5e55e31657c2fdb95efed3851599e02c5d745b)), closes [#26](https://github.com/JamieMason/shrinkpack/issues/26)
* **shell:** rate-limit disk operations ([3c3de88](https://github.com/JamieMason/shrinkpack/commit/3c3de88da84d51282b5eb47dd83b976543eeb66e))


### Features

* **logging:** add prompts for when npm shrinkwrap needs to be run ([f3a3eed](https://github.com/JamieMason/shrinkpack/commit/f3a3eed00b92a1234f3c8249bd766a674b101386))
* **logging:** add prompts for when npm shrinkwrap needs to be run ([409062c](https://github.com/JamieMason/shrinkpack/commit/409062cfb7b3ac53a7357de3a1e53bb116b9f054))
* **shrinkpack:** refactor into tasks, improve logging ([c8aa147](https://github.com/JamieMason/shrinkpack/commit/c8aa1475f164366d0f83d30fc8d42bf2beb4aa97))
* **shrinkwrap:** query registry if unable to patch missing resolved property locally ([1aa9964](https://github.com/JamieMason/shrinkpack/commit/1aa996420cbc5430651142bbb6fea46258927f3e))



# [0.6.0](https://github.com/JamieMason/shrinkpack/compare/0.5.0...0.6.0) (2016-04-04)


### Bug Fixes

* **resolve:** normalize scoped module dependency name ([d02cc3e](https://github.com/JamieMason/shrinkpack/commit/d02cc3ed4f4ffa4461546d25a724f92e02936bb5)), closes [#12](https://github.com/JamieMason/shrinkpack/issues/12)


### Features

* **shrinkwrap:** handle dependencies with a missing "resolved" property ([ef5ecd2](https://github.com/JamieMason/shrinkpack/commit/ef5ecd2d35a211d8ca4df55ab75c0b95f33c1d68)), closes [#18](https://github.com/JamieMason/shrinkpack/issues/18)



# [0.5.0](https://github.com/JamieMason/shrinkpack/compare/0.4.1...0.5.0) (2016-04-03)


### Features

* **resolve:** add support for git dependencies ([13b8604](https://github.com/JamieMason/shrinkpack/commit/13b8604b90552ca022a215be23e1343f8d4787c4)), closes [#12](https://github.com/JamieMason/shrinkpack/issues/12) [#18](https://github.com/JamieMason/shrinkpack/issues/18) [#19](https://github.com/JamieMason/shrinkpack/issues/19)



## [0.4.1](https://github.com/JamieMason/shrinkpack/compare/0.4.0...0.4.1) (2015-11-04)


### Bug Fixes

* **rewrite:** handle urls in resolved properties ([ef02a10](https://github.com/JamieMason/shrinkpack/commit/ef02a10a82b1f7fda4e458d9b97f05c292930039))



# [0.4.0](https://github.com/JamieMason/shrinkpack/compare/0.3.3...0.4.0) (2015-10-26)


### Features

* **rewrite:** include .tar.gz files ([cf14888](https://github.com/JamieMason/shrinkpack/commit/cf148880d99dacbf4cf28b7396b8e496626c7458))



## [0.3.3](https://github.com/JamieMason/shrinkpack/compare/0.3.2...0.3.3) (2015-10-26)


### Bug Fixes

* **rewrite:** ignore deps not resolving to a tgz ([ad98849](https://github.com/JamieMason/shrinkpack/commit/ad98849e36cd858e62ca254c5a9000d013c942b7))



## [0.3.2](https://github.com/JamieMason/shrinkpack/compare/0.3.1...0.3.2) (2015-10-26)


### Bug Fixes

* **rewrite:** update all resolved props inc. dupes ([dfe6083](https://github.com/JamieMason/shrinkpack/commit/dfe6083d38bc2a278dc9512b956fad598f09cb11))



## [0.3.1](https://github.com/JamieMason/shrinkpack/compare/0.3.0...0.3.1) (2015-10-23)



# [0.3.0](https://github.com/JamieMason/shrinkpack/compare/db4f2799149fccb300af6625b5bd00148dc657fd...0.3.0) (2015-10-23)


### Bug Fixes

* **shrinkpack:** Rate-limit shell operations ([c474b40](https://github.com/JamieMason/shrinkpack/commit/c474b407cbc16e02123df3579d8410f268660911))
* **shrinkpack:** Repair support for Windows ([bc5e53c](https://github.com/JamieMason/shrinkpack/commit/bc5e53c511fdb399ba908ccafd0b5a52841c5c75))


### Features

* **shrinkpack:** Create working proof of concept ([db4f279](https://github.com/JamieMason/shrinkpack/commit/db4f2799149fccb300af6625b5bd00148dc657fd))
* **shrinkpack:** Improve speed and log output ([821b470](https://github.com/JamieMason/shrinkpack/commit/821b4701060a6948800bf2e064c62fe7b02f5c87))
* **shrinkpack:** Include devDependencies ([fd834b7](https://github.com/JamieMason/shrinkpack/commit/fd834b709411ad41d2022b708ae89fcb219f3709))



