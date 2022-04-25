/* eslint-disable import/prefer-default-export */
export const getFilesPerDay = ({ startTime, stopTime, interval }) => {
  const start = new Date(`1995-12-17T${startTime}:00`);
  const stop = new Date(`1995-12-17T${stopTime}:00`);
  const totalSeconds = (stop - start) / 1000;

  return Math.round(totalSeconds / interval);
};
