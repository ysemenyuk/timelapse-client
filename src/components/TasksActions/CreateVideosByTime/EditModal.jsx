import React from 'react';
import { useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice';
import useThunkStatus from '../../../hooks/useThunkStatus';

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   duration: Yup.number().required(),
//   fps: Yup.number().required(),
// });

function EditCreateVideosByTimeModal({ onHide }) {
  // const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne);
  const task = useSelector(taskSelectors.videosByTimeTask);

  console.log('EditCreateVideosByTimeModal task -', task);

  // const handleStartVideosByTime = (values) => {
  //   console.log('handleStart');
  //   dispatch(taskActions.updateOne({
  //     cameraId: task.camera,
  //     taskId: task._id,
  //     payload: {
  //       status: 'Running',
  //       settings: values,
  //     },
  //   }))
  //     .then(() => {
  //       onHide();
  //     })
  //     .catch((e) => {
  //       console.log('catch formik err -', e);
  //     });
  // };

  // const handleStopVideosByTime = () => {
  //   console.log('handleStop');
  //   dispatch(taskActions.updateOne({
  //     cameraId: task.camera,
  //     taskId: task._id,
  //     payload: {
  //       status: 'Stopped',
  //       settings,
  //     },
  //   }));
  // };

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>VideosByTimeTask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create video file from photos every day
          </Col>
        </Row>

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
          // disabled={!isRunning}
          // onClick={handleStopPhotosByTime}
          size="sm"
        >
          Stop
        </Button>
        <Button
          // disabled={isRunning}
          // onClick={formik.handleSubmit}
          size="sm"
          key="submit"
        >
          Start
        </Button>
      </Modal.Footer>
    </>
  );
}

export default EditCreateVideosByTimeModal;
