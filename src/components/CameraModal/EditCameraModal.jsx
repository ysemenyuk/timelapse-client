import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, Spinner } from 'react-bootstrap';
import CameraForm from './CameraForm.jsx';
import { cameraActions, cameraSelectors } from '../../redux/camera/cameraSlice.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
  photoUrl: Yup.string().url(),
  rtspUrl: Yup.string(),
});

function EditCameraModal({ onHide }) {
  const dispatch = useDispatch();
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const openDeleteCameraModal = async () => {
    dispatch(modalActions.openModal({ type: modals.DELETE_CAMERA }));
  };

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

  const formik = useFormik({
    initialValues: selectedCamera,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CameraForm formik={formik} />
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between align-items-start">
        <div>
          <Button onClick={openDeleteCameraModal} variant="primary" size="sm" className="me-2">
            Delete
          </Button>
        </div>
        <div className="d-flex gap-2 justify-content-start align-items-center">
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
        </div>
      </Modal.Footer>

    </>
  );
}

export default EditCameraModal;
