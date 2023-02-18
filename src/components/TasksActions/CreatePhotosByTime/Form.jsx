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

  console.log('formik.errors -', formik.errors);
  console.log('formik.values -', formik.values);

  const [startTime, setStartTime] = useState(false);
  const [stopTime, setStopTime] = useState(false);

  // const [sunTime, setSunTime] = useState(false);
  // console.log('sunTime', sunTime);

  useEffect(() => {
    if (formik.values.timeRangeType === 'allTime') {
      setStartTime('00:00');
      setStopTime('23:59');
    }

    if (formik.values.timeRangeType === 'sunTime') {
      if (isLocationExist) {
        weatherService.getCurrentDateWeather([latitude, longitude])
          .then((resp) => {
            setStartTime(format(fromUnixTime(resp.data.sys.sunrise), 'HH:mm'));
            setStopTime(format(fromUnixTime(resp.data.sys.sunset), 'HH:mm'));
          });
      } else {
        setStartTime('08:00');
        setStopTime('20:00');
      }
    }

    if (formik.values.timeRangeType === 'customTime') {
      setStartTime(formik.values.customTimeStart);
      setStopTime(formik.values.customTimeStop);
    }

    // TODO clear request then unmount
  }, [formik.values.timeRangeType, formik.values.customTimeStart, formik.values.customTimeStop]);

  const isRunning = status === taskStatus.RUNNING;
  const files = useMemo(
    () => calculateFilesPerDay(startTime, stopTime, formik.values.interval),
    [startTime, stopTime, formik.values.interval],
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
                  <div>{`Sunset: ${stopTime}`}</div>
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
                  value={formik.values.customTimeStart}
                  name="customTimeStart"
                  id="customTimeStart"
                  type="time"
                  isInvalid={formik.errors && formik.errors.customTimeStart}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors && formik.errors.customTimeStart}
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup as={Col}>
                <InputGroup.Text id="inputGroup-sizing-sm">StopTime</InputGroup.Text>
                <Form.Control
                  disabled={isRunning}
                  onChange={formik.handleChange}
                  value={formik.values.customTimeStop}
                  name="customTimeStop"
                  id="customTimeStop"
                  type="time"
                  isInvalid={formik.errors && formik.errors.customTimeStop}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors && formik.errors.customTimeStop}
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
