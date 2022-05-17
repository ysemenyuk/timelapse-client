import React, { useState, useEffect } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Heading from '../UI/Heading.jsx';
import { getFilesPerDay } from '../../utils/utils.js';
import { modalActions } from '../../store/modalSlice.js';
import { EDIT_SCREENSHOT_SETTINGS } from '../../utils/constants.js';
import taskService from '../../api/task.service.js';
import EditScreenshotsSettingsModal from '../Modals/EditScreenshotsSettingsModal.jsx';

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
  const [screenshotsData, setScreenshotsData] = useState(initialValues);

  useEffect(() => {
    if (selectedCamera && selectedCamera.screenshotsByTimeTask) {
      taskService
        .getOne(selectedCamera._id, selectedCamera.screenshotsByTimeTask)
        .then((resp) => {
          setScreenshotsData({ ...resp.data });
        });
    } else {
      setScreenshotsData(initialValues);
    }
  }, [selectedCamera]);

  const { status, screenshotsByTimeSettings } = screenshotsData;
  const { startTime, stopTime, interval } = screenshotsByTimeSettings;

  const isRunning = status === 'Running';
  const files = getFilesPerDay(screenshotsByTimeSettings);

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal(EDIT_SCREENSHOT_SETTINGS));
  };

  // const handleCreateTask = () => {
  //   console.log('handleCreateTask');
  //   taskService
  //     .createOne(selectedCamera._id, screenshotByTimeData)
  //     .then((resp) => {
  //       setScreenshotsData({ ...resp.data });
  //     });
  // };

  const handleUpdateScreenshotByTimeTask = (settings, taskStatus = null) => {
    console.log('handleUpdateTask settings', settings);
    const data = {
      status: taskStatus || screenshotsData.status,
      screenshotsByTimeSettings: { ...settings },
    };

    taskService
      .screenshotByTimeTask(selectedCamera._id, selectedCamera.screenshotsByTimeTask, data)
      .then((resp) => {
        setScreenshotsData({ ...resp.data });
      });
  };

  const handleStartScreenshotByTime = () => {
    console.log('handleStart');
    handleUpdateScreenshotByTimeTask(screenshotsData.screenshotsByTimeSettings, 'Running');
  };

  const handleStopScreenshotByTime = () => {
    console.log('handleStop');
    handleUpdateScreenshotByTimeTask(screenshotsData.screenshotsByTimeSettings, 'Stopped');
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
            Get screenshots by time
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
        <Button onClick={handleStopScreenshotByTime} disabled={!isRunning} variant="primary" size="sm" className="me-2">
          Stop
        </Button>
        <Button onClick={handleOpenEditModal} disabled={isRunning} variant="primary" size="sm" className="me-2">
          EditSettings
        </Button>
        <Button onClick={handleStartScreenshotByTime} disabled={isRunning} variant="primary" size="sm" className="me-2">
          Start
        </Button>
        {/*
        <Button onClick={handleCreateTask} variant="primary" size="sm" className="me-2">
          Create
        </Button> */}
      </>

      <EditScreenshotsSettingsModal
        initialValues={screenshotsByTimeSettings}
        onSubmit={handleUpdateScreenshotByTimeTask}
      />
    </Col>
  );
}

export default ScreenshotsByTime;
