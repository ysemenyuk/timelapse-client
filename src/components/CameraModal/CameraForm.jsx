import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Error from '../UI/Error.jsx';

function CameraForm({ formik }) {
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);
  return (
    <>
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
          <Form.Label htmlFor="location">Location (Geographical coordinates)</Form.Label>
          <Row>
            <InputGroup as={Col}>
              <InputGroup.Text id="lat">lat</InputGroup.Text>
              <Form.Control
                placeholder="latitude"
                onChange={formik.handleChange}
                value={formik.values.location.latitude}
                name="location.latitude"
                id="latitude"
                type="text"
                isInvalid={formik.errors && formik.errors.location && formik.errors.location.latitude}
              />
            </InputGroup>

            <InputGroup as={Col}>
              <InputGroup.Text id="lon">lon</InputGroup.Text>
              <Form.Control
                placeholder="longitude"
                onChange={formik.handleChange}
                value={formik.values.location.longitude}
                name="location.longitude"
                id="longitude"
                type="text"
                isInvalid={formik.errors && formik.errors.location && formik.errors.location.longitude}
              />
            </InputGroup>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="model">CameraModel</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.model}
            name="model"
            id="model"
            type="text"
            isInvalid={formik.errors && formik.errors.model}
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors && formik.errors.model}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="photoUrl">PhotoUrl</Form.Label>
          <InputGroup hasValidation className="mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.photoUrl}
              name="photoUrl"
              id="photoUrl"
              type="url"
              isInvalid={formik.errors && formik.errors.photoUrl}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors && formik.errors.photoUrl}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="rtspUrl">RtspUrl</Form.Label>
          <InputGroup hasValidation className="mb-3">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.rtspUrl}
              name="rtspUrl"
              id="rtspUrl"
              type="url"
              isInvalid={formik.errors && formik.errors.rtspUrl}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors && formik.errors.rtspUrl}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>

      <If condition={formik.errors && formik.errors.network}>
        <Error message="Networ error .." />
      </If>
    </>
  );
}

export default CameraForm;
