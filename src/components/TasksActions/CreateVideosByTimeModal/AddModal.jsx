import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col, ProgressBar, Spinner } from 'react-bootstrap';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice';
import useThunkStatus from '../../../hooks/useThunkStatus';

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   duration: Yup.number().required(),
//   fps: Yup.number().required(),
// });

function AddCreateVideosByTimeModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne);
  const task = useSelector(taskSelectors.videosByTimeTask);

  const { status, settings } = task;
  const { startTime, duration, fps } = settings;

  const handleStartVideosByTime = (values) => {
    console.log('handleStart');
    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        status: 'Running',
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

  const handleStopVideosByTime = () => {
    console.log('handleStop');
    dispatch(taskActions.updateOne({
      cameraId: task.camera,
      taskId: task._id,
      payload: {
        status: 'Stopped',
        settings,
      },
    }));
  };

  const formik = useFormik({
    initialValues: { startTime, duration, fps },
    // validationSchema,
    onSubmit: handleStartVideosByTime,
  });

  const isRunning = status === 'Running';
  const files = formik.values.duration * formik.values.fps || '--';

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title bsPrefix="modal-title h5">
          VideosByTimeTask
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            {`Create video file from screenshots every day - ${status}`}
          </Col>
        </Row>

        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startTime">Start time</Form.Label>
              <Form.Control
                disabled={isRunning}
                onChange={formik.handleChange}
                value={formik.values.startTime}
                name="startTime"
                id="startTime"
                type="time"
                isInvalid={formik.errors && formik.errors.startTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.startTime}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label htmlFor="duration">Duration  (seconds)</Form.Label>
              <Form.Control
                disabled={isRunning}
                onChange={formik.handleChange}
                value={formik.values.duration}
                name="duration"
                id="duration"
                type="number"
                isInvalid={formik.errors && formik.errors.duration}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.duration}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label htmlFor="fps">Fps</Form.Label>
              <Form.Control
                disabled={isRunning}
                onChange={formik.handleChange}
                value={formik.values.fps}
                name="fps"
                id="fps"
                type="number"
                isInvalid={formik.errors && formik.errors.fps}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.fps}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>

        <Row className="mb-3">
          <Col>
            {`Required: ${files} files for ${formik.values.duration} secons video file (${formik.values.fps})`}
          </Col>
        </Row>

        <If condition={isRunning}>
          <ProgressBar animated now={100} />
        </If>
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
          onClick={handleStopVideosByTime}
          size="sm"
        >
          Stop
        </Button>
        <Button
          disabled={isRunning}
          key="submit"
          onClick={formik.handleSubmit}
          size="sm"
        >
          Start
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddCreateVideosByTimeModal;
