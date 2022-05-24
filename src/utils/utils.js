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
