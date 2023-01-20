import { setLocale } from 'yup';

const setupYupLocale = (i18n) => {
  setLocale({
    mixed: {
      required: () => i18n.t('yup.required'),
      notOneOf: () => i18n.t('yup.notOneOf'),
      oneOf: ({ path }) => i18n.t(`yup.oneOf_${path}`),
    },
    string: {
      min: ({ min }) => i18n.t('yup.string_min', { min }),
      max: ({ max }) => i18n.t('yup.string_max', { max }),
    },
  });
};

export default setupYupLocale;
