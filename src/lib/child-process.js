import execa from 'execa';
import rateLimit from './rate-limit';

export default {
  exec: rateLimit(execa.shell),
  spawn: execa
};
