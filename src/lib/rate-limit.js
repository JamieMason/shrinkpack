import guard from 'when/guard';

export default rateLimit;

const condition = guard.n(10);

function rateLimit(fn) {
  return guard(condition, fn);
}
