import React, { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col, ProgressBar, InputGroup } from 'react-bootstrap';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import { useSelector } from 'react-redux';
import weatherService from '../../../api/weather.service';
import { taskStatus } from '../../../utils/constants';
import { calculateFilesPerDay } from '../../../utils/utils';
import { cameraSelectors } from '../../../redux/camera/cameraSlice';

function CreatePhotosByTimeForm({ formik, status }) {
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);
  const { location: { latitude, longitude } } = selectedCamera;
  const isLocationExist = latitude && longitude;

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  const [startTime, setStartTime] = useState(false);
  const [endTime, setEndTime] = useState(false);

  // const [sunTime, setSunTime] = useState(false);
  // console.log('sunTime', sunTime);

  useEffect(() => {
    if (formik.values.timeRangeType === 'allTime') {
      setStartTime('00:00');
      setEndTime('23:59');
    }

    if (formik.values.timeRangeType === 'sunTime') {
      if (isLocationExist) {
        weatherService.getCurrentDateWeather([latitude, longitude])
          .then((resp) => {
            setStartTime(format(fromUnixTime(resp.data.sys.sunrise), 'HH:mm'));
            setEndTime(format(fromUnixTime(resp.data.sys.sunset), 'HH:mm'));
          });
      } else {
        setStartTime('08:00');
        setEndTime('20:00');
      }
    }

    if (formik.values.timeRangeType === 'customTime') {
      setStartTime(formik.values.startTime);
      setEndTime(formik.values.endTime);
    }

    // TODO clear request then unmount
  }, [formik.values.timeRangeType, formik.values.startTime, formik.values.endTime]);

  const isRunning = status === taskStatus.RUNNING;
  const files = useMemo(
    () => calculateFilesPerDay(startTime, endTime, formik.values.interval),
    [startTime, endTime, formik.values.interval],
  );

  return (
    <>
      <div className="mb-3">
        Create photos by time
      </div>

      <Form className="mb-4">
        <InputGroup className="mb-4">
          <InputGroup.Text id="inputGroup-sizing-sm">Interval (seconds)</InputGroup.Text>
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
        </InputGroup>

        <div role="group" key="inline-radio" className="mb-3">
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
            label="SunTime"
            name="timeRangeType"
            type="radio"
            id="sunTime"
            onChange={formik.handleChange}
            value="sunTime"
            checked={formik.values.timeRangeType === 'sunTime'}
          />
          <Form.Check
            inline
            label="CustomTime"
            name="timeRangeType"
            type="radio"
            id="customTime"
            onChange={formik.handleChange}
            value="customTime"
            checked={formik.values.timeRangeType === 'customTime'}
          />
        </div>

        <Choose>
          <When condition={formik.values.timeRangeType === 'sunTime'}>
            <Choose>
              <When condition={isLocationExist}>
                <div className="d-flex gap-2 justify-content-start align-items-center mb-3">
                  <div>{`Sunrise: ${startTime}`}</div>
                  <div>{`Sunset: ${endTime}`}</div>
                </div>
              </When>
              <Otherwise>
                <div className="mb-3">
                  <div>Set location in camera settings for make photos by sun.</div>
                  <div>Default time: 08:00 - 20:00</div>
                </div>
              </Otherwise>
            </Choose>

          </When>

          <When condition={formik.values.timeRangeType === 'customTime'}>
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
          </When>
        </Choose>
      </Form>

      <div className="mb-3">
        {`${files} photos per day = ${Math.round(files / 20)} seconds video`}
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
