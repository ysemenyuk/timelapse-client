import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import ButtonsGroup from '../UI/ButtonsGroup';
// import Heading from '../UI/Heading.jsx';
import { CREATE_VIDEO } from '../../utils/constants.js';
import taskService from '../../api/task.service';
import { modalActions } from '../../store/modalSlice';

function Tasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const createScreenshotHandler = () => {
    taskService.createScreenshotTask(selectedCamera._id);
  };

  const createVideofileHandler = () => {
    dispatch(modalActions.openModal(CREATE_VIDEO));
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      {/* <Heading lvl={6} className="mb-3">
        Files
      </Heading> */}

      <ButtonsGroup>

        <Button
          type="primary"
          size="sm"
          onClick={createScreenshotHandler}
        >
          CreateScreenshot
        </Button>
        <Button
          type="primary"
          size="sm"
          onClick={createVideofileHandler}
        >
          CreateVideoFile
        </Button>

      </ButtonsGroup>
    </Col>
  );
}

export default Tasks;
