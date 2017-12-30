const chalk = require('chalk');
const circularJSON = require('circular-json');
const token = chalk.dim('%s');

const isPromise = (value: any) => value && typeof value.then === 'function';
const stringifyArgs = (args: any) => circularJSON.stringify(args).replace(/^\[|\]$/g, '');
const stringifyValue = (value: any) => (isPromise(value) ? 'Promise' : circularJSON.stringify(value));

const logFunction = (file: string, key: string, args: any[], result: any) => {
  const template = `${file} %s(${token}) => ${token}`;
  console.log(template, key, stringifyArgs(args), stringifyValue(result));
};

const logPromise = (file: string, key: string, args: any[], resolvedValue: any) => {
  const template = `${file} %s(${token}).then(${token})`;
  console.log(template, key, stringifyArgs(args), circularJSON.stringify(resolvedValue));
};

const logError = (file: string, key: string, args: any[], err: Error) => {
  const template = chalk.red(`${file} %s(${token}) threw %s`);
  console.log(template, key, stringifyArgs(args), err);
};

export const snitch = (file: string, api: { [key: string]: any }) => {
  Object.keys(api)
    .filter((key) => typeof api[key] === 'function')
    .map((key) => ({ key, value: api[key] }))
    .forEach(({ key, value }) => {
      const original = api[key];
      api[key] = (...args: any[]) => {
        try {
          const result = original.call(api, ...args);
          logFunction(chalk.blue(file), key, args, result);
          if (isPromise(result)) {
            result
              .then((resolvedValue: any) => {
                logPromise(chalk.blue(file), key, args, resolvedValue);
                return resolvedValue;
              })
              .catch((err: Error) => {
                logError(chalk.blue(file), key, args, err);
                throw err;
              });
          }
          return result;
        } catch (err) {
          logError(chalk.blue(file), key, args, err);
          throw err;
        }
      };
    });
};
