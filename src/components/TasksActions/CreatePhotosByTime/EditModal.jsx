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
  timeRangeType: Yup.string().required(),
  customTimeStart: Yup.string().required(),
  customTimeStop: Yup.string().required(),
  interval: Yup.number().required(),
});

function EditCreatePhotosByTimeModal({ onHide, data: { taskId } }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne);
  const task = useSelector(taskSelectors.selectTaskById(taskId));

  const { status, photoSettings, ...rest } = task;
  const { timeRangeType, customTimeStart, customTimeStop, interval } = photoSettings;

  const handleStartPhotosByTime = (values) => {
    console.log('handleStart');

    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        ...rest,
        status: taskStatus.RUNNING,
        photoSettings: values,
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
        photoSettings,
      },
    }));
  };

  const formik = useFormik({
    initialValues: { timeRangeType, customTimeStart, customTimeStop, interval },
    validationSchema,
    onSubmit: handleStartPhotosByTime,
  });

  const isRunning = status === taskStatus.RUNNING;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>PhotosByTimeTask</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <PhotosByTimeForm formik={formik} status={status} />
      </Modal.Body>

      <Modal.Footer className="modal-footer justify-content-between">
        <div className="d-flex align-items-center gap-2">
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
