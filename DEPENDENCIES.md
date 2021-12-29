# shrinkpack

Fast, resilient, reproducible builds with npm install.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install shrinkpack --save
```

## Dependencies

- [commander](https://ghub.io/commander): the complete solution for node.js command-line programs
- [gunzip-maybe](https://ghub.io/gunzip-maybe): Transform stream that gunzips its input if it is gzipped and just echoes it if not
- [pacote](https://ghub.io/pacote): JavaScript package downloader
- [picocolors](https://ghub.io/picocolors): The tiniest and the fastest library for terminal output formatting with ANSI colors
- [ssri](https://ghub.io/ssri): Standard Subresource Integrity library -- parses, serializes, generates, and verifies integrity metadata according to the SRI spec.

## Dev Dependencies

- [@types/gunzip-maybe](https://ghub.io/@types/gunzip-maybe): TypeScript definitions for gunzip-maybe
- [@types/node](https://ghub.io/@types/node): TypeScript definitions for Node.js
- [@types/pacote](https://ghub.io/@types/pacote): TypeScript definitions for pacote
- [@types/ssri](https://ghub.io/@types/ssri): TypeScript definitions for ssri
- [@typescript-eslint/eslint-plugin](https://ghub.io/@typescript-eslint/eslint-plugin): TypeScript plugin for ESLint
- [@typescript-eslint/parser](https://ghub.io/@typescript-eslint/parser): An ESLint custom parser which leverages TypeScript ESTree
- [eslint](https://ghub.io/eslint): An AST-based pattern checker for JavaScript.
- [eslint-plugin-import](https://ghub.io/eslint-plugin-import): Import with sanity.
- [prettier](https://ghub.io/prettier): Prettier is an opinionated code formatter
- [typescript](https://ghub.io/typescript): TypeScript is a language for application scale JavaScript development

## License

MIT