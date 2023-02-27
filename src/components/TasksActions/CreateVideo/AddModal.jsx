/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import * as Yup from 'yup';
import { Modal, Button, Form, Row, Col, Spinner, Placeholder } from 'react-bootstrap';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskName, taskType } from '../../../utils/constants.js';
import { useGetFilesCountQuery } from '../../../api/fileManager.api.js';
// import Message from '../../UI/Message.jsx';

const validationSchema = Yup.object({
  customName: Yup.string().min(2).max(20),
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
      customName: 'filename',
      startDate: getDate(selectedCamera.firstPhoto),
      endDate: getDate(selectedCamera.lastPhoto),
      timeRangeType: 'allTime',
      customTimeStart: '09:00',
      customTimeEnd: '18:00',
      duration: 10,
      fps: 25, // default
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
  const isCustomTime = formik.values.timeRangeType === 'customTime';

  const queryString = useMemo(() => {
    const query = {
      type: 'photo',
      date_gte: formik.values.startDate,
      date_lte: formik.values.endDate,
      ...isCustomTime && { time_gte: formik.values.customTimeStart, time_lte: formik.values.customTimeEnd },
    };

    return `?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}`;
  }, [
    formik.values.startDate, formik.values.endDate, formik.values.timeRangeType,
    formik.values.customTimeStart, formik.values.customTimeEnd,
  ]);

  const getFilesCountQuery = useGetFilesCountQuery({
    cameraId: selectedCamera._id,
    query: queryString,
  });

  const { data } = getFilesCountQuery;

  useEffect(() => {
    if (data && data.count) {
      setFilesCount(data.count);
      formik.setFieldValue(
        'duration',
        Math.round(data.count / formik.values.fps),
      );
    }
  }, [data]);

  const minVideoLength = 1;
  const maxVideoLength = Math.round(filesCount / formik.values.fps);

  const isLoading = getFilesCountQuery.isFetching;
  const isDidabled = maxVideoLength < minVideoLength || isLoading;

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
              <Form.Label htmlFor="customName">File name</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.customName}
                name="customName"
                id="customName"
                type="string"
                isInvalid={formik.errors && formik.errors.customName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.customName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-4">
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
              inline
              label="AllDayTime"
              name="timeRangeType"
              type="radio"
              id="allTime"
              onChange={formik.handleChange}
              value="allTime"
              checked={formik.values.timeRangeType === 'allTime'}
            />
            <Form.Check
              inline
              label="CustomeDayTime"
              name="timeRangeType"
              type="radio"
              id="customTime"
              onChange={formik.handleChange}
              value="customTime"
              checked={formik.values.timeRangeType === 'customTime'}
            />
          </div>

          <If condition={isCustomTime}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label htmlFor="customTimeStart">Start time</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.customTimeStart}
                  name="customTimeStart"
                  id="customTimeStart"
                  type="time"
                  isInvalid={formik.errors && formik.errors.customTimeStart}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors && formik.errors.startTime}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor="customTimeEnd">End time</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.customTimeEnd}
                  name="customTimeEnd"
                  id="customTimeEnd"
                  type="time"
                  isInvalid={formik.errors && formik.errors.customTimeEnd}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors && formik.errors.customTimeEnd}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </If>

          <Choose>
            <When condition={isLoading}>
              <div className="mb-3">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={7} bg="secondary" />
                </Placeholder>
              </div>
              <div className="mb-3">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={4} bg="secondary" />
                </Placeholder>
              </div>
            </When>
            <Otherwise>
              <div className="mb-3">
                {`Found: ${filesCount} photos (${maxVideoLength} seconds video)`}
              </div>
              <Choose>
                <When condition={isDidabled}>
                  <div className="mb-3">
                    Minimum: 200 photos (10 seconds video )
                  </div>
                </When>
                <Otherwise>
                  <div className="mb-3">
                    {`Video length (${formik.values.duration} sec)`}
                  </div>
                </Otherwise>
              </Choose>
            </Otherwise>
          </Choose>

          <div className="mb-3">
            {/* <Form.Label>{`Video length (${formik.values.duration} sec)`}</Form.Label> */}
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
