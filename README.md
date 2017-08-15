> This branch is looking to determine the correct npm-shrinkwrap.json (or package-lock.json)
> structure to support offline installs of npm projects using shrinkpack

Run the following with an empty npm/cacache cache while offline.

```
$ npm i --loglevel silly
```

And the following will be displayed in npm 5.3.0.

```
0 info it worked if it ends with ok
1 verbose cli [ '/Users/foldleft/.nvm/versions/node/v4.8.4/bin/node',
1 verbose cli   '/Users/foldleft/.nvm/versions/node/v4.8.4/bin/npm',
1 verbose cli   'i',
1 verbose cli   '--loglevel',
1 verbose cli   'silly' ]
2 info using npm@5.3.0
3 info using node@v4.8.4
4 verbose npm-session 52f9a3d8d5233e93
5 silly install runPreinstallTopLevelLifecycles
6 silly preinstall temp@0.0.0
7 info lifecycle temp@0.0.0~preinstall: temp@0.0.0
8 silly install loadCurrentTree
9 silly install readLocalPackageData
10 silly install loadIdealTree
11 silly install cloneCurrentTreeToIdealTree
12 silly install loadShrinkwrap
13 silly install loadAllDepsIntoIdealTree
14 silly fetchPackageMetaData error for angular@1.6.5 request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
15 silly fetchPackageMetaData error for lodash@4.17.4 request to https://registry.npmjs.org/lodash failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
16 silly fetchPackageMetaData error for lodash.assign@4.2.0 request to https://registry.npmjs.org/lodash.assign failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
17 silly fetchPackageMetaData error for react@15.6.1 request to https://registry.npmjs.org/react failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
18 silly fetchPackageMetaData error for angular@1.6.5 request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
19 silly fetchPackageMetaData error for lodash@4.17.4 request to https://registry.npmjs.org/lodash failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
20 silly fetchPackageMetaData error for lodash.assign@4.2.0 request to https://registry.npmjs.org/lodash.assign failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
21 silly fetchPackageMetaData error for react@15.6.1 request to https://registry.npmjs.org/react failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
22 verbose type system
23 verbose stack FetchError: request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
23 verbose stack     at ClientRequest.<anonymous> (/Users/foldleft/.nvm/versions/node/v4.8.4/lib/node_modules/npm/node_modules/pacote/node_modules/make-fetch-happen/node_modules/node-fetch-npm/src/index.js:68:14)
23 verbose stack     at emitOne (events.js:77:13)
23 verbose stack     at ClientRequest.emit (events.js:169:7)
23 verbose stack     at TLSSocket.socketErrorListener (_http_client.js:269:9)
23 verbose stack     at emitOne (events.js:77:13)
23 verbose stack     at TLSSocket.emit (events.js:169:7)
23 verbose stack     at connectErrorNT (net.js:1016:8)
23 verbose stack     at nextTickCallbackWith2Args (node.js:511:9)
23 verbose stack     at process._tickCallback (node.js:425:17)
24 verbose cwd /Users/foldleft/Development/temp
25 verbose Darwin 16.7.0
26 verbose argv "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/node" "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/npm" "i" "--loglevel" "silly"
27 verbose node v4.8.4
28 verbose npm  v5.3.0
29 error code ENOTFOUND
30 error errno ENOTFOUND
31 error network request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
32 error network This is a problem related to network connectivity.
32 error network In most cases you are behind a proxy or have bad network settings.
32 error network
32 error network If you are behind a proxy, please make sure that the
32 error network 'proxy' config is set properly.  See: 'npm help config'
33 verbose exit [ 1, true ]
```
