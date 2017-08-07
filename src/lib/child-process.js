import execa from 'execa';
import rateLimit from './rate-limit';

export const exec = rateLimit(execa.shell);
export const spawn = rateLimit(execa);
