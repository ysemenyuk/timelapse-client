import React from 'react';
import { Col, ListGroup, Badge, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Heading from '../../UI/Heading.jsx';
import { calculateFilesPerDay } from '../../../utils/utils.js';
import { modalActions } from '../../../redux/modalSlice.js';
import { SCREENSHOTSBYTIME_TASK } from '../../../utils/constants.js';

function ScreenshotsByTime({ task, compact }) {
  const dispatch = useDispatch();

  const handleOpenEditModal = () => {
    dispatch(modalActions.openModal(SCREENSHOTSBYTIME_TASK));
  };

  if (!task) {
    return null;
  }

  const { status, screenshotsByTimeSettings } = task;
  const { startTime, stopTime, interval } = screenshotsByTimeSettings;

  const isRunning = status === 'Running';
  const files = calculateFilesPerDay(startTime, stopTime, interval);

  return (
    <Choose>
      <When condition={compact}>
        <Card bsPrefix="card mb-3" role="button" onClick={handleOpenEditModal}>
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-start">
            PhotosByTime
            <Badge bg={isRunning ? 'success' : 'secondary'}>{isRunning ? 'Running' : 'Stopped'}</Badge>
          </Card.Header>
          <Card.Body bsPrefix="card-body text-truncate pt-2 pb-2">
            {`Start: ${startTime}, Stop: ${stopTime}, Interval: ${interval} sec`}
          </Card.Body>
        </Card>
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
  );
}

export default ScreenshotsByTime;
