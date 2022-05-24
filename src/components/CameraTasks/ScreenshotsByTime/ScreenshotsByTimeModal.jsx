import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { calculateFilesPerDay } from '../../../utils/utils.js';
import { taskActions, taskSelectors } from '../../../redux/slices/taskSlice.js';

const data = {
  status: 'Stopped',
  screenshotsByTimeSettings: {
    startTime: '10:00',
    stopTime: '20:00',
    interval: '20',
  },
};

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   stopTime: Yup.string().required(),
//   interval: Yup.number().required(),
// });

function ScreenshotsByTimeModal({ show, onHide }) {
  const dispatch = useDispatch();

  const selectedCamera = useSelector(taskSelectors.selectedCamera);
  const screenshotsByTimeTask = useSelector(taskSelectors.screenshotsByTimeTaskSelector(selectedCamera));

  const { status, screenshotsByTimeSettings } = data;
  const { startTime, stopTime, interval } = screenshotsByTimeSettings;

  console.log(11112222, screenshotsByTimeTask);

  const updatePhotosByTimeTask = (newSettings, newStatus) => {
    console.log('handleUpdateTask settings', newSettings, newStatus);
    const payload = {
      status: newStatus,
      screenshotsByTimeSettings: { ...newSettings },
    };

    dispatch(taskActions.updateScreenshotsByTime({
      cameraId: data.camera,
      taskId: data._id,
      payload,
    }));
  };

  const handleStartPhotosByTime = (values) => {
    console.log('handleStart');
    updatePhotosByTimeTask(values, 'Running');
  };

  const handleStopPhotosByTime = () => {
    console.log('handleStop');
    updatePhotosByTimeTask(screenshotsByTimeSettings, 'Stopped');
  };

  const formik = useFormik({
    initialValues: { startTime, stopTime, interval },
    // validationSchema,
    onSubmit: (values) => {
      console.log('onSubmit values', values);
      handleStartPhotosByTime(values);
    },
  });

  const isRunning = status === 'Running';
  const files = calculateFilesPerDay(formik.values.startTime, formik.values.stopTime, formik.values.interval);

  console.log('formik.errors -', formik.errors);
  console.log('formik.values -', formik.values);

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>PhotosByTimeTask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create photos by time
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
              <Form.Label htmlFor="stopTime">Stop time</Form.Label>
              <Form.Control
                disabled={isRunning}
                onChange={formik.handleChange}
                value={formik.values.stopTime}
                name="stopTime"
                id="stopTime"
                type="time"
                isInvalid={formik.errors && formik.errors.stopTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.stopTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="interval">Interval (seconds)</Form.Label>
              <Form.Control
                disabled={isRunning}
                onChange={formik.handleChange}
                value={formik.values.interval}
                name="interval"
                id="interval"
                type="number"
                isInvalid={formik.errors && formik.errors.interval}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.interval}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>

        <Row className="mb-3">
          <Col>
            <span className="fw-bold">
              {`${files} files`}
            </span>
            {' '}
            per day
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <span className="fw-bold">
              {`${Math.round(files / 25)} seconds`}
            </span>
            {' '}
            (25 fps) video of the day
          </Col>
        </Row>

      </Modal.Body>

      <Modal.Footer>
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
    </Modal>
  );
}

export default ScreenshotsByTimeModal;
