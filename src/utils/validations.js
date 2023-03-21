import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

export const singupSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')]),
});

export const cameraSchema = yup.object({
  name: yup.string().required().min(3).max(20),
  description: yup.string().required().min(3).max(30),
  model: yup.string(),
  photoUrl: yup.string().url(),
  rtspUrl: yup.string(),
});

export const photoSchema = yup.object({
  photoUrl: yup.string().url(),
});

export const photosByTimeSchema = yup.object({
  timeRangeType: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  interval: yup.number().required(),
});

export const videoSchema = yup.object({
  customName: yup.string(),
  dateRangeType: yup.mixed().oneOf(['allDates', 'customDates']).required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  timeRangeType: yup.mixed().oneOf(['allTime', 'customTime']).required(),
  startTime: yup.string(),
  endTime: yup.string(),
  duration: yup.number().required().min(10),
  fps: yup.number().required().max(30),
});

export const videosByTimeSchema = yup.object({
  dateRangeType: yup.mixed().oneOf(['allDates', 'customDates']).required(),
  dateRange: yup.mixed().oneOf(['lastDay', 'lastWeek', 'lastMonth']),
  timeRangeType: yup.mixed().oneOf(['allTime', 'customTime']).required(),
  startTime: yup.string(),
  endTime: yup.string(),
  interval: yup.mixed().oneOf(['oneTimeMonth', 'oneTimeWeek', 'oneTimeDay']).required(),
  duration: yup.number().required().min(10),
  fps: yup.number().required().max(30),
  deletExistingFile: yup.mixed().oneOf(['yes', 'no']).required(),
});
