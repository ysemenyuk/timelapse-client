/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import format from 'date-fns/format';
import { Modal, Button, Form, Row, Col, Spinner, Placeholder, InputGroup } from 'react-bootstrap';
import _ from 'lodash';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { taskActions } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskName, taskType } from '../../../utils/constants.js';
import { useGetFilesCountQuery } from '../../../api/fileManager.api.js';
import { videoSchema } from '../../../utils/validations.js';

const getDate = (file) => {
  if (file && file.date) {
    return format(new Date(file.date), 'yyyy-MM-dd');
  }
  return format(new Date(), 'yyyy-MM-dd');
};

function AddCreateVideoModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);

  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);
  const selectedCameraStats = useSelector(cameraSelectors.cameraStatsByCameraId(selectedCameraId));

  const formik = useFormik({
    validationSchema: videoSchema,
    initialValues: {
      customName: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      dateRangeType: 'allDates',
      startDate: getDate(selectedCameraStats.firstPhoto),
      endDate: getDate(selectedCameraStats.lastPhoto),
      timeRangeType: 'allTime',
      startTime: '09:00',
      endTime: '18:00',
      duration: 10,
      fps: 30,
    },
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(taskActions.createOne({
        cameraId: selectedCameraId,
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
  const isCustomDates = formik.values.dateRangeType === 'customDates';
  const isCustomTime = formik.values.timeRangeType === 'customTime';

  const queryString = useMemo(() => {
    const query = {
      type: 'photo',
      ...isCustomDates && { date_gte: formik.values.startDate, date_lte: formik.values.endDate },
      ...isCustomTime && { time_gte: formik.values.startTime, time_lte: formik.values.endTime },
    };

    return `?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}`;
  }, [
    formik.values.startDate, formik.values.endDate,
    formik.values.startTime, formik.values.endTime,
    formik.values.timeRangeType, formik.values.dateRangeType,
  ]);

  const getFilesCountQuery = useGetFilesCountQuery({
    cameraId: selectedCameraId,
    query: queryString,
  });

  const { data } = getFilesCountQuery;

  useEffect(() => {
    if (data && _.has(data, 'count')) {
      setFilesCount(data.count);
      formik.setFieldValue(
        'duration',
        Math.round(data.count / formik.values.fps),
      );
    }
  }, [data]);

  const minVideoLength = 10;
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
              <Form.Label htmlFor="customName">FileName</Form.Label>
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

          <div key="inline-radio-dateRangeType" className="mb-3">
            <Form.Check
              inline
              label="AllDates"
              name="dateRangeType"
              type="radio"
              id="allDates"
              onChange={formik.handleChange}
              value="allDates"
              checked={formik.values.dateRangeType === 'allDates'}
            />
            <Form.Check
              inline
              label="CustomDates"
              name="dateRangeType"
              type="radio"
              id="customDates"
              onChange={formik.handleChange}
              value="customDates"
              checked={formik.values.dateRangeType === 'customDates'}
            />
          </div>

          <If condition={isCustomDates}>
            <Row className="mb-4">
              <InputGroup as={Col}>
                <InputGroup.Text id="inputGroup-sizing-sm">StartDate</InputGroup.Text>
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
              </InputGroup>
              <InputGroup as={Col}>
                <InputGroup.Text id="inputGroup-sizing-sm">EndDate</InputGroup.Text>
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
              </InputGroup>
            </Row>
          </If>

          <div key="inline-radio-timeRangeType" className="mb-3">
            <Form.Check
              inline
              label="AllTime"
              name="timeRangeType"
              type="radio"
              id="allTime"
              onChange={formik.handleChange}
              value="allTime"
              checked={formik.values.timeRangeType === 'allTime'}
            />
            <Form.Check
              inline
              label="CustomeTime"
              name="timeRangeType"
              type="radio"
              id="customTime"
              onChange={formik.handleChange}
              value="customTime"
              checked={formik.values.timeRangeType === 'customTime'}
            />
          </div>

          <If condition={isCustomTime}>
            <Row className="mb-4">
              <InputGroup as={Col}>
                <InputGroup.Text id="inputGroup-sizing-sm">StartTime</InputGroup.Text>
                <Form.Control
                // disabled={isRunning}
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
              </InputGroup>
              <InputGroup as={Col}>
                <InputGroup.Text id="inputGroup-sizing-sm">EndTime</InputGroup.Text>
                <Form.Control
                // disabled={isRunning}
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
              </InputGroup>
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
                    Minimum: 300 photos (10 seconds video )
                  </div>
                </When>
                <Otherwise>
                  <div className="mb-3">
                    {`Length (${formik.values.duration} sec)`}
                  </div>
                </Otherwise>
              </Choose>
            </Otherwise>
          </Choose>

          <div className="mb-3">
            {/* <Form.Label>{`Length (${formik.values.duration} sec)`}</Form.Label> */}
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
