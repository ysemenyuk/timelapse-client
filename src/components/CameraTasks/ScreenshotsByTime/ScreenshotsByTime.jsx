import React, { useState, useEffect } from 'react';
import { Col, ListGroup, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Heading from '../../UI/Heading.jsx';
import { calculateFilesPerDay } from '../../../utils/utils.js';
import { modalActions } from '../../../redux/slices/modalSlice.js';
import { EDIT_SCREENSHOTSBYTIME_SETTINGS } from '../../../utils/constants.js';
import ScreenshotsByTimeModal from './ScreenshotsByTimeModal.jsx';
import { taskActions } from '../../../redux/slices/taskSlice.js';

const initialValues = {
  status: '--',
  screenshotsByTimeSettings: {
    startTime: '--:--',
    stopTime: '--:--',
    interval: '--',
  },
};

// const screenshotByTimeData = {
//   status: 'Stopped',
//   screenshotsByTimeSettings: {
//     startTime: '08:00',
//     stopTime: '18:00',
//     interval: '60',
//   },
// };

function ScreenshotsByTime({ selectedCamera, compact }) {
  const dispatch = useDispatch();
  const [screenshotsByTimeTask, setScreenshotsByTimeTask] = useState(initialValues);

  useEffect(() => {
    if (selectedCamera && selectedCamera.screenshotsByTimeTask) {
      setScreenshotsByTimeTask(selectedCamera.screenshotsByTimeTask);
    }
  }, [selectedCamera]);

  const { status, screenshotsByTimeSettings } = screenshotsByTimeTask;
  const { startTime, stopTime, interval } = screenshotsByTimeSettings;

  const isRunning = status === 'Running';
  const files = calculateFilesPerDay(screenshotsByTimeSettings);

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal(EDIT_SCREENSHOTSBYTIME_SETTINGS));
  };

  const handleUpdateScreenshotsByTime = (settings, taskStatus = null) => {
    console.log('handleUpdateTask settings', settings);
    const payload = {
      status: taskStatus || screenshotsByTimeTask.status,
      screenshotsByTimeSettings: { ...settings },
    };

    dispatch(taskActions.updateScreenshotsByTime({
      cameraId: selectedCamera._id,
      taskId: selectedCamera.screenshotsByTimeTask._id,
      payload,
    }));
  };

  // const handleStartScreenshotsByTime = () => {
  //   console.log('handleStart');
  //   handleUpdateScreenshotsByTime(screenshotsByTimeTask.screenshotsByTimeSettings, 'Running');
  // };

  // const handleStopScreenshotsByTime = () => {
  //   console.log('handleStop');
  //   handleUpdateScreenshotsByTime(screenshotsByTimeTask.screenshotsByTimeSettings, 'Stopped');
  // };

  if (!selectedCamera) {
    return null;
  }

  return (
    <>
      <Choose>
        <When condition={compact}>
          <ListGroup className="mb-3" role="button" onClick={handleOpenEditModal}>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-start">
                <div className="me-3">Screenshots by time</div>
                <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
              </div>
              <div className="w-75 text-truncate text-muted">
                {`Start: ${startTime}, Stop: ${stopTime}, Interval: ${interval} sec`}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </When>
        <Otherwise>
          <Col md={12} className="mb-4">
            <Heading lvl={6} className="mb-3">
              Screenshots by time
            </Heading>

            <ListGroup className="mb-3" role="button" onClick={handleOpenEditModal}>
              <ListGroup.Item className="d-flex">
                <div className="me-3 w-50">Status</div>
                <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <div className="me-3 w-50">Start time</div>
                <span>{startTime}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <div className="me-3 w-50">Stop time</div>
                <span>{stopTime}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <div className="me-3 w-50">Interval, sec</div>
                <span>{interval}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex">
                <div className="me-3 w-50">Files/day</div>
                <span>{files}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Otherwise>
      </Choose>

      <ScreenshotsByTimeModal
        initialValues={screenshotsByTimeSettings}
        onSubmit={handleUpdateScreenshotsByTime}
      />
    </>
  );
}

export default ScreenshotsByTime;
