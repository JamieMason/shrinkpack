# shrinkpack

> Fast, resilient, reproducible builds with npm install.

[![NPM version](http://img.shields.io/npm/v/shrinkpack.svg?style=flat-square)](https://www.npmjs.com/package/shrinkpack)
[![NPM downloads](http://img.shields.io/npm/dm/shrinkpack.svg?style=flat-square)](https://www.npmjs.com/package/shrinkpack)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## What

`shrinkpack` points your `package-lock.json` at [npm](https://www.npmjs.com/)
tarballs checked into your project's source control, so you can install while
offline, during a registry outage, or during the next
[left-pad incident](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm.html).

## How

1. Read `package-lock.json` or `npm-shrinkwrap.json`.
1. Download the exact same .tgz files that `npm install` fetches from
   [registry.npmjs.org](https://registry.npmjs.org).
1. Decompress the .tgz files into .tar files. This avoids storing binary files
   in Git and removes the cost of decompression during `npm install`.
1. Store the .tar files in your project at `node_shrinkpack/*.tar`.
1. Rewrite `package-lock.json` to point at those instead of the registry.

Now your project can be installed while completely offline:

```diff
- npm install
+ npm ci --offline
```

The rest of the npm installation process is exactly the same. The only
difference is that no network activity is necessary when installing and building
your project. The `node_shrinkpack` directory can be ignored in your editor
(much like is done with the `node_modules` directory), but is instead checked
into source control.

## Why

For context, please see the [target problem](#target-problem) and
[justification](#justification) sections of this README.

## Installation

> Requires npm@7 or higher.

```
npm install --global shrinkpack
```

## Usage

Run `shrinkpack` every time you have modified and installed your dependencies to
produce a new `package-lock.json`.

```
Usage: shrinkpack [options] [directory]

Options:
  -V, --version  output the version number
  -h, --help     display help for command

Icons:
  + Added
  - Removed
  i Information
  12:34 Time Taken
```

## History

1. **Feb 2015**: shrinkpack was created.
1. **Mar 2016**: The
   [left-pad incident](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm.html)
   happened (shrinkpack users were unaffected!).
1. **Jun 2016**:
   [yarn added "offline mirror" support](https://github.com/yarnpkg/yarn/commit/1e7a1818b3ebf7825a2213770eb340e60ce30288).
1. **May 2017**:
   [npm@5 added package-lock.json](https://github.com/npm/npm/commit/ba50bdb0f0bbbae234eb4d8d87c261c29b506f8b)
   but
   [npm@5 broke support for installing local files from a lockfile](https://github.com/JamieMason/shrinkpack/issues/83).
   Subsequent fixes were released for npm, but the issue was not resolved.
1. **Apr 2018**: npm announced plans to
   [integrate shrinkpack functionality into npm](https://blog.npmjs.org/post/173239798780/beyond-npm6-the-future-of-the-npm-cli.html).
1. **May 2018**: Work on shrinkpack is abandoned after
   [the regression in npm@5 is still not fixed after a year](https://github.com/JamieMason/shrinkpack/issues/83#issuecomment-386340937).
1. **Dec 2021**: [Jack Franklin](https://twitter.com/Jack_Franklin) wrote
   [why you should check-in your node dependencies](https://www.jackfranklin.co.uk/blog/check-in-your-node-dependencies/)
   and I'm reminded of
   [why I wrote shrinkpack in the first place](#target-problem).
1. **Dec 2021**: Work resumes on shrinkpack and support is added for npm >= 7.

## Target Problem

Back in 2015 I was working at [skysports.com](https://www.skysports.com/). Each
time we pushed code, our continuous integration environment created a clean
workspace, installed, configured, and built the latest version of the project,
then ran various tests and tasks.

We were happy with this process and the convenience of npm in particular, but
the phase of our builds where `npm install` listed a _huge_ amount of network
traffic would always raise the same concerns:

- This seems slow, wasteful, and inefficient.
- We _really_ depend on registry.npmjs.org, what do we do if it goes down?

The first suggestion was always to check in the node_modules directory, but the
idea of large and chatty commits whenever we chose to upgrade or change a
dependency put us off.

Other teams felt they could live with that and decided to proceed, only to find
that packages such as [phantomjs](https://www.npmjs.com/package/phantomjs) and
[node-sass](https://github.com/sass/node-sass) will helpfully install the
appropriate binary depending on which operating system you're running.

This meant that if Chris added `phantomjs` or `node-sass` to the project on his
Mac and checked it into the repository, Helen wouldn't be able to use it on her
Windows Machine.

The remaining alternatives were caching proxies or self-hosted registry mirrors,
and caches-of-sorts. None of which appealed to us and, grudgingly, we continued
as we were until later creating shrinkpack.

## Justification

> Note: This section was first written in 2015, before lockfiles were the
> default in npm, pnpm, and yarn. You had to opt-in to using a lockfile by
> running `npm shrinkwrap` to generate an npm-shrinkwrap.json file.
>
> This text has been updated to reflect the situation today, where the need for
> lockfiles is more widely understood.

Whenever we add, remove, or update an npm dependency — we should test our
application for regressions before locking down our dependencies with a
lockfile. A tagged release should be a locked-down, frozen snapshot of the
codebase which has been tested sufficiently enough that it is approved and
trusted. When fed into a repeatable, automated deployment process it should
always result in the same output.

- Without a lockfile your dependency graph will mutate on a regular basis.
- Checking in `node_modules` fixes this, but there are some issues which we
  [discussed earlier](#target-problem).
- You can be reasonably sure your dependency graph will remain consistent with a
  lockfile.
- You can be completely sure with a lockfile _and_ an offline cache.

A lockfile is something I would recommend you use anyway, even if you don't
decide to use `shrinkpack`. It increases (but doesn't guarantee) certainty and
confidence over exactly what versions of every nested dependency you've tested
against and approved.

Without a lockfile and an offline cache, that's not guaranteed.

Consider this snippet from the `package.json` of a nested dependency in your
project as an example. It's not even a package you directly control, it's a
dependency of a dependency of a dependency:

```json
"dependencies": {
  "lolwut": ">=0.1.0"
}
```

If `lolwut@0.2.4` contains a regression and you're not using a lockfile, your
project will contain that regression the next time you install it.

### shrinkpack

With you hopefully convinced of the merits of lockfiles, `shrinkpack` will
hopefully be seen as a small and complementary addition.

`shrinkpack` takes the tarballs of the specific dependency graph described by
your lockfile and stores them within your project.

This means;

- No need for repeated requests to registry.npmjs.org.
- Each package/version pair can be checked in as a single tarball, avoiding
  commits with all kinds of noisy diffs.
- Packages can be checked in, while still being installed by members of the team
  on different operating systems.

## Suitability to your project

`shrinkpack` is best suited to a project which is the root consumer of
dependencies and not a dependency itself. If your project is intended to be
installed as a dependency of another project using `npm install`, let those
downstream projects make their own decisions on bundling.

That said, if you're developing an npm package and want to use `shrinkpack` to
speed up and harden your development and CI environments, adding
`package-lock.json` and `node_shrinkpack` to your `.npmignore` file will allow
you to do that, without publishing your shrinkpacked dependencies to the
registry.

It's not recommended to publish a project with bundled or shrinkpacked
dependencies to the registry, which would become bloated with duplicate copies
of packages, bundled amongst various other ones.

## Getting Help

- Get help with issues by creating a
  [Bug Report](https://github.com/JamieMason/shrinkpack/issues/new?template=bug_report.md).
- Discuss ideas by opening a
  [Feature Request](https://github.com/JamieMason/shrinkpack/issues/new?template=feature_request.md).
