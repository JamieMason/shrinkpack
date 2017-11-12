import * as guard from 'when/guard';

const condition = guard.n(12);
export default (fn) => guard(condition, fn);
