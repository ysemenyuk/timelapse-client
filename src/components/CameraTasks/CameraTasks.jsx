import React, { useEffect } from 'react';
// import cn from 'classnames';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Card, Col } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import ScreenshotsByTime from './ScreenshotsByTime/ScreenshotsByTime';
import VideosByTime from './VideosByTime/VideosByTime';
// import useThunkStatus from '../../hooks/useThunkStatus';
import { taskActions, taskSelectors } from '../../redux/task/taskSlice';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const cameraTasks = useSelector(taskSelectors.cameraTasks);
  const screenshotsByTimeTask = useSelector(taskSelectors.screenshotsByTimeTask);
  const videosByTimeTask = useSelector(taskSelectors.videosByTimeTask);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);
  // console.log(44444, cameraTasks);

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
            {task.name}
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
