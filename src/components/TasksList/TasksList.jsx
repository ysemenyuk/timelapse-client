/* eslint-disable max-len */
import React, { useEffect } from 'react';
// import cn from 'classnames';
// import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col } from 'react-bootstrap';
import useSocket from '../../hooks/useSocket.js';
import Heading from '../UI/Heading.jsx';
import { taskActions, taskSelectors } from '../../redux/task/taskSlice';
import { modalActions } from '../../redux/modalSlice.js';
import Badge from '../UI/Badge.jsx';
// import { taskName } from '../../utils/constants.js';
// import TasksActions from '../TasksActions/TasksActions.jsx';
// import useThunkStatus from '../../hooks/useThunkStatus';

function CameraTasks({ selectedCameraId }) {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const cameraTasks = useSelector(taskSelectors.cameraTasks);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);

  console.log(4444, 'CameraTasks');

  const handleClickTask = (task) => {
    console.log('handleClickTask', `Edit${task.name}`);
    dispatch(modalActions.openModal({
      type: `Edit${task.name}`, data: { taskId: task._id, selectedCameraId },
    }));
  };

  const handleDeleteTask = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDeleteTask', task);

    dispatch(taskActions.deleteOne({
      cameraId: selectedCameraId,
      taskId: task._id,
    }));
  };

  //

  useEffect(() => {
    socket.on('update-task', (data) => {
      console.log('socket.on update-task data -', data);
      const { cameraId, taskId } = data;
      dispatch(taskActions.fetchOne({ cameraId, taskId }));
    });
    return () => {
      socket.off('update-task');
    };
  }, []);

  //

  useEffect(() => {
    if (selectedCameraId) {
      dispatch(taskActions.fetchAll({ cameraId: selectedCameraId }));
    }
  }, [selectedCameraId]);

  // TODO refactor
  const renderText = (task) => {
    const { _id } = task;

    // if (photoSettings) {
    //   const { startTime, stopTime, interval, photoUrl } = photoSettings;
    //   const mapping = {
    //     [taskName.CREATE_PHOTO]: `Url: ${photoUrl}`,
    //     [taskName.CREATE_PHOTOS_BY_TIME]: `StartAt: ${startTime}, StopAt: ${stopTime}, Interval: ${interval} sec`,
    //   };

    //   return mapping[name];
    // }

    // if (videoSettings) {
    //   const { startDate, endDate, duration, fps, periodicity } = videoSettings;
    //   const mapping = {
    //     [taskName.CREATE_VIDEO]: `From: ${startDate}, To: ${endDate}, Duration: ${duration}, Fps: ${fps}`,
    //     [taskName.CREATE_VIDEOS_BY_TIME]: `Periodicity: ${periodicity}, Duration: ${duration}, Fps: ${fps}`,
    //   };

    //   return mapping[name];
    // }

    return _id.toString();
  };

  //

  if (!cameraTasks) {
    return null;
  }

  //

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Tasks
      </Heading>

      {cameraTasks.map((task) => (
        <Card onClick={() => handleClickTask(task)} key={task._id} className="card mb-3">
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-center">
            <div className="text-truncate">
              {task.name}
            </div>
            <If condition={task.removable}>
              <Button onClick={(e) => handleDeleteTask(e, task)} variant="link" size="sm">
                Delete
              </Button>
            </If>
          </Card.Header>
          <Card.Body className="card-body d-flex justify-content-between align-items-center pt-2 pb-2">
            <div className="text-truncate">{renderText(task)}</div>
            <div className="d-flex align-items-center ms-2">
              <Badge status={task.status} />
            </div>
          </Card.Body>
        </Card>
      ))}

      {/* <TasksActions /> */}

    </Col>
  );
}

export default CameraTasks;
