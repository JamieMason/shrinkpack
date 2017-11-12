const pad = (integer) => (integer < 10 ? `0${integer}` : integer);
const msToMins = (ms) => Math.floor(ms ? ms / 1000 / 60 : 0);
const msToSecs = (ms) => Math.floor(ms ? ms / 1000 % 60 : 0);
const msToTime = (ms) => `${pad(msToMins(ms))}:${pad(msToSecs(ms))}`;
const getTimeBetween = (dateFrom, dateTo) => msToTime(dateTo.getTime() - dateFrom.getTime());

export default getTimeBetween;
