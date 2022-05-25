import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal } from 'react-bootstrap';
import CameraForm from './CameraForm.jsx';
import { cameraActions, cameraSelectors } from '../../redux/slices/cameraSlice.js';

function EditCameraModal({ show, onHide }) {
  const dispatch = useDispatch();
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const handleSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    dispatch(cameraActions.updateOne({ cameraId: selectedCamera._id, payload: values }))
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
        <Modal.Title>Edit settings</Modal.Title>
      </Modal.Header>

      <CameraForm
        initialValues={selectedCamera}
        onCancel={onHide}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default EditCameraModal;
