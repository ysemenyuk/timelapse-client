/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import fileManagerService from '../../../api/fileManager.service.js'; //
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskStatus } from '../../../utils/constants.js';

const videoSettingsInitialValues = {
  startDate: '2022-05-01',
  endDate: '2022-06-01',
  duration: 60,
  fps: 20,
};

function EditCreateVideoModal({ onHide, data: { taskId } }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne); // !!!
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);
  const task = useSelector(taskSelectors.selectTaskById(taskId));

  const { status, message, settings, ...rest } = task;
  const isRunning = status === taskStatus.RUNNING;

  const handleDelete = () => {
    dispatch(taskActions.deleteOne({
      cameraId: selectedCameraId,
      taskId,
    }))
      .then(() => {
        onHide();
      })
      .catch((e) => {
        console.log('- catch error -', e);
      });
  };

  const formik = useFormik({
    initialValues: videoSettingsInitialValues,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(taskActions.updateOne({
        cameraId: selectedCameraId,
        taskId: task._id,
        payload: {
          ...rest,
          setings: values,
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

  useEffect(() => {
    if (!isRunning) {
      const query = {
        startDate: formik.values.startDate,
        endDate: formik.values.endDate,
        type: 'photoByTime',
      };

      fileManagerService.getCount(selectedCameraId, query)
        .then((resp) => {
          setFilesCount(resp.data.count);
        });
    }
  }, [formik.values.startDate, formik.values.endDate]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create video</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          Create video file from screenshots
        </div>

        <Form className="mb-3">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="startDate">Start date</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.startDate}
                name="startDate"
                id="startDate"
                type="date"
                disabled={isRunning}
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
                disabled={isRunning}
                isInvalid={formik.errors && formik.errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.endDate}
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
                disabled={isRunning}
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
                disabled={isRunning}
                isInvalid={formik.errors && formik.errors.fps}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.fps}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>

        <div className="mb-3">
          {`Total: ${filesCount} files -- ${Math.round(filesCount / formik.values.fps)} seconds video (${formik.values.fps} fps)`}
        </div>

        <div className="mb-3">
          {`Required: ${formik.values.duration * formik.values.fps} files -- ${formik.values.duration} seconds video (${formik.values.fps} fps)`}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex align-items-center gap-2">
          <Button
            key="delete"
            size="sm"
            onClick={handleDelete}
            disabled={isRunning}
          >
            Delete
          </Button>
          <If condition={isRunning}>
            <Button
              key="cancel"
              size="sm"
            >
              Cancel
            </Button>
          </If>
        </div>
        <div className="d-flex align-items-center gap-2">
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
          <Button
            key="close"
            size="sm"
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            key="repeat"
            size="sm"
            onClick={formik.handleSubmit}
            disabled={isRunning}
          >
            Repeat
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export default EditCreateVideoModal;
