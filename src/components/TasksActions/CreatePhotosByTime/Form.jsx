import React from 'react';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { taskStatus } from '../../../utils/constants';
import { calculateFilesPerDay } from '../../../utils/utils';

function CreatePhotosByTimeForm({ formik, status }) {
  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  const isRunning = status === taskStatus.RUNNING;
  const files = calculateFilesPerDay(formik.values.startTime, formik.values.stopTime, formik.values.interval);

  return (
    <>
      <div className="mb-3">
        Create photos by time
      </div>

      <Form className="mb-3">
        <div key="inline-radio" className="mb-3">
          <Form.Check
            disabled
            inline
            label="AllTime"
            name="group1"
            type="radio"
            id="inline-radio-2"
          />
          <Form.Check
            disabled
            inline
            label="SunTime"
            name="group1"
            type="radio"
            id="inline-radio-3"
          />
          <Form.Check
            checked
            inline
            label="CustomTime"
            name="group1"
            type="radio"
            id="inline-radio-1"
          />
        </div>

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

      <hr />

      <div className="mb-3">
        {`${files} files = ${Math.round(files / 20)} seconds video (20fps)`}
      </div>

      <div className="mb-3">
        {`Status: ${status}`}
      </div>

      <If condition={isRunning}>
        <ProgressBar animated now={100} />
      </If>
    </>
  );
}

export default CreatePhotosByTimeForm;
