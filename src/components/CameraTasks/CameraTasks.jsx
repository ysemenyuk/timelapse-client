import React, { useEffect } from 'react';
// import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Card, Col } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import ScreenshotsByTime from './ScreenshotsByTime/ScreenshotsByTime';
import VideosByTime from './VideosByTime/VideosByTime';
// import useThunkStatus from '../../hooks/useThunkStatus';
import { taskActions } from '../../redux/slices/taskSlice';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);

  const cameraTasks = tasks[selectedCamera._id];

  // console.log(44444, cameraTasks);

  useEffect(() => {
    if (selectedCamera._id && !cameraTasks) {
      dispatch(
        taskActions.fetchAll({ cameraId: selectedCamera._id }),
      );
    }
  }, [selectedCamera._id]);

  if (!cameraTasks) {
    return null;
  }

  const screenshotsByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.screenshotsByTimeTask._id);
  const videosByTimeTask = cameraTasks.find((task) => task._id === selectedCamera.videosByTimeTask._id);
  const runningTasks = cameraTasks.filter((task) => task.status === 'Running');

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Tasks
      </Heading>

      <ScreenshotsByTime task={screenshotsByTimeTask} compact />
      <VideosByTime task={videosByTimeTask} compact />

      {runningTasks.map((task) => (
        <Card key={task._id} bsPrefix="card mb-3">
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-start">
            {task.type}
            <Badge bg="success">{task.status}</Badge>
          </Card.Header>
          <Card.Body bsPrefix="card-body text-truncate pt-2 pb-2">
            {`CreatedAt: ${task.createdAt}`}
          </Card.Body>
        </Card>
      ))}

    </Col>
  );
}

export default CameraTasks;
