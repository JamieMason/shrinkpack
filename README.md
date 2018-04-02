# shrinkpack

[![NPM version](http://img.shields.io/npm/v/shrinkpack.svg?style=flat-square)](https://www.npmjs.com/package/shrinkpack)
[![NPM downloads](http://img.shields.io/npm/dm/shrinkpack.svg?style=flat-square)](https://www.npmjs.com/package/shrinkpack)
[![Dependency Status](http://img.shields.io/david/JamieMason/shrinkpack.svg?style=flat-square)](https://david-dm.org/JamieMason/shrinkpack)
[![Build Status](http://img.shields.io/travis/JamieMason/shrinkpack/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/shrinkpack)
[![Gitter Chat for shrinkpack](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/shrinkpack)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/shrinkpack?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

Shrinkpack complements the [npm shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) command by
maintaining a `archived-packages` directory in your project, containing the exact same tarballs that
`npm install` downloads from [https://registry.npmjs.org](https://registry.npmjs.org).

The rest of the `npm install` process is exactly the same. The only difference is that no network
activity is necessary when installing and building your project. The `archived-packages` directory can
be ignored in your editor (much like is done with the `node_modules` directory) but is instead
checked into source control.

> For context, please see the [target problem](#target-problem) and [justification](#justification)
> sections of this README.

## Contents

* [Installation](#installation)
* [Usage](#usage)
  * [Command Line](#command-line)
* [Target Problem](#target-problem)
* [Justification](#justification)
  * [npm shrinkwrap](#npm-shrinkwrap)
  * [shrinkpack](#shrinkpack-1)
* [Suitability to your project](#suitability-to-your-project)
* [Tutorial](#tutorial)
  * [Create a new project](#create-a-new-project)
  * [Set some sensible npm defaults](#set-some-sensible-npm-defaults)
  * [Install dependencies](#install-dependencies)
  * [Shrinkwrap dependencies](#shrinkwrap-dependencies)
  * [Shrinkpack dependencies](#shrinkpack-dependencies)
  * [Check into Git](#check-into-git)
  * [Clean install](#clean-install)
  * [Update Dependencies](#update-dependencies)

## Installation

```
npm install --global shrinkpack
```

> Please ensure your version of `npm` is 5.8.0 or newer.

## Usage

### Command Line

```
Usage: shrinkpack [options]

Options:

  -h, --help           output usage information
  -V, --version        output the version number

Icons:

  + Added
  - Removed
  12:34 Time Taken

Compression:

  Although compressed .tgz files have lower filesizes, storing binary files in
  Git can result in a gradual increase in the time it takes to push to your
  repository. Shrinkpack uses uncompressed, plain text .tar files, which are
  handled optimally by Git in the same way that .md, .js, and .css files are.
```

## Target Problem

On most projects I've worked on we've had a [Jenkins](http://jenkins-ci.org/) (or similiar)
continuous integration environment, where we would run tests, analyse code, gather metrics, and
create deployment packages.

Each time code was pushed to our `develop` and `master` branches, a repeatable process was carried
out where a clean workspace was created, the latest version of the project was installed and
configured, then testing and code analysis took place.

We were all very happy with this process and the convenience of npm in particular, but the phase of
our builds where `npm install` listed a huge amount of network traffic would always raise the same
concerns;

* This seems slow, wasteful, and inefficient.
* We _really_ depend on registry.npmjs.org, what do we do if it goes down?

The first suggestion was always to check in our dependencies, but the idea of some large and chatty
commits whenever we chose to upgrade or change them would put us off.

Some teams went a little further and decided that pain was acceptable and decided to proceed, only
to find that some packages such as [phantomjs](https://www.npmjs.com/package/phantomjs) and
[node-sass](https://github.com/sass/node-sass) helpfully install the appropriate binary for you
depending on what system you're running.

This meant that if Chris added `phantomjs` or `node-sass` to the project on his Mac and checked it
into the repository, Helen wouldn't be able to use it on her Windows Machine.

The remaining alternatives were proxies, mirrors, and caches-of-sorts. None of which appealed to us
and, grudgingly, we continued as we were (<abbr title="Your Mileage May Vary">YMMV</abbr>).

## Justification

Whenever we add, remove, or update an npm dependency — we should test our application for
regressions before locking down our dependencies to avoid them mutating over time.

* You can't be sure of this without `npm shrinkwrap`.
* Checking in `node_modules` is horrible (and doesn't work in many cases anyway).
* You can be reasonably sure of this with `npm shrinkwrap`.
* You can be completely sure of this with `npm shrinkwrap` and `shrinkpack`.

### npm shrinkwrap

`npm shrinkwrap` is something I would recommend you use anyway, even if you don't decide to use
`shrinkpack`. It brings certainty and confidence over exactly what versions of every nested
dependency you've tested against and approved.

A tagged release should be a locked-down, fixed point in time which has been tested sufficiently
enough that it is approved and trusted. When fed into a repeatable, automated deployment process it
should always result in the same output.

Without `npm shrinkwrap` that's not guaranteed.

Consider this snippet from the `package.json` of a nested dependency in your project as an example;

```json
"dependencies": {
  "lolwut": ">=0.1.0"
}
```

If `lolwut@0.2.4` contains a regression and you're not using `npm shrinkwrap`, your project now
contains a regression.

### shrinkpack

With you hopefully convinced of the merits of `npm shrinkwrap`, `shrinkpack` will hopefully be seen
as a small and complementary addition.

`shrinkpack` takes the .tgz tarballs of that specific, shrinkwrapped dependency graph saved by `npm shrinkwrap` and stores them within your project.

This means;

* No need for repeated requests to registry.npmjs.org.
* Each package/version pair can be checked in as a single tarball, avoiding commits with all kinds
  of noisy diffs.
* Packages can be checked in, while still installed by members of the team on different operating
  systems.
* Complements the typical `npm shrinkwrap` workflow.

## Suitability to your project

`shrinkpack` is intended for Developers of Apps, Blogs, and Websites – any project which is the root
consumer of dependencies and not a dependency itself. If your project is intended to be installed as
a dependency of another project using `npm install`, let those downstream projects make their own
decisions on bundling.

That said, if you're developing an npm package and want to use `shrinkpack` to speed up and
harden your development and CI environments, adding `npm-shrinkwrap.json` and `archived-packages` to
your `.npmignore` file will allow you to do that, without publishing your shrinkpacked dependencies
to the registry.

It's not recommended to publish a project with bundled or shrinkpacked dependencies to the registry.
If that approach were to gain traction, it is likely that the registry would become bloated due to
the build up of duplicate copies of packages, bundled amongst various other ones.

## Tutorial

### Create a new project

Here we create a straightforward project which will use Git and npm.

```
mkdir shrinkpack-demo
cd shrinkpack-demo
git init
echo node_modules >> .gitignore
echo npm-debug.log >> .gitignore
npm init --yes
```

<a href="https://asciinema.org/a/83790" target="_blank"><img src="https://asciinema.org/a/83790.png" alt="asciicast"></a>

### Set some sensible npm defaults

The default behaviour when installing in npm is to 1) not update package.json and 2) include
wildcards such as `^`, `~`, or `*` in the version numbers stored in package.json if using the
`--save` option when installing.

We want each version of our project to be identical every time it is built, so we can have complete
confidence when the time comes to ship it. Therefore, we want a package.json which is always up to
date and that contains the exact version numbers we have developed and tested against.

```
echo save=true >> .npmrc
echo save-exact=true >> .npmrc
```

### Install dependencies

For the sake of an example, let's install the following packages. I've chosen an older version of
commander so that we can go through how to update a shrinkpacked project later.

```
npm install async commander@2.7.1 express lodash request
```

<a href="https://asciinema.org/a/83792" target="_blank"><img src="https://asciinema.org/a/83792.png" alt="asciicast"></a>

This is typical behaviour, npm downloads the packages from the registry and installs them, leaving
the following directory structure;

```
├── .gitignore
├── node_modules
│   ├── (lots of files and folders)
└── package.json
```

### Shrinkwrap dependencies

The `--dev` option tells npm to also include `devDependencies` when creating an
`npm-shrinkwrap.json` for your project.

```
npm shrinkwrap --dev
```

<a href="https://asciinema.org/a/83795" target="_blank"><img src="https://asciinema.org/a/83795.png" alt="asciicast"></a>

### Shrinkpack dependencies

Whenever you run `npm install`, npm downloads a .tgz file from http://registry.npmjs.org containing
the installation for each package. Shrinkpack saves these files in an `archived-packages` directory
in your project, before updating each record in `npm-shrinkwrap.json` or `package-lock.json` to
point at those instead of the public registry.

```
shrinkpack
```

Each entry will look something like this

```json
"lodash": {
  "version": "4.17.5",
  "resolved": "file:archived-packages/lodash-4.17.5-b2f2f7ba2.tar",
  "integrity": "sha512-Hjp8iABK5ONegfU0eVs0mjEmu+TM7XzsThYtxQ+DbCc6Rg+AtVlE/z4e0LAtCjA/kGE807VdPO4hBWMZSJ4PQw== sha512-svL3uiZf1RwhH+cWrfZn3A4+U58wbP0tGVTLQPbjplZxZ8ROD9VLuNgsRniTlLe7OlSqR79RUehXgpBW/s0IQw=="
}
```

### Check into Git

By this point, `git status` should list the following untracked files;

```
.gitignore
.npmrc
archived-packages/
npm-shrinkwrap.json
package.json
```

Let's check them in.

```
git add .
git commit -m 'chore(project): initial commit'
```

### Clean install

We check this code into Git and tell a co-worker that it's ready for them to contribute to.

Once they have cloned the project, our co-worker runs;

```
npm install --loglevel http
```

This is new behaviour, npm didn't hit the network at all. Instead it read the packages from the
`archived-packages` directory directly and installed them straight away. Shrinkpack has allowed us
to install our project without any network activity whatsoever – and in a fraction of the time.

If everything went to plan, the only output will be these expected warnings because we didn't choose
to add a `description` or `repository` to our `package.json`.

> ```
> npm WARN shrinkpack-demo@1.0.0 No description
> npm WARN shrinkpack-demo@1.0.0 No repository field.
> ```

### Update Dependencies

Later, we may choose to add, update, or remove some dependencies;

```
npm install commander@2.9.0
npm install react
npm uninstall express
```

With our local `node_modules` now up to date, we now need to update our `npm-shrinkwrap.json` file
and get our `archived-packages` directory back in sync with the new changes.

```
npm shrinkwrap --dev
shrinkpack
```
