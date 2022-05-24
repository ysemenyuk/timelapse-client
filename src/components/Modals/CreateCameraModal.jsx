import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal } from 'react-bootstrap';
import CameraForm from './CameraForm.jsx';

import { cameraActions } from '../../redux/slices/cameraSlice.js';

function CreateCameraModal({ show, onHide }) {
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

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new camera</Modal.Title>
      </Modal.Header>

      <CameraForm
        onCancel={onHide}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default CreateCameraModal;
