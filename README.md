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
4 verbose npm-session f99f638f379bb34b
5 silly install runPreinstallTopLevelLifecycles
6 silly preinstall temp@0.0.0
7 info lifecycle temp@0.0.0~preinstall: temp@0.0.0
8 silly install loadCurrentTree
9 silly install readLocalPackageData
10 silly install loadIdealTree
11 silly install cloneCurrentTreeToIdealTree
12 silly install loadShrinkwrap
13 silly install loadAllDepsIntoIdealTree
14 silly currentTree temp@0.0.0
15 silly idealTree temp@0.0.0
15 silly idealTree ├── angular@1.6.5
15 silly idealTree ├── asap@2.0.6
15 silly idealTree ├── core-js@1.2.7
15 silly idealTree ├── create-react-class@15.6.0
15 silly idealTree ├── encoding@0.1.12
15 silly idealTree ├── fbjs@0.8.14
15 silly idealTree ├── iconv-lite@0.4.18
15 silly idealTree ├── is-stream@1.1.0
15 silly idealTree ├── isomorphic-fetch@2.2.1
15 silly idealTree ├── js-tokens@3.0.2
15 silly idealTree ├── lodash.assign@4.2.0
15 silly idealTree ├── lodash@4.17.4
15 silly idealTree ├── loose-envify@1.3.1
15 silly idealTree ├── node-fetch@1.7.2
15 silly idealTree ├── object-assign@4.1.1
15 silly idealTree ├── promise@7.3.1
15 silly idealTree ├── prop-types@15.5.10
15 silly idealTree ├── react@15.6.1
15 silly idealTree ├── setimmediate@1.0.5
15 silly idealTree ├── ua-parser-js@0.7.14
15 silly idealTree └── whatwg-fetch@2.0.3
16 silly install generateActionsToTake
17 silly diffTrees action count 21
18 silly diffTrees add asap@2.0.6
19 silly diffTrees add core-js@1.2.7
20 silly diffTrees add iconv-lite@0.4.18
21 silly diffTrees add encoding@0.1.12
22 silly diffTrees add is-stream@1.1.0
23 silly diffTrees add js-tokens@3.0.2
24 silly diffTrees add loose-envify@1.3.1
25 silly diffTrees add node-fetch@1.7.2
26 silly diffTrees add object-assign@4.1.1
27 silly diffTrees add promise@7.3.1
28 silly diffTrees add setimmediate@1.0.5
29 silly diffTrees add ua-parser-js@0.7.14
30 silly diffTrees add whatwg-fetch@2.0.3
31 silly diffTrees add isomorphic-fetch@2.2.1
32 silly diffTrees add fbjs@0.8.14
33 silly diffTrees add create-react-class@15.6.0
34 silly diffTrees add prop-types@15.5.10
35 silly diffTrees add angular@1.6.5
36 silly diffTrees add lodash@4.17.4
37 silly diffTrees add lodash.assign@4.2.0
38 silly diffTrees add react@15.6.1
39 silly decomposeActions action count 168
40 silly decomposeActions fetch asap@2.0.6
41 silly decomposeActions extract asap@2.0.6
42 silly decomposeActions preinstall asap@2.0.6
43 silly decomposeActions build asap@2.0.6
44 silly decomposeActions install asap@2.0.6
45 silly decomposeActions postinstall asap@2.0.6
46 silly decomposeActions finalize asap@2.0.6
47 silly decomposeActions refresh-package-json asap@2.0.6
48 silly decomposeActions fetch core-js@1.2.7
49 silly decomposeActions extract core-js@1.2.7
50 silly decomposeActions preinstall core-js@1.2.7
51 silly decomposeActions build core-js@1.2.7
52 silly decomposeActions install core-js@1.2.7
53 silly decomposeActions postinstall core-js@1.2.7
54 silly decomposeActions finalize core-js@1.2.7
55 silly decomposeActions refresh-package-json core-js@1.2.7
56 silly decomposeActions fetch iconv-lite@0.4.18
57 silly decomposeActions extract iconv-lite@0.4.18
58 silly decomposeActions preinstall iconv-lite@0.4.18
59 silly decomposeActions build iconv-lite@0.4.18
60 silly decomposeActions install iconv-lite@0.4.18
61 silly decomposeActions postinstall iconv-lite@0.4.18
62 silly decomposeActions finalize iconv-lite@0.4.18
63 silly decomposeActions refresh-package-json iconv-lite@0.4.18
64 silly decomposeActions fetch encoding@0.1.12
65 silly decomposeActions extract encoding@0.1.12
66 silly decomposeActions preinstall encoding@0.1.12
67 silly decomposeActions build encoding@0.1.12
68 silly decomposeActions install encoding@0.1.12
69 silly decomposeActions postinstall encoding@0.1.12
70 silly decomposeActions finalize encoding@0.1.12
71 silly decomposeActions refresh-package-json encoding@0.1.12
72 silly decomposeActions fetch is-stream@1.1.0
73 silly decomposeActions extract is-stream@1.1.0
74 silly decomposeActions preinstall is-stream@1.1.0
75 silly decomposeActions build is-stream@1.1.0
76 silly decomposeActions install is-stream@1.1.0
77 silly decomposeActions postinstall is-stream@1.1.0
78 silly decomposeActions finalize is-stream@1.1.0
79 silly decomposeActions refresh-package-json is-stream@1.1.0
80 silly decomposeActions fetch js-tokens@3.0.2
81 silly decomposeActions extract js-tokens@3.0.2
82 silly decomposeActions preinstall js-tokens@3.0.2
83 silly decomposeActions build js-tokens@3.0.2
84 silly decomposeActions install js-tokens@3.0.2
85 silly decomposeActions postinstall js-tokens@3.0.2
86 silly decomposeActions finalize js-tokens@3.0.2
87 silly decomposeActions refresh-package-json js-tokens@3.0.2
88 silly decomposeActions fetch loose-envify@1.3.1
89 silly decomposeActions extract loose-envify@1.3.1
90 silly decomposeActions preinstall loose-envify@1.3.1
91 silly decomposeActions build loose-envify@1.3.1
92 silly decomposeActions install loose-envify@1.3.1
93 silly decomposeActions postinstall loose-envify@1.3.1
94 silly decomposeActions finalize loose-envify@1.3.1
95 silly decomposeActions refresh-package-json loose-envify@1.3.1
96 silly decomposeActions fetch node-fetch@1.7.2
97 silly decomposeActions extract node-fetch@1.7.2
98 silly decomposeActions preinstall node-fetch@1.7.2
99 silly decomposeActions build node-fetch@1.7.2
100 silly decomposeActions install node-fetch@1.7.2
101 silly decomposeActions postinstall node-fetch@1.7.2
102 silly decomposeActions finalize node-fetch@1.7.2
103 silly decomposeActions refresh-package-json node-fetch@1.7.2
104 silly decomposeActions fetch object-assign@4.1.1
105 silly decomposeActions extract object-assign@4.1.1
106 silly decomposeActions preinstall object-assign@4.1.1
107 silly decomposeActions build object-assign@4.1.1
108 silly decomposeActions install object-assign@4.1.1
109 silly decomposeActions postinstall object-assign@4.1.1
110 silly decomposeActions finalize object-assign@4.1.1
111 silly decomposeActions refresh-package-json object-assign@4.1.1
112 silly decomposeActions fetch promise@7.3.1
113 silly decomposeActions extract promise@7.3.1
114 silly decomposeActions preinstall promise@7.3.1
115 silly decomposeActions build promise@7.3.1
116 silly decomposeActions install promise@7.3.1
117 silly decomposeActions postinstall promise@7.3.1
118 silly decomposeActions finalize promise@7.3.1
119 silly decomposeActions refresh-package-json promise@7.3.1
120 silly decomposeActions fetch setimmediate@1.0.5
121 silly decomposeActions extract setimmediate@1.0.5
122 silly decomposeActions preinstall setimmediate@1.0.5
123 silly decomposeActions build setimmediate@1.0.5
124 silly decomposeActions install setimmediate@1.0.5
125 silly decomposeActions postinstall setimmediate@1.0.5
126 silly decomposeActions finalize setimmediate@1.0.5
127 silly decomposeActions refresh-package-json setimmediate@1.0.5
128 silly decomposeActions fetch ua-parser-js@0.7.14
129 silly decomposeActions extract ua-parser-js@0.7.14
130 silly decomposeActions preinstall ua-parser-js@0.7.14
131 silly decomposeActions build ua-parser-js@0.7.14
132 silly decomposeActions install ua-parser-js@0.7.14
133 silly decomposeActions postinstall ua-parser-js@0.7.14
134 silly decomposeActions finalize ua-parser-js@0.7.14
135 silly decomposeActions refresh-package-json ua-parser-js@0.7.14
136 silly decomposeActions fetch whatwg-fetch@2.0.3
137 silly decomposeActions extract whatwg-fetch@2.0.3
138 silly decomposeActions preinstall whatwg-fetch@2.0.3
139 silly decomposeActions build whatwg-fetch@2.0.3
140 silly decomposeActions install whatwg-fetch@2.0.3
141 silly decomposeActions postinstall whatwg-fetch@2.0.3
142 silly decomposeActions finalize whatwg-fetch@2.0.3
143 silly decomposeActions refresh-package-json whatwg-fetch@2.0.3
144 silly decomposeActions fetch isomorphic-fetch@2.2.1
145 silly decomposeActions extract isomorphic-fetch@2.2.1
146 silly decomposeActions preinstall isomorphic-fetch@2.2.1
147 silly decomposeActions build isomorphic-fetch@2.2.1
148 silly decomposeActions install isomorphic-fetch@2.2.1
149 silly decomposeActions postinstall isomorphic-fetch@2.2.1
150 silly decomposeActions finalize isomorphic-fetch@2.2.1
151 silly decomposeActions refresh-package-json isomorphic-fetch@2.2.1
152 silly decomposeActions fetch fbjs@0.8.14
153 silly decomposeActions extract fbjs@0.8.14
154 silly decomposeActions preinstall fbjs@0.8.14
155 silly decomposeActions build fbjs@0.8.14
156 silly decomposeActions install fbjs@0.8.14
157 silly decomposeActions postinstall fbjs@0.8.14
158 silly decomposeActions finalize fbjs@0.8.14
159 silly decomposeActions refresh-package-json fbjs@0.8.14
160 silly decomposeActions fetch create-react-class@15.6.0
161 silly decomposeActions extract create-react-class@15.6.0
162 silly decomposeActions preinstall create-react-class@15.6.0
163 silly decomposeActions build create-react-class@15.6.0
164 silly decomposeActions install create-react-class@15.6.0
165 silly decomposeActions postinstall create-react-class@15.6.0
166 silly decomposeActions finalize create-react-class@15.6.0
167 silly decomposeActions refresh-package-json create-react-class@15.6.0
168 silly decomposeActions fetch prop-types@15.5.10
169 silly decomposeActions extract prop-types@15.5.10
170 silly decomposeActions preinstall prop-types@15.5.10
171 silly decomposeActions build prop-types@15.5.10
172 silly decomposeActions install prop-types@15.5.10
173 silly decomposeActions postinstall prop-types@15.5.10
174 silly decomposeActions finalize prop-types@15.5.10
175 silly decomposeActions refresh-package-json prop-types@15.5.10
176 silly decomposeActions fetch angular@1.6.5
177 silly decomposeActions extract angular@1.6.5
178 silly decomposeActions preinstall angular@1.6.5
179 silly decomposeActions build angular@1.6.5
180 silly decomposeActions install angular@1.6.5
181 silly decomposeActions postinstall angular@1.6.5
182 silly decomposeActions finalize angular@1.6.5
183 silly decomposeActions refresh-package-json angular@1.6.5
184 silly decomposeActions fetch lodash@4.17.4
185 silly decomposeActions extract lodash@4.17.4
186 silly decomposeActions preinstall lodash@4.17.4
187 silly decomposeActions build lodash@4.17.4
188 silly decomposeActions install lodash@4.17.4
189 silly decomposeActions postinstall lodash@4.17.4
190 silly decomposeActions finalize lodash@4.17.4
191 silly decomposeActions refresh-package-json lodash@4.17.4
192 silly decomposeActions fetch lodash.assign@4.2.0
193 silly decomposeActions extract lodash.assign@4.2.0
194 silly decomposeActions preinstall lodash.assign@4.2.0
195 silly decomposeActions build lodash.assign@4.2.0
196 silly decomposeActions install lodash.assign@4.2.0
197 silly decomposeActions postinstall lodash.assign@4.2.0
198 silly decomposeActions finalize lodash.assign@4.2.0
199 silly decomposeActions refresh-package-json lodash.assign@4.2.0
200 silly decomposeActions fetch react@15.6.1
201 silly decomposeActions extract react@15.6.1
202 silly decomposeActions preinstall react@15.6.1
203 silly decomposeActions build react@15.6.1
204 silly decomposeActions install react@15.6.1
205 silly decomposeActions postinstall react@15.6.1
206 silly decomposeActions finalize react@15.6.1
207 silly decomposeActions refresh-package-json react@15.6.1
208 silly install executeActions
209 silly doSerial global-install 168
210 verbose correctMkdir /Users/foldleft/.npm/_locks correctMkdir not in flight; initializing
211 verbose lock using /Users/foldleft/.npm/_locks/staging-83ae9e2248074bd1.lock for /Users/foldleft/Development/temp/node_modules/.staging
212 silly doParallel extract 168
213 silly extract asap@2.0.6
214 silly extract core-js@1.2.7
215 silly extract iconv-lite@0.4.18
216 silly extract encoding@0.1.12
217 silly extract is-stream@1.1.0
218 silly extract js-tokens@3.0.2
219 silly extract loose-envify@1.3.1
220 silly extract node-fetch@1.7.2
221 silly extract object-assign@4.1.1
222 silly extract promise@7.3.1
223 silly extract setimmediate@1.0.5
224 silly extract ua-parser-js@0.7.14
225 silly extract whatwg-fetch@2.0.3
226 silly extract isomorphic-fetch@2.2.1
227 silly extract fbjs@0.8.14
228 silly extract create-react-class@15.6.0
229 silly extract prop-types@15.5.10
230 silly extract angular@1.6.5
231 silly extract lodash@4.17.4
232 silly extract lodash.assign@4.2.0
233 silly extract react@15.6.1
234 verbose unlock done using /Users/foldleft/.npm/_locks/staging-83ae9e2248074bd1.lock for /Users/foldleft/Development/temp/node_modules/.staging
235 warn temp@0.0.0 No description
236 warn temp@0.0.0 No repository field.
237 warn optional SKIPPING OPTIONAL DEPENDENCY: js-tokens@3.0.2 (node_modules/js-tokens):
238 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/js-tokens failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
239 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
239 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
239 verbose network SKIPPING OPTIONAL DEPENDENCY:
239 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
239 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
240 warn optional SKIPPING OPTIONAL DEPENDENCY: promise@7.3.1 (node_modules/promise):
241 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/promise failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
242 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
242 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
242 verbose network SKIPPING OPTIONAL DEPENDENCY:
242 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
242 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
243 warn optional SKIPPING OPTIONAL DEPENDENCY: isomorphic-fetch@2.2.1 (node_modules/isomorphic-fetch):
244 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/isomorphic-fetch failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
245 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
245 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
245 verbose network SKIPPING OPTIONAL DEPENDENCY:
245 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
245 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
246 warn optional SKIPPING OPTIONAL DEPENDENCY: asap@2.0.6 (node_modules/asap):
247 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/asap failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
248 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
248 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
248 verbose network SKIPPING OPTIONAL DEPENDENCY:
248 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
248 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
249 warn optional SKIPPING OPTIONAL DEPENDENCY: is-stream@1.1.0 (node_modules/is-stream):
250 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/is-stream failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
251 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
251 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
251 verbose network SKIPPING OPTIONAL DEPENDENCY:
251 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
251 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
252 warn optional SKIPPING OPTIONAL DEPENDENCY: object-assign@4.1.1 (node_modules/object-assign):
253 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/object-assign failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
254 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
254 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
254 verbose network SKIPPING OPTIONAL DEPENDENCY:
254 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
254 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
255 warn optional SKIPPING OPTIONAL DEPENDENCY: whatwg-fetch@2.0.3 (node_modules/whatwg-fetch):
256 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/whatwg-fetch failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
257 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
257 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
257 verbose network SKIPPING OPTIONAL DEPENDENCY:
257 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
257 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
258 warn optional SKIPPING OPTIONAL DEPENDENCY: prop-types@15.5.10 (node_modules/prop-types):
259 warn network SKIPPING OPTIONAL DEPENDENCY: request to https://registry.npmjs.org/prop-types failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
260 verbose network SKIPPING OPTIONAL DEPENDENCY: This is a problem related to network connectivity.
260 verbose network SKIPPING OPTIONAL DEPENDENCY: In most cases you are behind a proxy or have bad network settings.
260 verbose network SKIPPING OPTIONAL DEPENDENCY:
260 verbose network SKIPPING OPTIONAL DEPENDENCY: If you are behind a proxy, please make sure that the
260 verbose network SKIPPING OPTIONAL DEPENDENCY: 'proxy' config is set properly.  See: 'npm help config'
261 verbose type system
262 verbose stack FetchError: request to https://registry.npmjs.org/core-js failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
262 verbose stack     at ClientRequest.<anonymous> (/Users/foldleft/.nvm/versions/node/v4.8.4/lib/node_modules/npm/node_modules/pacote/node_modules/make-fetch-happen/node_modules/node-fetch-npm/src/index.js:68:14)
262 verbose stack     at emitOne (events.js:77:13)
262 verbose stack     at ClientRequest.emit (events.js:169:7)
262 verbose stack     at TLSSocket.socketErrorListener (_http_client.js:269:9)
262 verbose stack     at emitOne (events.js:77:13)
262 verbose stack     at TLSSocket.emit (events.js:169:7)
262 verbose stack     at connectErrorNT (net.js:1016:8)
262 verbose stack     at nextTickCallbackWith2Args (node.js:511:9)
262 verbose stack     at process._tickCallback (node.js:425:17)
263 verbose cwd /Users/foldleft/Development/temp
264 verbose Darwin 16.7.0
265 verbose argv "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/node" "/Users/foldleft/.nvm/versions/node/v4.8.4/bin/npm" "i" "--loglevel" "silly"
266 verbose node v4.8.4
267 verbose npm  v5.3.0
268 error code ENOTFOUND
269 error errno ENOTFOUND
270 error network request to https://registry.npmjs.org/core-js failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org registry.npmjs.org:443
271 error network This is a problem related to network connectivity.
271 error network In most cases you are behind a proxy or have bad network settings.
271 error network
271 error network If you are behind a proxy, please make sure that the
271 error network 'proxy' config is set properly.  See: 'npm help config'
272 verbose exit [ 1, true ]
```
