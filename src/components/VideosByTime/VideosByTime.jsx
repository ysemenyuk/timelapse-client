import React, { useEffect, useState } from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice.js';
import Heading from '../UI/Heading.jsx';
import EditVideosByTimeSettingsModal from '../Modals/EditVideosByTimeSettingsModal.jsx';
import { EDIT_VIDEOSBYTIME_SETTINGS } from '../../utils/constants.js';
import taskThunks from '../../thunks/taskThunks.js';

const initialValues = {
  status: '--',
  videosByTimeSettings: {
    startTime: '10:00',
    duration: '60',
    fps: '25',
  },
};

function VideosByTime({ selectedCamera, row }) {
  const dispatch = useDispatch();
  const [videosByTimeTask, setVideosByTimeTask] = useState(initialValues);

  useEffect(() => {
    if (selectedCamera && selectedCamera.videosByTimeTask) {
      setVideosByTimeTask(selectedCamera.videosByTimeTask);
    }
  }, [selectedCamera]);

  const { status, videosByTimeSettings } = videosByTimeTask;
  const { startTime, duration, fps } = videosByTimeSettings;

  const isRunning = status === 'Running';
  const files = duration * fps || '--';

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal(EDIT_VIDEOSBYTIME_SETTINGS));
  };

  const handleUpdateVideosByTime = (settings, taskStatus = null) => {
    console.log('handleUpdateTask settings', settings);
    const payload = {
      status: taskStatus || videosByTimeTask.status,
      videosByTimeSettings: { ...settings },
    };

    dispatch(taskThunks.updateVideosByTime({
      cameraId: selectedCamera._id,
      taskId: selectedCamera.videosByTimeTask._id,
      payload,
    }));
  };

  const handleStartVideosByTime = () => {
    console.log('handleStart');
    handleUpdateVideosByTime(videosByTimeTask.videosByTimeSettings, 'Running');
  };

  const handleStopVideosByTime = () => {
    console.log('handleStop');
    handleUpdateVideosByTime(videosByTimeTask.videosByTimeSettings, 'Stopped');
  };

  if (!selectedCamera) {
    return null;
  }
  return (
    <Col md={12} className="mb-4">
      <Choose>
        <When condition={row}>
          <ListGroup className="mb-3" role="button" onClick={handleOpenEditModal}>
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-start">
                <div className="me-3">Video of the day</div>
                <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
              </div>
              <div className="w-75 text-truncate text-muted">
                {`Start: ${startTime}, Duration: ${duration}, Fps: ${fps}`}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </When>
        <Otherwise>
          <Heading lvl={6} className="mb-3">
            Video of the day
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
              <div className="me-3 w-50">Duration, sec</div>
              <span>{duration}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex">
              <div className="me-3 w-50">Fps</div>
              <span>{fps}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex">
              <div className="me-3 w-50">Files</div>
              <span>{files}</span>
            </ListGroup.Item>
          </ListGroup>
        </Otherwise>
      </Choose>

      <>
        <Button
          onClick={handleStartVideosByTime}
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
          onClick={handleStopVideosByTime}
          disabled={isRunning}
          variant="primary"
          size="sm"
          className="me-2"
        >
          Start
        </Button>
      </>

      <EditVideosByTimeSettingsModal
        initialValues={videosByTimeSettings}
        onSubmit={handleUpdateVideosByTime}
      />
    </Col>
  );
}

export default VideosByTime;
