const chalk = require('chalk');
const CircularJSON = require('circular-json');
const token = chalk.dim('%s');

const logMethodCall = (objName: string, methodName: string, args: any[], result: any) => {
  const template = `${objName}.%s(${token}) => ${token}`;
  console.log(template, methodName, args, CircularJSON.stringify(result));
};

const logError = (objName: string, methodName: string, args: any[], err: Error) => {
  const template = chalk.red(`${objName}.%s(${token}) threw %s`);
  console.log(template, methodName, args, err);
};

const addLogging = (objName: string) => (obj: object) => (methodName: string) => {
  const original = obj[methodName];
  obj[methodName] = function(...args: any[]) {
    try {
      const result = original.call(this, ...args);
      if (result && result.then) {
        result
          .then((res: any) => {
            logMethodCall(objName, methodName, args, res);
          })
          .catch((err: Error) => {
            logError(objName, methodName, args, err);
            throw err;
          });
      } else {
        logMethodCall(objName, methodName, args, result);
      }
      return result;
    } catch (err) {
      logError(objName, methodName, args, err);
      throw err;
    }
  };
};

export default (name: string, obj: object) => {
  Object.keys(obj)
    .filter((key: string) => typeof obj[key] === 'function')
    .forEach(addLogging(name)(obj));
};
