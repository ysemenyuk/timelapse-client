/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import fileManagerService from '../../../api/fileManager.service.js'; //
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskName, taskType } from '../../../utils/constants.js';
import Message from '../../UI/Message.jsx';

// const videoSettingsInitialValues = {
//   startDate: '2022-06-01', // today
//   endDate: '2022-07-31', // today
//   startTime: '08:00',
//   endTime: '20:00',
//   duration: 60,
//   fps: 20,
// };

const validationSchema = Yup.object({
  filename: Yup.string().required().min(2).max(20),
});

const getDate = (file) => {
  if (file && file.date) {
    return format(new Date(file.date), 'yyyy-MM-dd');
  }
  return format(new Date(), 'yyyy-MM-dd');
};

function AddCreateVideoModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      filename: '',
      startDate: getDate(selectedCamera.firstPhoto),
      endDate: getDate(selectedCamera.lastPhoto),
      startTime: '08:00',
      endTime: '20:00',
      duration: 10,
      fps: 20,
    },
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(taskActions.createOne({
        cameraId: selectedCamera._id,
        payload: {
          name: taskName.CREATE_VIDEO,
          type: taskType.ONE_TIME,
          videoSettings: values,
        } }))
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
  const maxVideoLength = Math.round(filesCount / formik.values.fps);
  const minVideoLength = 10;
  const isDidabled = false; // maxVideoLength < minVideoLength;

  useEffect(() => {
    const query = {
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      type: 'photo',
    };

    const queryString = `?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}`;

    fileManagerService.getCount(selectedCamera._id, queryString)
      .then((resp) => {
        setFilesCount(resp.data.count);
      });

    // TODO clear request then unmount
  }, [formik.values.startDate, formik.values.endDate]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create video</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          Create video from photos
        </div>

        <Form className="mb-3">

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="filename">File name</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.filename}
                name="filename"
                id="filename"
                type="string"
                isInvalid={formik.errors && formik.errors.filename}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.filename}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startDate">Start date</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.startDate}
                name="startDate"
                id="startDate"
                type="date"
                isInvalid={formik.errors && formik.errors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.startDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label htmlFor="endDate">End date</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.endDate}
                name="endDate"
                id="endDate"
                type="date"
                isInvalid={formik.errors && formik.errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.endDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div key="inline-radio" className="mb-3">
            <Form.Check
              checked
              inline
              label="AllFilesFromDay"
              type="radio"
              id="inline-radio-1"
            />
            <Form.Check
              disabled
              inline
              label="CustomeTime"
              type="radio"
              id="inline-radio-2"
            />
          </div>

          <Row className="mb-4">
            <Form.Group as={Col}>
              {/* <Form.Label htmlFor="startTime">Start time</Form.Label> */}
              <Form.Control
                disabled
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
              {/* <Form.Label htmlFor="endTime">End time</Form.Label> */}
              <Form.Control
                disabled
                onChange={formik.handleChange}
                value={formik.values.endTime}
                name="endTime"
                id="endTime"
                type="time"
                isInvalid={formik.errors && formik.errors.endTime}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.endTime}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <div className="mb-4">
            {`Found: ${filesCount} photos (${maxVideoLength} sec video)`}
          </div>

          <div className="mb-4">
            <Form.Label>{`Video length (${formik.values.duration} sec)`}</Form.Label>
            <Form.Range
              disabled={isDidabled}
              name="duration"
              id="duration"
              min={minVideoLength}
              max={maxVideoLength}
              value={formik.values.duration}
              onChange={formik.handleChange}
            />
          </div>

        </Form>

        <If condition={isDidabled}>
          <Message variant="warning">
            Minimum 10 sec video length.
          </Message>
        </If>

      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
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
          disabled={isDidabled}
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddCreateVideoModal;
