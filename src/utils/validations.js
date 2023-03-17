import * as Yup from 'yup';

export const photosByTimeSchema = Yup.object({
  timeRangeType: Yup.string().required(),
  startTime: Yup.string().required(),
  endTime: Yup.string().required(),
  interval: Yup.number().required(),
});

export const videosByTimeSchema = Yup.object({
  dateRangeType: Yup.mixed().oneOf(['allDates', 'customDates']).required(),
  dateRange: Yup.mixed().oneOf(['lastDay', 'lastWeek', 'lastMonth']),
  timeRangeType: Yup.mixed().oneOf(['allTime', 'customTime']).required(),
  startTime: Yup.string(),
  endTime: Yup.string(),
  interval: Yup.mixed().oneOf(['oneTimeMonth', 'oneTimeWeek', 'oneTimeDay']).required(),
  duration: Yup.number().required().min(10),
  fps: Yup.number().required().max(30),
  deletExistingFile: Yup.mixed().oneOf(['yes', 'no']).required(),
});
