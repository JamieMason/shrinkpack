import * as log from './log';

export default (json) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    log.error(`unable to parse JSON '${json}'`, err);
    process.exit(1);
  }
};
