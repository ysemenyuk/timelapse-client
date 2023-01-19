import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CameraForm from './CameraForm.jsx';
import { cameraActions } from '../../redux/camera/cameraSlice.js';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
  photoUrl: Yup.string().url(),
  rtspUrl: Yup.string(),
});

const initialValues = {
  name: '',
  description: '',
  location: {
    latitude: '',
    longitude: '',
  },
  model: '',
  photoUrl: '',
  rtspUrl: '',
};

function AddCameraModal({ onHide }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraActions.createOne(values))
      .then((resp) => {
        unwrapResult(resp);
        resetForm();
        setSubmitting(false);
        onHide();
      })
      .catch((e) => {
        setSubmitting(false);
        setFieldError('network', e.message);
        console.log('catch formik err -', e);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton>
        Add new camera
      </Modal.Header>

      <Modal.Body>
        <CameraForm formik={formik} />
      </Modal.Body>

      <Modal.Footer>
        {formik.isSubmitting && <Spinner as="span" animation="border" size="sm" />}
        <Button
          size="sm"
          onClick={onHide}
          disabled={formik.isSubmitting}
          variant="primary"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
          variant="primary"
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddCameraModal;
