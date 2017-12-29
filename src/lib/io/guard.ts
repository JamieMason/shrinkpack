import * as when from 'when';

export type ExitFn = () => void;
export type AnyFn = (...args: any[]) => void;
export type QueuedFn = (exit: ExitFn) => void;
export type EnterFn = () => Promise<QueuedFn>;

export const limitTo = (allowed: number) => {
  const queue: QueuedFn[] = [];
  let count = 0;

  const exit: ExitFn = () => {
    count = Math.max(count - 1, 0);
    const resolve = queue.shift();
    if (typeof resolve === 'function') {
      resolve(exit);
    }
  };

  const enter: EnterFn = () =>
    new Promise((resolve: QueuedFn) => {
      if (count < allowed) {
        resolve(exit);
      } else {
        queue.push(resolve);
      }
      count += 1;
    });

  return enter;
};

export function guard(condition: EnterFn, fn: AnyFn) {
  return function(this: any, ...args: any[]) {
    const self = this;
    return Promise.resolve(when(condition()).then((exit: AnyFn) => when(fn.apply(self, args)).finally(exit)));
  };
}
