import React from 'react';
import { Col, Button, ListGroup, Badge } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
// import {useSelector, useDispatch } from 'react-redux';
// import { formActions } from '../store/formSlice.js';
// import cameraThunks from '../thunks/cameraThunks.js';

const VideoStatus = ({ selectedCamera }) => {
  // const dispatch = useDispatch();

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className='mb-4'>
      <Heading lvl={6} className='mb-3'>
        Make video of the day
      </Heading>
      <ListGroup className='mb-3'>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Status</div>
          <Badge bg='secondary'>Stopped</Badge>
        </ListGroup.Item>
        <ListGroup.Item className='d-flex'>
          <div className='me-3 w-50'>Time, sec</div>
          <span>60</span>
        </ListGroup.Item>
      </ListGroup>
      <>
        <Button variant='primary' size='sm' className='me-2'>
          Edit
        </Button>
        <Button variant='primary' size='sm' className='me-2'>
          Start
        </Button>
      </>
    </Col>
  );
};

export default VideoStatus;
