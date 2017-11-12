const pad = (integer: number): string => (integer < 10 ? `0${integer}` : `${integer}`);
const msToMins = (ms: number): number => Math.floor(ms ? ms / 1000 / 60 : 0);
const msToSecs = (ms: number): number => Math.floor(ms ? (ms / 1000) % 60 : 0);
const msToTime = (ms: number): string => `${pad(msToMins(ms))}:${pad(msToSecs(ms))}`;
const getTimeBetween = (dateFrom: Date, dateTo: Date): string => msToTime(dateTo.getTime() - dateFrom.getTime());

export default getTimeBetween;
