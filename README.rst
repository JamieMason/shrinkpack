shrinkpack
==========

|NPM version| |NPM downloads| |Dependency Status| |Build Status| |Gitter
Chat for shrinkpack| |Donate via PayPal| |Analytics| |Follow JamieMason
on GitHub| |Follow fold_left on Twitter|

Shrinkpack complements the `npm shrinkwrap`_ command by maintaining a
``node_shrinkwrap`` directory in your project, containing the same
tarballs that ``npm install`` downloads from https://registry.npmjs.org.

The rest of the ``npm install`` process is exactly the same. The only
difference is that no network activity is necessary when installing and
building your project. The ``node_shrinkwrap`` directory can be ignored
in your editor (much like is done with the ``node_modules`` directory)
but is instead checked into source control.

.. contents::
   :depth: 1

Installation
------------

::

    npm install --save-dev shrinkpack

..

    **Note:** The version of npm you’re using should match
    ``<3.8.8 || 3.10.4 - 4.6.1 || >5.6.0``. Please see
    `Problem npm versions`_ to learn more.

Usage
-----

Command Line
~~~~~~~~~~~~

::

    $ shrinkpack --help

      Usage: shrinkpack [options] [directory]

      Options:

        -V, --version   output the version number
        -c, --compress  use compressed .tgz tarballs instead of .tar
        -h, --help      output usage information

      Icons:

        + Added
        - Removed
        ✓ Resolved
        i Information
        12:34 Time Taken

      Compression:

        Although compressed .tgz files have lower filesizes, storing binary files in
        Git can result in a gradual increase in the time it takes to push to your
        repository. Shrinkpack uses uncompressed, plain text .tar files by default,
        which are handled optimally by Git in the same way that .md, .js, and .css
        files are for example.

Target Problem
--------------

On most projects I’ve worked on we had a continuous integration
environment where we would run tests, analyse code, gather metrics, and
create deployment packages.

Each time code was pushed to our ``develop`` and ``master`` branches, a
repeatable process was carried out where a clean workspace was created,
the latest version of the project was installed and configured, then
testing and code analysis took place.

We were all happy with this process and the convenience of npm in
particular, but the phase of our builds where ``npm install`` listed a
huge amount of network traffic would always raise the same concerns;

-  This seems slow, wasteful, and inefficient.
-  We *really* depend on registry.npmjs.org, what do we do if it goes
   down?

The first suggestion was always to check in our dependencies, but the
idea of some large and chatty commits whenever we chose to upgrade or
change them would put us off.

Some teams went a little further and decided that pain was acceptable
and decided to proceed, only to find that some packages such as
`phantomjs <https://www.npmjs.com/package/phantomjs>`__ and
`node-sass <https://github.com/sass/node-sass>`__ helpfully install the
appropriate binary for you depending on what system you’re running.

This meant that if Chris added ``phantomjs`` or ``node-sass`` to the
project on his Mac and checked it into the repository, Helen wouldn’t be
able to use it on her Windows Machine.

The remaining alternatives were proxies, mirrors, and caches-of-sorts.
None of which appealed to us and, grudgingly, we continued as we were
(YMMV).

Justification
-------------

Whenever we add, remove, or update an npm dependency — we should test
our application for regressions before locking down our dependencies to
avoid them mutating over time.

-  You can’t be sure of this without ``npm shrinkwrap``.
-  Checking in ``node_modules`` is horrible (and doesn’t work in many
   cases anyway).
-  You can be reasonably sure of this with ``npm shrinkwrap``.
-  You can be completely sure of this with ``npm shrinkwrap`` and
   ``shrinkpack``.

npm shrinkwrap
~~~~~~~~~~~~~~

``npm shrinkwrap`` is something I would recommend you use anyway, even
if you don’t decide to use ``shrinkpack``. It brings certainty and
confidence over exactly what versions of every nested dependency you’ve
tested against and approved.

A tagged release should be a locked-down, fixed point which has been
tested sufficiently enough that it is approved and trusted. When fed
into a repeatable, automated deployment process it should always result
in the same output.

Without ``npm shrinkwrap`` that’s not guaranteed.

Consider this snippet from the ``package.json`` of a nested dependency
in your project as an example;

.. code:: json

    "dependencies": {
      "lolwut": ">=0.1.0"
    }

If ``lolwut@0.2.4`` contains a regression and you’re not using
``npm shrinkwrap``, your project now contains a regression.

.. _shrinkpack-1:

shrinkpack
~~~~~~~~~~

Once convinced of the merits of ``npm shrinkwrap``, ``shrinkpack`` could
be seen as a small and complementary addition.

``shrinkpack`` takes the .tgz tarballs of that specific, shrinkwrapped
dependency graph saved by ``npm shrinkwrap`` and stores them within your
project.

This means;

-  No need for repeated requests to registry.npmjs.org.
-  Each package/version pair can be checked in as a single tarball,
   avoiding commits with all kinds of noisy diffs.
-  Packages can be checked in, while still installed by members of the
   team on different operating systems.
-  Complements the typical ``npm shrinkwrap`` workflow.

Suitability to your project
---------------------------

``shrinkpack`` is intended for Developers of Apps, Blogs, and Websites –
any project which is the root consumer of dependencies and not a
dependency itself. If your project is intended to be installed as a
dependency of another project using ``npm install``, let those
downstream projects make their own decisions on bundling.

That said, if you’re developing an npm package and want to use
``shrinkpack`` to speed up and harden your development and CI
environments, adding ``npm-shrinkwrap.json`` and ``node_shrinkwrap`` to
your ``.npmignore`` file will allow you to do that, without publishing
your shrinkpacked dependencies to the registry.

It’s not recommended to publish a project with bundled or shrinkpacked
dependencies to the registry. If that approach were to gain traction, it
is likely that the registry would become bloated due to the build up of
duplicate copies of packages, bundled amongst various other ones.

Problem npm versions
--------------------

-  npm ``5.0.0 - 5.6.0`` had a regression preventing offline
   installation using only a ``package-lock.json`` or
   ``npm-shrinkwrap.json`` file.
-  npm had a regression affecting shrinkwrap in versions
   ``3.8.8 - 3.10.3``.

.. |NPM version| image:: http://img.shields.io/npm/v/shrinkpack.svg?style=flat-square
   :target: https://www.npmjs.com/package/shrinkpack
.. |NPM downloads| image:: http://img.shields.io/npm/dm/shrinkpack.svg?style=flat-square
   :target: https://www.npmjs.com/package/shrinkpack
.. |Dependency Status| image:: http://img.shields.io/david/JamieMason/shrinkpack.svg?style=flat-square
   :target: https://david-dm.org/JamieMason/shrinkpack
.. |Build Status| image:: http://img.shields.io/travis/JamieMason/shrinkpack/master.svg?style=flat-square
   :target: https://travis-ci.org/JamieMason/shrinkpack
.. |Gitter Chat for shrinkpack| image:: https://badges.gitter.im/Join%20Chat.svg
   :target: https://gitter.im/JamieMason/shrinkpack
.. |Donate via PayPal| image:: https://img.shields.io/badge/donate-paypal-blue.svg
   :target: https://www.paypal.me/foldleft
.. |Analytics| image:: https://ga-beacon.appspot.com/UA-45466560-5/shrinkpack?flat&useReferer
   :target: https://github.com/igrigorik/ga-beacon
.. |Follow JamieMason on GitHub| image:: https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow
   :target: https://github.com/JamieMason
.. |Follow fold_left on Twitter| image:: https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow
   :target: https://twitter.com/fold_left
