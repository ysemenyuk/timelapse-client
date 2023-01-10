import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus';
import { taskName, taskStatus, taskType } from '../../../utils/constants.js';
import PhotosByTimeForm from './Form.jsx';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';

const validationSchema = Yup.object({
  startTime: Yup.string().required(),
  stopTime: Yup.string().required(),
  interval: Yup.number().required(),
});

const initialValues = {
  startTime: '08:00',
  stopTime: '20:00',
  interval: 60,
};

function AddCreatePhotosByTimeModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);

  const handleStartCreatePhotosByTime = (values) => {
    console.log('handleStart');

    dispatch(taskActions.createOne({
      cameraId: selectedCameraId,
      payload: {
        name: taskName.CREATE_PHOTOS_BY_TIME,
        type: taskType.REPEAT_EVERY,
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleStartCreatePhotosByTime,
  });

  return (
    <>
      <Modal.Header closeButton>
        PhotosByTimeTask
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
