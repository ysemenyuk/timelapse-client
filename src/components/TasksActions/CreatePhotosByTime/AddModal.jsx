import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus';
import { taskName, taskStatus, taskType } from '../../../utils/constants.js';
import PhotosByTimeForm from './Form.jsx';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { photosByTimeSchema } from '../../../utils/validations.js';

const initialValues = {
  timeRangeType: 'customTime', // allTime, sunTime, customTime
  startTime: '08:00',
  endTime: '20:00',
  interval: 60,
};

function AddCreatePhotosByTimeModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);

  const handleStartCreatePhotosByTime = (values, { resetForm, setSubmitting, setFieldError }) => {
    console.log('handleStartCreatePhotosByTime');

    dispatch(taskActions.createOne({
      cameraId: selectedCameraId,
      payload: {
        name: taskName.CREATE_PHOTOS_BY_TIME,
        type: taskType.REPEAT_EVERY,
        status: taskStatus.RUNNING,
        photoSettings: values,
      },
    }))
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
    validationSchema: photosByTimeSchema,
    onSubmit: handleStartCreatePhotosByTime,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>PhotosByTimeTask</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PhotosByTimeForm formik={formik} status={taskStatus.CREATED} />
      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        <Button
          key="close"
          size="sm"
          disabled={fetchStatus.isLoading}
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          key="submit"
          size="sm"
          disabled={fetchStatus.isLoading}
          onClick={formik.handleSubmit}
        >
          SaveAndStart
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddCreatePhotosByTimeModal;
