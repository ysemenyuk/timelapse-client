import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Spinner, InputGroup, Modal } from 'react-bootstrap';
import _ from 'lodash';
import Error from '../UI/Error.jsx';

const validationSchema = Yup.object({
  name: Yup.string().required().min(3).max(20),
  description: Yup.string().required().min(3).max(30),
  screenshotLink: Yup.string().url(),
  rtspLink: Yup.string(),
});

const values = {
  name: '',
  description: '',
  screenshotLink: '',
  rtspLink: '',
};

function CameraForm({ initialValues = values, onCancel, onSubmit }) {
  const formik = useFormik({
    initialValues: _.pick(initialValues, ['name', 'description', 'screenshotLink', 'rtspLink']),
    validationSchema,
    onSubmit,
  });

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <>
      <Modal.Body>
        <Form className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              type="text"
              isInvalid={formik.errors && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors && formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              id="description"
              type="text"
              isInvalid={formik.errors && formik.errors.description}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors && formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="screenshotLink">Screenshot Link</Form.Label>
            <InputGroup hasValidation className="mb-3">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.screenshotLink}
                name="screenshotLink"
                id="screenshotLink"
                type="url"
                isInvalid={formik.errors && formik.errors.screenshotLink}
              />
              {/* <Button variant="outline-secondary" id="button-addon1">
              Check
            </Button> */}
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.screenshotLink}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>

        <If condition={formik.errors && formik.errors.network}>
          <Error message="Networ error .." />
        </If>
      </Modal.Body>

      <Modal.Footer>
        {formik.isSubmitting && <Spinner as="span" animation="border" size="sm" />}
        <Button
          size="sm"
          onClick={onCancel}
          disabled={formik.isSubmitting}
          variant="primary"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
          variant="primary"
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default CameraForm;
