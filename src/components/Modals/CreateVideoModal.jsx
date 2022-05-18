import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import withModalWrapper from './withModalWrapper.jsx';
import { CREATE_VIDEO } from '../../utils/constants.js';
import fileManagerService from '../../api/fileManager.service.js';

const screenshotByTimeData = {
  startTime: '2022-05-01T10:00',
  stopTime: '2022-05-18T18:00',
  duration: '60',
};

function CreateVideoModal({ type, show, onHide, selectedCamera }) {
  const formik = useFormik({
    initialValues: screenshotByTimeData,
    onSubmit: (values) => {
      console.log('onSubmit values', values);
      // onHide();
    },
  });

  // console.log(11111111, 'formik.errors -', formik.errors);
  // console.log(22222222, 'formik.values -', formik.values);

  const [filesCount, setFilesCount] = useState(0);

  useEffect(() => {
    const query = {
      startTime: formik.values.startTime,
      stopTime: formik.values.stopTime,
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
              <Form.Label htmlFor="startTime">Start time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.startTime}
                name="startTime"
                id="startTime"
                type="datetime-local"
                isInvalid={formik.errors && formik.errors.startTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.startTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="stopTime">Stop time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.stopTime}
                name="stopTime"
                id="stopTime"
                type="datetime-local"
                isInvalid={formik.errors && formik.errors.stopTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.stopTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="interval">Duration (seconds)</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.duration}
                name="interval"
                id="interval"
                type="number"
                isInvalid={formik.errors && formik.errors.duration}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.interval}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>

        <Row className="mb-3">
          <Col>
            {`Total: ${filesCount} files -- ${Math.round(filesCount / 25)} seconds video (25 fps)`}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            {`Required: ${formik.values.duration * 25} files -- ${formik.values.duration} seconds video (25 fps)`}
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
