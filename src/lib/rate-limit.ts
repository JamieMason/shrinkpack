const guard = require('when/guard');
const condition = guard.n(12);

export const rateLimit = <T>(fn: (...args: any[]) => Promise<T>): ((...args: any[]) => Promise<T>) =>
  guard(condition, fn);
