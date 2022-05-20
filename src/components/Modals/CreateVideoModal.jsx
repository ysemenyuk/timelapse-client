/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import withModalWrapper from './withModalWrapper.jsx';
import { CREATE_VIDEO } from '../../utils/constants.js';
import fileManagerService from '../../api/fileManager.service.js';
import taskService from '../../api/task.service.js';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const videosByTimeData = {
  startDateTime: '2022-05-01',
  endDateTime: '2022-05-30',
  duration: 60,
  fps: 25,
};

function CreateVideoModal({ type, show, onHide, selectedCamera }) {
  const formik = useFormik({
    initialValues: videosByTimeData,
    onSubmit: (values) => {
      taskService.createVideoFileTask(selectedCamera._id, values);
      onHide();
    },
  });

  // console.log(11111111, 'formik.errors -', formik.errors);
  // console.log(22222222, 'formik.values -', formik.values);

  const [filesCount, setFilesCount] = useState(0);

  useEffect(() => {
    const query = {
      startDateTime: formik.values.startDateTime,
      endDateTime: formik.values.endDateTime,
      type: 'ScreenshotByTime',
      count: true,
    };

    fileManagerService.getAll(selectedCamera._id, query)
      .then((resp) => {
        setFilesCount(resp.data.count);
      });
  }, [formik.values.startTime, formik.values.stopTime]);

  return (
    <Modal
      show={show && type === CREATE_VIDEO}
      onHide={onHide}
      // size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create video file from screenshots
          </Col>
        </Row>

        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startDateTime">Start time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.startDateTime}
                name="startDateTime"
                id="startDateTime"
                type="date"
                isInvalid={formik.errors && formik.errors.startDateTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.startDateTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="endDateTime">End time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.endDateTime}
                name="endDateTime"
                id="endDateTime"
                type="date"
                isInvalid={formik.errors && formik.errors.endDateTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.endDateTime}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="duration">Duration (seconds)</Form.Label>
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
              <Form.Label htmlFor="fps">Frames per second (fps)</Form.Label>
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
            {`Total: ${filesCount} files -- ${Math.round(filesCount / formik.values.fps)} seconds video (${formik.values.fps} fps)`}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            {`Required: ${formik.values.duration * formik.values.fps} files -- ${formik.values.duration} seconds video (${formik.values.fps} fps)`}
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
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withModalWrapper(CreateVideoModal);
