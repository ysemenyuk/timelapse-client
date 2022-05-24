import React from 'react';
// import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const initialValues = {
  status: '--',
  videosByTimeSettings: {
    startTime: '10:00',
    duration: '60',
    fps: '25',
  },
};

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   duration: Yup.number().required(),
//   fps: Yup.number().required(),
// });

function VideosByTimeModal({ show, onHide }) {
  const { startTime, duration, fps } = initialValues;
  // const dispatch = useDispatch();

  // const handleUpdateVideosByTime = (settings, taskStatus = null) => {
  //   console.log('handleUpdateTask settings', settings);
  //   const payload = {
  //     status: taskStatus || videosByTimeTask.status,
  //     videosByTimeSettings: { ...settings },
  //   };

  //   dispatch(taskActions.updateVideosByTime({
  //     cameraId: selectedCamera._id,
  //     taskId: selectedCamera.videosByTimeTask._id,
  //     payload,
  //   }));
  // };

  // const handleStartVideosByTime = () => {
  //   console.log('handleStart');
  //   handleUpdateVideosByTime(videosByTimeTask.videosByTimeSettings, 'Running');
  // };

  // const handleStopVideosByTime = () => {
  //   console.log('handleStop');
  //   handleUpdateVideosByTime(videosByTimeTask.videosByTimeSettings, 'Stopped');
  // };

  const formik = useFormik({
    initialValues: { startTime, duration, fps },
    // validationSchema,
    onSubmit: (values) => {
      console.log('onSubmit values', values);
    },
  });

  const files = formik.values.duration * formik.values.fps || '--';

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create video file from screenshots every day
          </Col>
        </Row>

        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startTime">Start time</Form.Label>
              <Form.Control
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

      </Modal.Body>
      <Modal.Footer>
        <Button
          key="close"
          onClick={onHide}
          size="sm"
        >
          Cancel
        </Button>
        <Button
          key="submit"
          onClick={formik.handleSubmit}
          size="sm"
        >
          Save settings
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VideosByTimeModal;
