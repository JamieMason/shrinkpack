import { PromiseFactory } from '../typings';

import * as guard from 'when/guard';

const condition = guard.n(12);
export default (fn: PromiseFactory): PromiseFactory => guard(condition, fn);
