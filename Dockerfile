# ==============================================================================
# This Dockerfile is used to run shrinkpack's tests
# You do not need Docker to use shrinkpack
# ==============================================================================
FROM node:4.2.4

# install latest local shrinkpack
RUN mkdir -p /usr/src/shrinkpack
COPY cli.js /usr/src/shrinkpack
COPY index.js /usr/src/shrinkpack
COPY package.json /usr/src/shrinkpack
COPY src /usr/src/shrinkpack/src
WORKDIR /usr/src/shrinkpack

# create a control project that does not use shrinkwrap or shrinkpack
RUN mkdir -p /usr/src/control-app
COPY test/package.json /usr/src/control-app
WORKDIR /usr/src/control-app

# create a project that plans to use shrinkpack
RUN mkdir -p /usr/src/shrinkpacked-app
COPY test/package.json /usr/src/shrinkpacked-app
WORKDIR /usr/src/shrinkpacked-app

# create 2nd project that does not use shrinkwrap or shrinkpack
RUN mkdir -p /usr/src/non-shrinkpacked-app
COPY test/package.json /usr/src/non-shrinkpacked-app
WORKDIR /usr/src/non-shrinkpacked-app

# return to parent directory
WORKDIR /usr/src/

# add test script
COPY test/runtests.sh /usr/src

# expose test runner
CMD /usr/src/runtests.sh
