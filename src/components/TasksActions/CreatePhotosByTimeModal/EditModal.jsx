import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus';
import { taskStatus } from '../../../utils/constants.js';
import PhotosByTimeForm from './Form.jsx';

const validationSchema = Yup.object({
  startTime: Yup.string().required(),
  stopTime: Yup.string().required(),
  interval: Yup.number().required(),
});

function EditCreatePhotosByTimeModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne);
  const task = useSelector(taskSelectors.selectedTask);

  console.log(4444, task);

  const { status, settings, ...rest } = task;
  const { startTime, stopTime, interval } = settings;

  const handleStartPhotosByTime = (values) => {
    console.log('handleStart');

    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        ...rest,
        status: taskStatus.RUNNING,
        settings: values,
      },
    }))
      .then(() => {
        onHide();
      })
      .catch((e) => {
        console.log('catch formik err -', e);
      });
  };

  const handleStopPhotosByTime = () => {
    console.log('handleStop');

    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        ...rest,
        status: taskStatus.STOPPED,
        settings,
      },
    }));
  };

  const formik = useFormik({
    initialValues: { startTime, stopTime, interval },
    validationSchema,
    onSubmit: handleStartPhotosByTime,
  });

  const isRunning = status === taskStatus.RUNNING;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title bsPrefix="modal-title h5">
          PhotosByTimeTask
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PhotosByTimeForm formik={formik} status={status} />
      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        <Button
          key="close"
          onClick={onHide}
          size="sm"
        >
          Close
        </Button>
        <Button
          disabled={!isRunning}
          onClick={handleStopPhotosByTime}
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
      </Modal.Footer>
    </>
  );
}

export default EditCreatePhotosByTimeModal;
