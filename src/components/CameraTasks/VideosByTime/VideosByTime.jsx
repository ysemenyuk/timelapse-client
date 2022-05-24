import React from 'react';
import { Col, ListGroup, Badge, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../redux/slices/modalSlice.js';
import Heading from '../../UI/Heading.jsx';
import { VIDEOSBYTIME_TASK } from '../../../utils/constants.js';

function VideosByTime({ task, compact }) {
  const dispatch = useDispatch();

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal(VIDEOSBYTIME_TASK));
  };

  if (!task) {
    return null;
  }

  const { status, videosByTimeSettings } = task;
  const { startTime, duration, fps } = videosByTimeSettings;

  const isRunning = status === 'Running';
  const files = duration * fps || '--';

  return (
    <Choose>
      <When condition={compact}>
        <Card bsPrefix="card mb-3" role="button" onClick={handleOpenEditModal}>
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-start">
            VideosByTime
            <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
          </Card.Header>
          <Card.Body bsPrefix="card-body text-truncate  pt-2 pb-2">
            {`Start: ${startTime}, Duration: ${duration}, Fps: ${fps}`}
          </Card.Body>
        </Card>
      </When>

      <Otherwise>
        <Col md={12} className="mb-4">
          <Heading lvl={6} className="mb-3">
            Videos By Time
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
        </Col>
      </Otherwise>
    </Choose>
  );
}

export default VideosByTime;
