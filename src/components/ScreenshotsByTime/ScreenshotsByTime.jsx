import React, { useState, useEffect } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Heading from '../UI/Heading.jsx';
import { calculateFilesPerDay } from '../../utils/utils.js';
import { modalActions } from '../../store/modalSlice.js';
import { EDIT_SCREENSHOTSBYTIME_SETTINGS } from '../../utils/constants.js';
import EditScreenshotsSettingsModal from '../Modals/EditScreenshotsSettingsModal.jsx';
import taskThunks from '../../thunks/taskThunks.js';

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

function ScreenshotsByTime({ selectedCamera, row }) {
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

    dispatch(taskThunks.updateScreenshotsByTime({
      cameraId: selectedCamera._id,
      taskId: selectedCamera.screenshotsByTimeTask._id,
      payload,
    }));
  };

  const handleStartScreenshotsByTime = () => {
    console.log('handleStart');
    handleUpdateScreenshotsByTime(screenshotsByTimeTask.screenshotsByTimeSettings, 'Running');
  };

  const handleStopScreenshotsByTime = () => {
    console.log('handleStop');
    handleUpdateScreenshotsByTime(screenshotsByTimeTask.screenshotsByTimeSettings, 'Stopped');
  };

  if (!selectedCamera) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Choose>
        <When condition={row}>
          <ListGroup className="mb-3">
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-start">
                <div className="me-3">Make screenshots by time</div>
                <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
              </div>
              <div className="w-75 text-truncate text-muted">
                {`Start: ${startTime}, Stop: ${stopTime}, Interval: ${interval} sec, Files/day: ${files}`}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </When>
        <Otherwise>
          <Heading lvl={6} className="mb-3">
            Screenshots by time
          </Heading>

          <ListGroup className="mb-3">
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
        </Otherwise>
      </Choose>

      <>
        <Button
          onClick={handleStopScreenshotsByTime}
          disabled={!isRunning}
          variant="primary"
          size="sm"
          className="me-2"
        >
          Stop
        </Button>
        <Button
          onClick={handleOpenEditModal}
          disabled={isRunning}
          variant="primary"
          size="sm"
          className="me-2"
        >
          EditSettings
        </Button>
        <Button
          onClick={handleStartScreenshotsByTime}
          disabled={isRunning}
          variant="primary"
          size="sm"
          className="me-2"
        >
          Start
        </Button>
      </>

      <EditScreenshotsSettingsModal
        initialValues={screenshotsByTimeSettings}
        onSubmit={handleUpdateScreenshotsByTime}
      />
    </Col>
  );
}

export default ScreenshotsByTime;
