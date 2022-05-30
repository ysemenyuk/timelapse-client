import React, { useEffect } from 'react';
// import cn from 'classnames';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
// import PhotosByTime from './PhotosByTime/PhotosByTime';
// import VideosByTime from './VideosByTime/VideosByTime';
// import useThunkStatus from '../../hooks/useThunkStatus';
import { taskActions, taskSelectors } from '../../redux/task/taskSlice';
import { modalActions } from '../../redux/modalSlice.js';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const cameraTasks = useSelector(taskSelectors.cameraTasks);
  // const photosByTimeTask = useSelector(taskSelectors.screenshotsByTimeTask);
  // const videosByTimeTask = useSelector(taskSelectors.videosByTimeTask);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);
  // console.log(44444, cameraTasks);

  const handleClickTask = (task) => {
    dispatch(modalActions.openModal(task.name));
  };

  const handleDeleteTask = (task) => {
    dispatch(taskActions.deleteOne({
      cameraId: selectedCamera._id,
      taskId: task._id,
    }));
  };

  useEffect(() => {
    if (selectedCamera._id && _.isEmpty(cameraTasks)) {
      dispatch(
        taskActions.fetchAll({ cameraId: selectedCamera._id }),
      );
    }
  }, [selectedCamera._id]);

  if (!cameraTasks) {
    return null;
  }

  // const runningTasks = cameraTasks.filter((task) => task.status === 'Running');

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Tasks
      </Heading>

      {/* <PhotosByTime task={photosByTimeTask} compact />
      <VideosByTime task={videosByTimeTask} compact /> */}

      {cameraTasks.map((task) => (
        <Card onClick={() => handleClickTask(task)} key={task._id} bsPrefix="card mb-3">
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-start">
            {task.name}
            <Badge bg="success">{task.status}</Badge>
          </Card.Header>
          <Card.Body bsPrefix="card-body text-truncate pt-2 pb-2">
            {`CreatedAt: ${task.createdAt}`}

            <Button onClick={() => handleDeleteTask(task)} variant="primary" size="sm" className="me-2">
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}

    </Col>
  );
}

export default CameraTasks;
