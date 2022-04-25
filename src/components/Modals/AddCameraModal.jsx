import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import CameraForm from './CameraForm.jsx';
import { ADD_CAMERA } from '../../utils/constants.js';
import withModalWrapper from './withModalWrapper.jsx';

function AddCameraModal({ type, show, onHide }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraThunks.createOne(values))
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
      show={show && type === ADD_CAMERA}
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

export default withModalWrapper(AddCameraModal);
