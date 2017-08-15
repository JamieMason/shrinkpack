> This branch is looking to determine the correct npm-shrinkwrap.json (or package-lock.json)
> structure to support offline installs of npm projects using shrinkpack

Run the following with an empty npm/cacache cache while offline.

```
$ npm i --loglevel silly
```

**This version is based on the working version 3, but package.json is put back to normal**

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
4 verbose npm-session 3dde0a9d0378490a
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
16 warn registry Using stale data from https://registry.npmjs.org/ because the host is inaccessible -- are you offline?
17 warn registry Using stale package data from https://registry.npmjs.org/ due to a request error during revalidation.
18 silly fetchPackageMetaData error for lodash.assign@4.2.0 request to https://registry.npmjs.org/lodash.assign failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
19 http fetch GET 200 https://registry.npmjs.org/asap 123ms (from cache)
20 http fetch GET 200 https://registry.npmjs.org/create-react-class 123ms (from cache)
21 http fetch GET 200 https://registry.npmjs.org/core-js 126ms (from cache)
22 http fetch GET 200 https://registry.npmjs.org/encoding 126ms (from cache)
23 http fetch GET 200 https://registry.npmjs.org/fbjs 126ms (from cache)
24 http fetch GET 200 https://registry.npmjs.org/iconv-lite 127ms (from cache)
25 http fetch GET 200 https://registry.npmjs.org/is-stream 126ms (from cache)
26 http fetch GET 200 https://registry.npmjs.org/isomorphic-fetch 127ms (from cache)
27 http fetch GET 200 https://registry.npmjs.org/js-tokens 127ms (from cache)
28 silly pacote version manifest for asap@2.0.6 fetched in 140ms
29 silly pacote version manifest for create-react-class@15.6.0 fetched in 142ms
30 silly pacote version manifest for core-js@1.2.7 fetched in 143ms
31 silly pacote version manifest for encoding@0.1.12 fetched in 143ms
32 silly pacote version manifest for fbjs@0.8.14 fetched in 146ms
33 silly pacote version manifest for iconv-lite@0.4.18 fetched in 146ms
34 silly pacote version manifest for is-stream@1.1.0 fetched in 146ms
35 silly pacote version manifest for isomorphic-fetch@2.2.1 fetched in 150ms
36 silly pacote version manifest for js-tokens@3.0.2 fetched in 151ms
37 http fetch GET 200 https://registry.npmjs.org/loose-envify 60ms (from cache)
38 silly fetchPackageMetaData error for react@15.6.1 request to https://registry.npmjs.org/react failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
39 silly pacote range manifest for fbjs@^0.8.9 fetched in 16ms
40 silly pacote version manifest for loose-envify@1.3.1 fetched in 94ms
41 silly pacote range manifest for loose-envify@^1.3.1 fetched in 30ms
42 http fetch GET 200 https://registry.npmjs.org/node-fetch 79ms (from cache)
43 silly pacote range manifest for iconv-lite@~0.4.13 fetched in 16ms
44 http fetch GET 200 https://registry.npmjs.org/object-assign 70ms (from cache)
45 http fetch GET 200 https://registry.npmjs.org/promise 69ms (from cache)
46 http fetch GET 200 https://registry.npmjs.org/prop-types 69ms (from cache)
47 http fetch GET 200 https://registry.npmjs.org/setimmediate 67ms (from cache)
48 http fetch GET 200 https://registry.npmjs.org/ua-parser-js 66ms (from cache)
49 silly pacote range manifest for core-js@^1.0.0 fetched in 20ms
50 http fetch GET 200 https://registry.npmjs.org/whatwg-fetch 70ms (from cache)
51 silly pacote range manifest for isomorphic-fetch@^2.1.1 fetched in 10ms
52 silly pacote version manifest for node-fetch@1.7.2 fetched in 93ms
53 silly pacote version manifest for object-assign@4.1.1 fetched in 86ms
54 silly pacote version manifest for promise@7.3.1 fetched in 85ms
55 silly pacote version manifest for prop-types@15.5.10 fetched in 86ms
56 silly pacote version manifest for setimmediate@1.0.5 fetched in 85ms
57 silly pacote version manifest for ua-parser-js@0.7.14 fetched in 84ms
58 http fetch GET 200 https://registry.npmjs.org/object-assign 51ms (from cache)
59 silly pacote range manifest for loose-envify@^1.0.0 fetched in 20ms
60 silly pacote version manifest for whatwg-fetch@2.0.3 fetched in 91ms
61 silly pacote range manifest for object-assign@^4.1.0 fetched in 17ms
62 silly pacote range manifest for promise@^7.1.1 fetched in 17ms
63 silly pacote range manifest for setimmediate@^1.0.5 fetched in 9ms
64 silly pacote range manifest for ua-parser-js@^0.7.9 fetched in 9ms
65 silly pacote range manifest for node-fetch@^1.0.1 fetched in 10ms
66 silly pacote range manifest for whatwg-fetch@>=0.10.0 fetched in 10ms
67 silly pacote range manifest for js-tokens@^3.0.0 fetched in 11ms
68 silly pacote range manifest for object-assign@^4.1.1 fetched in 62ms
69 silly pacote range manifest for encoding@^0.1.11 fetched in 8ms
70 silly pacote range manifest for is-stream@^1.0.1 fetched in 7ms
71 silly pacote range manifest for asap@~2.0.3 fetched in 8ms
72 silly pacote version manifest for asap@2.0.6 fetched in 8ms
73 silly resolveWithNewModule asap@2.0.6 checking installable status
74 silly pacote version manifest for core-js@1.2.7 fetched in 12ms
75 silly resolveWithNewModule core-js@1.2.7 checking installable status
76 silly pacote version manifest for create-react-class@15.6.0 fetched in 16ms
77 silly resolveWithNewModule create-react-class@15.6.0 checking installable status
78 silly pacote version manifest for encoding@0.1.12 fetched in 18ms
79 silly resolveWithNewModule encoding@0.1.12 checking installable status
80 silly pacote version manifest for fbjs@0.8.14 fetched in 20ms
81 silly resolveWithNewModule fbjs@0.8.14 checking installable status
82 silly pacote version manifest for iconv-lite@0.4.18 fetched in 22ms
83 silly resolveWithNewModule iconv-lite@0.4.18 checking installable status
84 silly pacote version manifest for is-stream@1.1.0 fetched in 24ms
85 silly resolveWithNewModule is-stream@1.1.0 checking installable status
86 silly pacote version manifest for isomorphic-fetch@2.2.1 fetched in 26ms
87 silly resolveWithNewModule isomorphic-fetch@2.2.1 checking installable status
88 silly pacote version manifest for js-tokens@3.0.2 fetched in 31ms
89 silly resolveWithNewModule js-tokens@3.0.2 checking installable status
90 silly fetchPackageMetaData error for angular@1.6.5 request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
91 silly fetchPackageMetaData error for lodash@4.17.4 request to https://registry.npmjs.org/lodash failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
92 silly fetchPackageMetaData error for lodash.assign@4.2.0 request to https://registry.npmjs.org/lodash.assign failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
93 silly fetchPackageMetaData error for react@15.6.1 request to https://registry.npmjs.org/react failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
94 silly pacote version manifest for loose-envify@1.3.1 fetched in 12ms
95 silly resolveWithNewModule loose-envify@1.3.1 checking installable status
96 silly pacote version manifest for node-fetch@1.7.2 fetched in 14ms
97 silly resolveWithNewModule node-fetch@1.7.2 checking installable status
98 silly pacote version manifest for object-assign@4.1.1 fetched in 14ms
99 silly resolveWithNewModule object-assign@4.1.1 checking installable status
100 silly pacote version manifest for promise@7.3.1 fetched in 15ms
101 silly resolveWithNewModule promise@7.3.1 checking installable status
102 silly pacote version manifest for prop-types@15.5.10 fetched in 16ms
103 silly resolveWithNewModule prop-types@15.5.10 checking installable status
104 silly pacote version manifest for ua-parser-js@0.7.14 fetched in 12ms
105 silly resolveWithNewModule ua-parser-js@0.7.14 checking installable status
106 silly pacote version manifest for setimmediate@1.0.5 fetched in 14ms
107 silly resolveWithNewModule setimmediate@1.0.5 checking installable status
108 silly pacote version manifest for whatwg-fetch@2.0.3 fetched in 13ms
109 silly resolveWithNewModule whatwg-fetch@2.0.3 checking installable status
110 verbose type system
111 verbose stack FetchError: request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
111 verbose stack     at ClientRequest.<anonymous> (/Users/foldleft/.nvm/versions/node/v4.8.4/lib/node_modules/npm/node_modules/pacote/node_modules/make-fetch-happen/node_modules/node-fetch-npm/src/index.js:68:14)
111 verbose stack     at emitOne (events.js:77:13)
111 verbose stack     at ClientRequest.emit (events.js:169:7)
111 verbose stack     at TLSSocket.socketErrorListener (_http_client.js:269:9)
111 verbose stack     at emitOne (events.js:77:13)
111 verbose stack     at TLSSocket.emit (events.js:169:7)
111 verbose stack     at connectErrorNT (net.js:1016:8)
111 verbose stack     at nextTickCallbackWith2Args (node.js:511:9)
111 verbose stack     at process._tickCallback (node.js:425:17)
112 verbose cwd /Users/foldleft/Development/temp
113 verbose Darwin 16.7.0
114 verbose argv "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/node" "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/npm" "i" "--loglevel" "silly"
115 verbose node v4.8.4
116 verbose npm  v5.3.0
117 error code ENOTFOUND
118 error errno ENOTFOUND
119 error network request to https://registry.npmjs.org/angular failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
120 error network This is a problem related to network connectivity.
120 error network In most cases you are behind a proxy or have bad network settings.
120 error network
120 error network If you are behind a proxy, please make sure that the
120 error network 'proxy' config is set properly.  See: 'npm help config'
121 verbose exit [ 1, true ]
```
