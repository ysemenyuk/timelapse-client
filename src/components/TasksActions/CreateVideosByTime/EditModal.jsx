import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus';
import { taskStatus } from '../../../utils/constants.js';
import VideosByTimeForm from './Form.jsx';
import { videosByTimeSchema } from '../../../utils/validations.js';

function EditCreatePhotosByTimeModal({ onHide, data: { taskId } }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne);
  const task = useSelector(taskSelectors.selectTaskById(taskId));

  const { status, videoSettings, ...rest } = task;
  // const { dateRangeType, timeRangeType, startTime, endTime, duration, interval, deletExistingFile } = videoSettings;

  const handleStartVideosByTime = (values, { resetForm, setSubmitting, setFieldError }) => {
    console.log('handleStartVideosByTime');

    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        ...rest,
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

  const handleStopVideosByTime = () => {
    console.log('handleStopVideosByTime');

    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        ...rest,
        status: taskStatus.STOPPED,
        videoSettings,
      },
    }));
  };

  const formik = useFormik({
    initialValues: videoSettings,
    validationSchema: videosByTimeSchema,
    onSubmit: handleStartVideosByTime,
  });

  const isRunning = status === taskStatus.RUNNING;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>PhotosByTimeTask</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <VideosByTimeForm formik={formik} status={status} />
      </Modal.Body>

      <Modal.Footer className="modal-footer justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Button
            disabled={!isRunning}
            onClick={handleStopVideosByTime}
            size="sm"
          >
            Stop
          </Button>
          <Button
            disabled={isRunning}
            onClick={formik.handleSubmit}
            size="sm"
            key="submit"
          >
            Start
          </Button>
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            key="close"
            size="sm"
            onClick={onHide}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export default EditCreatePhotosByTimeModal;
