import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  start: Yup.string().required(),
  finish: Yup.string().required(),
  time: Yup.string().required(),
});

const MakeVideoFile = () => {
  // const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      start: '30.05.21',
      finish: '30.05.21',
      time: '60',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log('values', values);
      setTimeout(() => setSubmitting(false), 2000);
    },
  });

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <div className='col-12 mb-3'>
      <h6 className='mb-3'>Make video file</h6>
      <div>
        <form className='row g-3' onSubmit={formik.handleSubmit}>
          <div className='col-md-6'>
            <label htmlFor='description' className='form-label'>
              Start Date
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.start}
              id='start'
              name='start'
              type='text'
              disabled={formik.isSubmitting}
              className={`form-control ${formik.errors?.start && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.start}</div>
          </div>

          <div className='col-md-6'>
            <label htmlFor='description' className='form-label'>
              Finish Date
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.finish}
              id='finish'
              name='finish'
              type='text'
              disabled={formik.isSubmitting}
              className={`form-control ${formik.errors?.finish && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.finish}</div>
          </div>

          <div className='col-md-12'>
            <label htmlFor='jpegCreateInterval' className='form-label'>
              Time (seconds)
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.time}
              id='time'
              name='time'
              type='text'
              disabled={formik.isSubmitting}
              className={`form-control ${formik.errors?.time && 'is-invalid'}`}
            ></input>
            <div className='invalid-feedback'>{formik.errors?.time}</div>
          </div>

          <div className='d-grid gap-2 d-flex justify-content-start'>
            <button
              className='btn btn-sm btn-primary'
              type='submit'
              disabled={formik.isSubmitting}
            >
              MakeVideo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeVideoFile;
