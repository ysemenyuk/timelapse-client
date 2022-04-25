import React from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal } from 'react-bootstrap';
import cameraThunks from '../../thunks/cameraThunks.js';
import CameraForm from './CameraForm.jsx';
import { EDIT_CAMERA } from '../../utils/constants.js';
import withModalWrapper from './withModalWrapper.jsx';

function EditCameraModal({ data, type, show, onHide }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraThunks.updateOne(values))
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
      show={show && type === EDIT_CAMERA}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit settings</Modal.Title>
      </Modal.Header>

      <CameraForm
        initialValues={data}
        onCancel={onHide}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default withModalWrapper(EditCameraModal);
