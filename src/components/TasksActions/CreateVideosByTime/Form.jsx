import React from 'react';
import { Form, Row, Col, ProgressBar, InputGroup } from 'react-bootstrap';
// import format from 'date-fns/format';
// import fromUnixTime from 'date-fns/fromUnixTime';
// import { useSelector } from 'react-redux';
// import weatherService from '../../../api/weather.service';
import { taskStatus } from '../../../utils/constants';
// import { calculateFilesPerDay } from '../../../utils/utils';
// import { cameraSelectors } from '../../../redux/camera/cameraSlice';

function CreateVideosByTimeForm({ formik, status }) {
  // const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  const isRunning = status === taskStatus.RUNNING;

  return (
    <>
      <div className="mb-3">
        Create videos by time
      </div>

      <Form className="mb-4">

        <div className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="interval">Video length (seconds)</Form.Label>
            <Form.Control
              disabled={isRunning}
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
        </div>

        <div className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="interval">Interval</Form.Label>
            <Form.Select
              disabled={isRunning}
              name="interval"
              id="interval"
              value={formik.values.interval}
              onChange={formik.handleChange}

            >
              <option value="oneTimeMonth">oneTimeMonth</option>
              <option value="oneTimeWeek">oneTimeWeek</option>
              <option value="oneTimeDay">oneTimeDay</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="mb-3">
          <Form.Group as={Col}>
            <Form.Label htmlFor="interval">DateRange</Form.Label>
            <div key="inline-radio-dateRangeType">
              <Form.Check
                disabled={isRunning}
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
                disabled={isRunning}
                inline
                label="CustomeDates"
                name="dateRangeType"
                type="radio"
                id="customDates"
                onChange={formik.handleChange}
                value="customDates"
                checked={formik.values.dateRangeType === 'customDates'}
              />
            </div>
          </Form.Group>
        </div>

        <If condition={formik.values.dateRangeType === 'customDates'}>
          <div className="mb-3">
            <Form.Select
              disabled={isRunning}
              name="dateRange"
              id="dateRange"
              value={formik.values.dateRange}
              onChange={formik.handleChange}
            >
              <option value="lastMonth">lastMonth</option>
              <option value="lastWeek">lastWeek</option>
              <option value="lastDay">lastDay</option>
            </Form.Select>
          </div>
        </If>

        <div className="mb-3">
          <Form.Group as={Col}>
            <Form.Label htmlFor="interval">DayTimeRange</Form.Label>
            <div key="inline-radio-timeRangeType">
              <Form.Check
                disabled={isRunning}
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
                disabled={isRunning}
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
          </Form.Group>
        </div>

        <If condition={formik.values.timeRangeType === 'customTime'}>
          <Row className="mb-4">
            <InputGroup as={Col}>
              <InputGroup.Text id="inputGroup-sizing-sm">StartTime</InputGroup.Text>
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
            </InputGroup>
            <InputGroup as={Col}>
              <InputGroup.Text id="inputGroup-sizing-sm">EndTime</InputGroup.Text>
              <Form.Control
                disabled={isRunning}
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

        <div className="mb-3">
          <Form.Group as={Col}>
            <Form.Label htmlFor="interval">DeleteExistingFile</Form.Label>
            <div key="inline-radio-deletExistingFile">
              <Form.Check
                disabled={isRunning}
                inline
                label="Yes"
                name="deletExistingFile"
                type="radio"
                id="yes"
                onChange={formik.handleChange}
                value="yes"
                checked={formik.values.deletExistingFile === 'yes'}
              />
              <Form.Check
                disabled={isRunning}
                inline
                label="No"
                name="deletExistingFile"
                type="radio"
                id="no"
                onChange={formik.handleChange}
                value="no"
                checked={formik.values.deletExistingFile === 'no'}
              />
            </div>
          </Form.Group>
        </div>
      </Form>

      <div className="mb-3">
        {`Status: ${status}`}
      </div>

      <If condition={isRunning}>
        <ProgressBar animated now={100} />
      </If>

      <If condition={formik.errors && formik.errors.network}>
        {formik.errors.network}
      </If>
    </>
  );
}

export default CreateVideosByTimeForm;
