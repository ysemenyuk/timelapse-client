/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// import withModalWrapper from '../Modals/withModalWrapper.jsx';
// import { CREATE_VIDEO } from '../../utils/constants.js';
import fileManagerService from '../../api/fileManager.service.js'; //
import { taskActions } from '../../redux/slices/taskSlice.js';

const videosByTimeData = {
  startDateTime: '2022-05-01',
  endDateTime: '2022-05-30',
  duration: 60,
  fps: 25,
};

function CreateVideoModal({ onHide, selectedCamera }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: videosByTimeData,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(taskActions.createVideoFile(values))
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

    // !!!

    fileManagerService.getAll(selectedCamera._id, query)
      .then((resp) => {
        setFilesCount(resp.data.count);
      });
  }, [formik.values.startTime, formik.values.stopTime]);

  return (
    <Modal
      show
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

export default CreateVideoModal;
