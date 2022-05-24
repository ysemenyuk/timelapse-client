import React from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import withModalWrapper from '../../Modals/withModalWrapper.jsx';
import { EDIT_VIDEOSBYTIME_SETTINGS } from '../../../utils/constants.js';

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   duration: Yup.number().required(),
//   fps: Yup.number().required(),
// });

function VideosByTimeModal({ type, show, onHide, onSubmit, initialValues }) {
  const { startTime, duration, fps } = initialValues;

  const formik = useFormik({
    initialValues: { startTime, duration, fps },
    // validationSchema,
    onSubmit: (values) => {
      // console.log('onSubmit values', values);
      onSubmit(values);
      onHide();
    },
  });

  const files = formik.values.duration * formik.values.fps || '--';

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <Modal
      show={show && type === EDIT_VIDEOSBYTIME_SETTINGS}
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

export default withModalWrapper(VideosByTimeModal);
