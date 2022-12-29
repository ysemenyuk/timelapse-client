/* eslint-disable import/prefer-default-export */
export const calculateFilesPerDay = (startTime, stopTime, interval) => {
  if (interval === '--' || Number(interval) === 0) {
    return '--';
  }

  const start = new Date(`1995-12-17T${startTime}:00`);
  const stop = new Date(`1995-12-17T${stopTime}:00`);
  const totalSeconds = (stop - start) / 1000;

  return Math.round(totalSeconds / Number(interval));
};

export const parseTime = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const hh = time.getHours();
  const mm = time.getMinutes();
  const ss = time.getSeconds();

  return {
    year,
    month,
    date,
    hh,
    mm,
    ss,
  };
};

export const dd = (num) => (num < 10 ? `0${num}` : `${num}`);

export const makeTodayName = (time) => {
  const { year, month, date } = parseTime(time);
  return `${year}-${dd(month + 1)}-${dd(date)}`;
};
