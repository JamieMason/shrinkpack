> This branch is looking to determine the correct npm-shrinkwrap.json (or package-lock.json)
> structure to support offline installs of npm projects using shrinkpack

Run the following with an empty npm/cacache cache while offline.

```
$ npm i --loglevel silly
```

**This version works, but notice how package.json has had to change**

And the following will be displayed in npm 5.3.0.

```
npm info it worked if it ends with ok
npm verb cli [ '/Users/foldleft/.nvm/versions/node/v4.8.4/bin/node',
npm verb cli   '/Users/foldleft/.nvm/versions/node/v4.8.4/bin/npm',
npm verb cli   'i',
npm verb cli   '--loglevel',
npm verb cli   'silly' ]
npm info using npm@5.3.0
npm info using node@v4.8.4
npm verb npm-session 4998101b09ab57e2
npm sill install runPreinstallTopLevelLifecycles
npm sill preinstall temp@0.0.0
npm info lifecycle temp@0.0.0~preinstall: temp@0.0.0
npm sill install loadCurrentTree
npm sill install readLocalPackageData
npm sill install loadIdealTree
npm sill install cloneCurrentTreeToIdealTree
npm sill install loadShrinkwrap
npm sill install loadAllDepsIntoIdealTree
npm sill currentTree temp@0.0.0
npm sill idealTree temp@0.0.0
npm sill idealTree ├── angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill idealTree ├── asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill idealTree ├── core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill idealTree ├── create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill idealTree ├── encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill idealTree ├── fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill idealTree ├── iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill idealTree ├── is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill idealTree ├── isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill idealTree ├── js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill idealTree ├── lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill idealTree ├── lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill idealTree ├── loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill idealTree ├── node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill idealTree ├── object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill idealTree ├── promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill idealTree ├── prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill idealTree ├── react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill idealTree ├── setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill idealTree ├── ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill idealTree └── whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill install generateActionsToTake
npm sill diffTrees action count 21
npm sill diffTrees add asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill diffTrees add core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill diffTrees add iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill diffTrees add encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill diffTrees add is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill diffTrees add js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill diffTrees add loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill diffTrees add node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill diffTrees add object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill diffTrees add promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill diffTrees add setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill diffTrees add ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill diffTrees add whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill diffTrees add isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill diffTrees add fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill diffTrees add create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill diffTrees add prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill diffTrees add angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill diffTrees add lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill diffTrees add lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill diffTrees add react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions action count 168
npm sill decomposeActions fetch asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions extract asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions preinstall asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions build asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions install asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions postinstall asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions finalize asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions refresh-package-json asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill decomposeActions fetch core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions extract core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions preinstall core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions build core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions install core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions postinstall core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions finalize core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions refresh-package-json core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill decomposeActions fetch iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions extract iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions preinstall iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions build iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions install iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions postinstall iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions finalize iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions refresh-package-json iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill decomposeActions fetch encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions extract encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions preinstall encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions build encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions install encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions postinstall encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions finalize encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions refresh-package-json encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill decomposeActions fetch is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions extract is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions preinstall is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions build is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions install is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions postinstall is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions finalize is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions refresh-package-json is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill decomposeActions fetch js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions extract js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions preinstall js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions build js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions install js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions postinstall js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions finalize js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions refresh-package-json js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill decomposeActions fetch loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions extract loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions preinstall loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions build loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions install loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions postinstall loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions finalize loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions refresh-package-json loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill decomposeActions fetch node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions extract node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions preinstall node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions build node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions install node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions postinstall node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions finalize node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions refresh-package-json node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill decomposeActions fetch object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions extract object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions preinstall object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions build object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions install object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions postinstall object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions finalize object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions refresh-package-json object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill decomposeActions fetch promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions extract promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions preinstall promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions build promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions install promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions postinstall promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions finalize promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions refresh-package-json promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill decomposeActions fetch setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions extract setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions preinstall setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions build setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions install setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions postinstall setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions finalize setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions refresh-package-json setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill decomposeActions fetch ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions extract ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions preinstall ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions build ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions install ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions postinstall ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions finalize ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions refresh-package-json ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill decomposeActions fetch whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions extract whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions preinstall whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions build whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions install whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions postinstall whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions finalize whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions refresh-package-json whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill decomposeActions fetch isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions extract isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions preinstall isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions build isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions install isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions postinstall isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions finalize isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions refresh-package-json isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill decomposeActions fetch fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions extract fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions preinstall fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions build fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions install fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions postinstall fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions finalize fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions refresh-package-json fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill decomposeActions fetch create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions extract create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions preinstall create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions build create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions install create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions postinstall create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions finalize create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions refresh-package-json create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill decomposeActions fetch prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions extract prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions preinstall prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions build prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions install prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions postinstall prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions finalize prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions refresh-package-json prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill decomposeActions fetch angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions extract angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions preinstall angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions build angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions install angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions postinstall angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions finalize angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions refresh-package-json angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill decomposeActions fetch lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions extract lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions preinstall lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions build lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions install lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions postinstall lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions finalize lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions refresh-package-json lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill decomposeActions fetch lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions extract lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions preinstall lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions build lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions install lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions postinstall lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions finalize lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions refresh-package-json lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill decomposeActions fetch react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions extract react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions preinstall react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions build react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions install react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions postinstall react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions finalize react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill decomposeActions refresh-package-json react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill install executeActions
npm sill doSerial global-install 168
npm verb correctMkdir /Users/foldleft/.npm/_locks correctMkdir not in flight; initializing
npm verb lock using /Users/foldleft/.npm/_locks/staging-83ae9e2248074bd1.lock for /Users/foldleft/Development/temp/node_modules/.staging
npm sill doParallel extract 168
npm sill extract asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill pacote trying asap@file:node_shrinkwrap/asap-2.0.6.tgz by hash: sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY=
npm sill extract core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill pacote trying core-js@file:node_shrinkwrap/core-js-1.2.7.tgz by hash: sha1-ZSKUwUZR2yj6k70tX/KYOk8IxjY=
npm sill extract iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill pacote trying iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz by hash: sha1-I9hlaxaq5nQqwpcy6o8DNqR4nPI=
npm sill extract encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill pacote trying encoding@file:node_shrinkwrap/encoding-0.1.12.tgz by hash: sha1-U4tm8+5izRq1HsMjgp0flIDHS+s=
npm sill extract is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill pacote trying is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz by hash: sha1-EtSj3U5o4Lec6428hBc66A2RykQ=
npm sill extract js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill pacote trying js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz by hash: sha1-mGbfOVECEw449/mWvOtlRDIJwls=
npm sill extract loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill pacote trying loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz by hash: sha1-0aitM/qc4OcT1l/dCsi3SNR4yEg=
npm sill extract node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill pacote trying node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz by hash: sha1-xU6arFfkModSM1JfPIkcQVn/79c=
npm sill extract object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill pacote trying object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz by hash: sha1-IQmtx5ZYh8/AXLvUQsrIv7s2CGM=
npm sill extract promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill pacote trying promise@file:node_shrinkwrap/promise-7.3.1.tgz by hash: sha1-BktyYCsY+Q8pGSuLG8QY/9Hr078=
npm sill extract setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill pacote trying setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz by hash: sha1-KQy7Iy4waULX1+qbg3Mqt4VvgoU=
npm sill extract ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill pacote trying ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz by hash: sha1-EQ1T+kw/MmwSEpK76skE0uAzh8o=
npm sill extract whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill pacote trying whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz by hash: sha1-nITsLc9oGH/wC8ZOEnS0QhduHIQ=
npm sill extract isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill pacote trying isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz by hash: sha1-YRrhrPFPXoH3KVB0coGf6XM1WKk=
npm sill extract fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill pacote trying fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz by hash: sha1-0dviviVMNakeCfMfnNUKQLKg7Rw=
npm sill extract create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill pacote trying create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz by hash: sha1-q0SEl8JlZuHilBPogyB9V8/nvtQ=
npm sill extract prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill pacote trying prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz by hash: sha1-J5ffwxJhguOpXj37suiT3ddFYVQ=
npm sill extract angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill pacote trying angular@file:node_shrinkwrap/angular-1.6.5.tgz by hash: sha1-N/eI7r7Fzi4/oCsXu8sqIxV2oNY=
npm sill extract lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill pacote trying lodash@file:node_shrinkwrap/lodash-4.17.4.tgz by hash: sha1-eCA6TRwyiuHYbcpkYONptX9AVa4=
npm sill extract lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill pacote trying lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz by hash: sha1-DZnzzNem0mHRm9rrkkUAXShYCOc=
npm sill extract react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill pacote trying react@file:node_shrinkwrap/react-15.6.1.tgz by hash: sha1-uqhDTsZ4C96ZfNw4C3nNM7ljk98=
npm sill pacote data for sha1-I9hlaxaq5nQqwpcy6o8DNqR4nPI= not present. Using manifest.
npm sill pacote data for sha1-xU6arFfkModSM1JfPIkcQVn/79c= not present. Using manifest.
npm sill pacote data for sha1-BktyYCsY+Q8pGSuLG8QY/9Hr078= not present. Using manifest.
npm sill pacote data for sha1-N/eI7r7Fzi4/oCsXu8sqIxV2oNY= not present. Using manifest.
npm sill pacote data for sha1-eCA6TRwyiuHYbcpkYONptX9AVa4= not present. Using manifest.
npm sill pacote data for sha1-DZnzzNem0mHRm9rrkkUAXShYCOc= not present. Using manifest.
npm sill pacote data for sha1-uqhDTsZ4C96ZfNw4C3nNM7ljk98= not present. Using manifest.
npm sill pacote setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/setimmediate-4e5987a4 by content address 136ms
npm sill pacote lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz extracted in 142ms
npm sill pacote is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/is-stream-50423150 by content address 164ms
npm sill pacote object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/object-assign-1a931be7 by content address 161ms
npm sill pacote whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/whatwg-fetch-b8fd101d by content address 157ms
npm sill pacote js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/js-tokens-5b048392 by content address 183ms
npm sill pacote encoding@file:node_shrinkwrap/encoding-0.1.12.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/encoding-86666d1b by content address 223ms
npm sill pacote asap@file:node_shrinkwrap/asap-2.0.6.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/asap-e4819212 by content address 238ms
npm sill pacote create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/create-react-class-0a6f39ac by content address 219ms
npm sill pacote loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/loose-envify-846dab12 by content address 238ms
npm sill pacote isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/isomorphic-fetch-84f86f65 by content address 249ms
npm sill pacote prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/prop-types-e4404fe3 by content address 255ms
npm sill pacote ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/ua-parser-js-1565393c by content address 292ms
npm sill pacote node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz extracted in 299ms
npm sill pacote angular@file:node_shrinkwrap/angular-1.6.5.tgz extracted in 322ms
npm sill pacote iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz extracted in 351ms
npm sill pacote promise@file:node_shrinkwrap/promise-7.3.1.tgz extracted in 382ms
npm sill pacote react@file:node_shrinkwrap/react-15.6.1.tgz extracted in 417ms
npm sill pacote fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/fbjs-053b792c by content address 648ms
npm sill pacote core-js@file:node_shrinkwrap/core-js-1.2.7.tgz extracted to /Users/foldleft/Development/temp/node_modules/.staging/core-js-db9782f7 by content address 1198ms
npm sill pacote lodash@file:node_shrinkwrap/lodash-4.17.4.tgz extracted in 1264ms
npm sill doReverseSerial unbuild 168
npm sill doSerial remove 168
npm sill doSerial move 168
npm sill doSerial finalize 168
npm sill finalize /Users/foldleft/Development/temp/node_modules/asap
npm sill finalize /Users/foldleft/Development/temp/node_modules/core-js
npm sill finalize /Users/foldleft/Development/temp/node_modules/iconv-lite
npm sill finalize /Users/foldleft/Development/temp/node_modules/encoding
npm sill finalize /Users/foldleft/Development/temp/node_modules/is-stream
npm sill finalize /Users/foldleft/Development/temp/node_modules/js-tokens
npm sill finalize /Users/foldleft/Development/temp/node_modules/loose-envify
npm sill finalize /Users/foldleft/Development/temp/node_modules/node-fetch
npm sill finalize /Users/foldleft/Development/temp/node_modules/object-assign
npm sill finalize /Users/foldleft/Development/temp/node_modules/promise
npm sill finalize /Users/foldleft/Development/temp/node_modules/setimmediate
npm sill finalize /Users/foldleft/Development/temp/node_modules/ua-parser-js
npm sill finalize /Users/foldleft/Development/temp/node_modules/whatwg-fetch
npm sill finalize /Users/foldleft/Development/temp/node_modules/isomorphic-fetch
npm sill finalize /Users/foldleft/Development/temp/node_modules/fbjs
npm sill finalize /Users/foldleft/Development/temp/node_modules/create-react-class
npm sill finalize /Users/foldleft/Development/temp/node_modules/prop-types
npm sill finalize /Users/foldleft/Development/temp/node_modules/angular
npm sill finalize /Users/foldleft/Development/temp/node_modules/lodash
npm sill finalize /Users/foldleft/Development/temp/node_modules/lodash.assign
npm sill finalize /Users/foldleft/Development/temp/node_modules/react
npm sill doParallel refresh-package-json 168
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/asap
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/core-js
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/iconv-lite
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/encoding
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/is-stream
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/js-tokens
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/loose-envify
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/node-fetch
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/object-assign
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/promise
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/setimmediate
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/ua-parser-js
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/whatwg-fetch
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/isomorphic-fetch
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/fbjs
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/create-react-class
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/prop-types
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/angular
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/lodash
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/lodash.assign
npm sill refresh-package-json /Users/foldleft/Development/temp/node_modules/react
npm sill doParallel preinstall 168
npm sill preinstall asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm info lifecycle asap@file:node_shrinkwrap/asap-2.0.6.tgz~preinstall: asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill preinstall core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm info lifecycle core-js@file:node_shrinkwrap/core-js-1.2.7.tgz~preinstall: core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill preinstall iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm info lifecycle iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz~preinstall: iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill preinstall encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm info lifecycle encoding@file:node_shrinkwrap/encoding-0.1.12.tgz~preinstall: encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill preinstall is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm info lifecycle is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz~preinstall: is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill preinstall js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm info lifecycle js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz~preinstall: js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill preinstall loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm info lifecycle loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz~preinstall: loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill preinstall node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm info lifecycle node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz~preinstall: node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill preinstall object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm info lifecycle object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz~preinstall: object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill preinstall promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm info lifecycle promise@file:node_shrinkwrap/promise-7.3.1.tgz~preinstall: promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill preinstall setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm info lifecycle setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz~preinstall: setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill preinstall ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm info lifecycle ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz~preinstall: ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill preinstall whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm info lifecycle whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz~preinstall: whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill preinstall isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm info lifecycle isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz~preinstall: isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill preinstall fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm info lifecycle fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz~preinstall: fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill preinstall create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm info lifecycle create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz~preinstall: create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill preinstall prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm info lifecycle prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz~preinstall: prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill preinstall angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm info lifecycle angular@file:node_shrinkwrap/angular-1.6.5.tgz~preinstall: angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill preinstall lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm info lifecycle lodash@file:node_shrinkwrap/lodash-4.17.4.tgz~preinstall: lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill preinstall lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm info lifecycle lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz~preinstall: lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill preinstall react@file:node_shrinkwrap/react-15.6.1.tgz
npm info lifecycle react@file:node_shrinkwrap/react-15.6.1.tgz~preinstall: react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill doSerial build 168
npm sill build asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm info linkStuff asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill linkStuff asap@file:node_shrinkwrap/asap-2.0.6.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm verb linkMans asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill build core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm info linkStuff core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill linkStuff core-js@file:node_shrinkwrap/core-js-1.2.7.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm verb linkMans core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill build iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm info linkStuff iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill linkStuff iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm verb linkMans iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill build encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm info linkStuff encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill linkStuff encoding@file:node_shrinkwrap/encoding-0.1.12.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm verb linkMans encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill build is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm info linkStuff is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill linkStuff is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm verb linkMans is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill build js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm info linkStuff js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill linkStuff js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm verb linkMans js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill build loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm info linkStuff loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill linkStuff loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm verb linkBins [ { 'loose-envify': 'cli.js' },
npm verb linkBins   '/Users/foldleft/Development/temp/node_modules/.bin',
npm verb linkBins   false ]
npm verb linkMans loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill build node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm info linkStuff node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill linkStuff node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm verb linkMans node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill build object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm info linkStuff object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill linkStuff object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm verb linkMans object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill build promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm info linkStuff promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill linkStuff promise@file:node_shrinkwrap/promise-7.3.1.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm verb linkMans promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill build setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm info linkStuff setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill linkStuff setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm verb linkMans setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill build ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm info linkStuff ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill linkStuff ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm verb linkMans ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill build whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm info linkStuff whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill linkStuff whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm verb linkMans whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill build isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm info linkStuff isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill linkStuff isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm verb linkMans isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill build fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm info linkStuff fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill linkStuff fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm verb linkMans fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill build create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm info linkStuff create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill linkStuff create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm verb linkMans create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill build prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm info linkStuff prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill linkStuff prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm verb linkMans prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill build angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm info linkStuff angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill linkStuff angular@file:node_shrinkwrap/angular-1.6.5.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm verb linkMans angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill build lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm info linkStuff lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill linkStuff lodash@file:node_shrinkwrap/lodash-4.17.4.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm verb linkMans lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill build lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm info linkStuff lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill linkStuff lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm verb linkMans lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill build react@file:node_shrinkwrap/react-15.6.1.tgz
npm info linkStuff react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill linkStuff react@file:node_shrinkwrap/react-15.6.1.tgz has /Users/foldleft/Development/temp/node_modules as its parent node_modules
npm verb linkBins react@file:node_shrinkwrap/react-15.6.1.tgz
npm verb linkMans react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill doSerial global-link 168
npm sill doParallel update-linked 168
npm sill doSerial install 168
npm sill install asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm info lifecycle asap@file:node_shrinkwrap/asap-2.0.6.tgz~install: asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill install core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm info lifecycle core-js@file:node_shrinkwrap/core-js-1.2.7.tgz~install: core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill install iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm info lifecycle iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz~install: iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill install encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm info lifecycle encoding@file:node_shrinkwrap/encoding-0.1.12.tgz~install: encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill install is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm info lifecycle is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz~install: is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill install js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm info lifecycle js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz~install: js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill install loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm info lifecycle loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz~install: loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill install node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm info lifecycle node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz~install: node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill install object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm info lifecycle object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz~install: object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill install promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm info lifecycle promise@file:node_shrinkwrap/promise-7.3.1.tgz~install: promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill install setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm info lifecycle setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz~install: setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill install ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm info lifecycle ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz~install: ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill install whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm info lifecycle whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz~install: whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill install isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm info lifecycle isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz~install: isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill install fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm info lifecycle fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz~install: fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill install create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm info lifecycle create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz~install: create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill install prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm info lifecycle prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz~install: prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill install angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm info lifecycle angular@file:node_shrinkwrap/angular-1.6.5.tgz~install: angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill install lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm info lifecycle lodash@file:node_shrinkwrap/lodash-4.17.4.tgz~install: lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill install lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm info lifecycle lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz~install: lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill install react@file:node_shrinkwrap/react-15.6.1.tgz
npm info lifecycle react@file:node_shrinkwrap/react-15.6.1.tgz~install: react@file:node_shrinkwrap/react-15.6.1.tgz
npm sill doSerial postinstall 168
npm sill postinstall asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm info lifecycle asap@file:node_shrinkwrap/asap-2.0.6.tgz~postinstall: asap@file:node_shrinkwrap/asap-2.0.6.tgz
npm sill postinstall core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm info lifecycle core-js@file:node_shrinkwrap/core-js-1.2.7.tgz~postinstall: core-js@file:node_shrinkwrap/core-js-1.2.7.tgz
npm sill postinstall iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm info lifecycle iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz~postinstall: iconv-lite@file:node_shrinkwrap/iconv-lite-0.4.18.tgz
npm sill postinstall encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm info lifecycle encoding@file:node_shrinkwrap/encoding-0.1.12.tgz~postinstall: encoding@file:node_shrinkwrap/encoding-0.1.12.tgz
npm sill postinstall is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm info lifecycle is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz~postinstall: is-stream@file:node_shrinkwrap/is-stream-1.1.0.tgz
npm sill postinstall js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm info lifecycle js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz~postinstall: js-tokens@file:node_shrinkwrap/js-tokens-3.0.2.tgz
npm sill postinstall loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm info lifecycle loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz~postinstall: loose-envify@file:node_shrinkwrap/loose-envify-1.3.1.tgz
npm sill postinstall node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm info lifecycle node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz~postinstall: node-fetch@file:node_shrinkwrap/node-fetch-1.7.2.tgz
npm sill postinstall object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm info lifecycle object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz~postinstall: object-assign@file:node_shrinkwrap/object-assign-4.1.1.tgz
npm sill postinstall promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm info lifecycle promise@file:node_shrinkwrap/promise-7.3.1.tgz~postinstall: promise@file:node_shrinkwrap/promise-7.3.1.tgz
npm sill postinstall setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm info lifecycle setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz~postinstall: setimmediate@file:node_shrinkwrap/setimmediate-1.0.5.tgz
npm sill postinstall ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm info lifecycle ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz~postinstall: ua-parser-js@file:node_shrinkwrap/ua-parser-js-0.7.14.tgz
npm sill postinstall whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm info lifecycle whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz~postinstall: whatwg-fetch@file:node_shrinkwrap/whatwg-fetch-2.0.3.tgz
npm sill postinstall isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm info lifecycle isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz~postinstall: isomorphic-fetch@file:node_shrinkwrap/isomorphic-fetch-2.2.1.tgz
npm sill postinstall fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm info lifecycle fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz~postinstall: fbjs@file:node_shrinkwrap/fbjs-0.8.14.tgz
npm sill postinstall create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm info lifecycle create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz~postinstall: create-react-class@file:node_shrinkwrap/create-react-class-15.6.0.tgz
npm sill postinstall prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm info lifecycle prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz~postinstall: prop-types@file:node_shrinkwrap/prop-types-15.5.10.tgz
npm sill postinstall angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm info lifecycle angular@file:node_shrinkwrap/angular-1.6.5.tgz~postinstall: angular@file:node_shrinkwrap/angular-1.6.5.tgz
npm sill postinstall lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm info lifecycle lodash@file:node_shrinkwrap/lodash-4.17.4.tgz~postinstall: lodash@file:node_shrinkwrap/lodash-4.17.4.tgz
npm sill postinstall lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm info lifecycle lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz~postinstall: lodash.assign@file:node_shrinkwrap/lodash.assign-4.2.0.tgz
npm sill postinstall react@file:node_shrinkwrap/react-15.6.1.tgz
npm info lifecycle react@file:node_shrinkwrap/react-15.6.1.tgz~postinstall: react@file:node_shrinkwrap/react-15.6.1.tgz
npm verb unlock done using /Users/foldleft/.npm/_locks/staging-83ae9e2248074bd1.lock for /Users/foldleft/Development/temp/node_modules/.staging
npm sill install runPostinstallTopLevelLifecycles
npm sill build temp@0.0.0
npm info linkStuff temp@0.0.0
npm sill linkStuff temp@0.0.0 has /Users/foldleft/Development as its parent node_modules
npm verb linkBins temp@0.0.0
npm verb linkMans temp@0.0.0
npm sill install temp@0.0.0
npm info lifecycle temp@0.0.0~install: temp@0.0.0
npm sill postinstall temp@0.0.0
npm info lifecycle temp@0.0.0~postinstall: temp@0.0.0
npm sill prepublish temp@0.0.0
npm info lifecycle temp@0.0.0~prepublish: temp@0.0.0
npm info lifecycle temp@0.0.0~prepare: temp@0.0.0
npm sill install saveToDependencies
npm verb saving []
npm verb shrinkwrap skipping write for package.json because there were no changes.
npm info lifecycle undefined~preshrinkwrap: undefined
npm info lifecycle undefined~shrinkwrap: undefined
npm verb shrinkwrap skipping write for package-lock.json because there were no changes.
npm info lifecycle undefined~postshrinkwrap: undefined
npm WARN temp@0.0.0 No description
npm WARN temp@0.0.0 No repository field.

npm sill install printInstalled
added 21 packages in 1.953s
npm verb exit [ 0, true ]
npm info ok
```
