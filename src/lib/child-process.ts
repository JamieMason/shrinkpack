import { IExeca } from '../typings';
import { rateLimit } from './rate-limit';

const execa = require('execa');

export const exec = rateLimit<IExeca>(execa.shell);
export const spawn = rateLimit<IExeca>(execa);
