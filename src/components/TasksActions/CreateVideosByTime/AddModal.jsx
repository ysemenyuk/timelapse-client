import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus';
import { taskName, taskStatus, taskType } from '../../../utils/constants.js';
import VideosByTimeForm from './Form.jsx';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { videosByTimeSchema } from '../../../utils/validations.js';

const initialValues = {
  dateRangeType: 'customDates', // allDates, customDates
  dateRange: 'lastDay', // lastDay, lastWeek, lastMonth
  timeRangeType: 'allTime', // allTime, customTime
  startTime: '09:00',
  endTime: '18:00',
  interval: 'oneTimeDay', // oneTimeMonth, oneTimeWeek, oneTimeDay
  duration: 60,
  fps: 30,
  deletExistingFile: 'yes',
};

function AddCreatePhotosByTimeModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);

  const handleStartCreateVideosByTime = (values, { resetForm, setSubmitting, setFieldError }) => {
    console.log('handleStartCreateVideosByTime');

    dispatch(taskActions.createOne({
      cameraId: selectedCameraId,
      payload: {
        name: taskName.CREATE_VIDEOS_BY_TIME,
        type: taskType.REPEAT_EVERY,
        status: taskStatus.RUNNING,
        videoSettings: values,
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
    validationSchema: videosByTimeSchema,
    onSubmit: handleStartCreateVideosByTime,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>VideosByTimeTask</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <VideosByTimeForm formik={formik} status={taskStatus.CREATED} />
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
