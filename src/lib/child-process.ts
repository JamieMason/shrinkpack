import execa, { shell } from 'execa';
import rateLimit from './rate-limit';

export const exec = rateLimit(shell);
export const spawn = rateLimit(execa);
