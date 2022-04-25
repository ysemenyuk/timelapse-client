import React from 'react';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getFilesPerDay } from '../../utils/utils.js';
import withModalWrapper from './withModalWrapper.jsx';
import { EDIT_SCREENSHOT_SETTINGS } from '../../utils/constants.js';

// const validationSchema = Yup.object({
//   start: Yup.string().required(),
//   finish: Yup.string().required(),
//   interval: Yup.string().required(),
// });

function EditScreenshotsSettingsModal({ type, show, onHide, onSubmit, initialValues }) {
  console.log(111666, initialValues);

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log('onSubmit values', values);
      onSubmit(values);
      onHide();
    },
  });

  console.log('formik.errors -', formik.errors);
  console.log('formik.values -', formik.values);

  return (
    <Modal
      show={show && type === EDIT_SCREENSHOT_SETTINGS}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create screenshot files every day
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
              <Form.Label htmlFor="stopTime">Stop time</Form.Label>
              <Form.Control
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
              {`${getFilesPerDay(formik.values)} files`}
            </span>
            {' '}
            per day
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <span className="fw-bold">
              {`${Math.round(getFilesPerDay(formik.values) / 25)} seconds`}
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

export default withModalWrapper(EditScreenshotsSettingsModal);
