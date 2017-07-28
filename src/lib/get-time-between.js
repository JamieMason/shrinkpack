// public
export default getTimeBetween;

function getTimeBetween(dateFrom, dateTo) {
  return msToTime(dateTo.getTime() - dateFrom.getTime());
}

function msToTime(ms) {
  const mins = msToMins(ms);
  const secs = msToSecs(ms);
  return `${pad(mins)}:${pad(secs)}`;
}

function msToMins(ms) {
  return Math.floor(ms ? ms / 1000 / 60 : 0);
}

function msToSecs(ms) {
  return Math.floor(ms ? ms / 1000 % 60 : 0);
}

function pad(value) {
  const whole = Math.floor(value);
  return whole < 10 ? `0${whole}` : whole;
}
