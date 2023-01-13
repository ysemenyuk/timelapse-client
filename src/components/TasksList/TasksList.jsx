/* eslint-disable max-len */
import React, { useEffect } from 'react';
// import cn from 'classnames';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
// import useThunkStatus from '../../hooks/useThunkStatus';
import { taskActions, taskSelectors } from '../../redux/task/taskSlice';
import { modalActions } from '../../redux/modalSlice.js';
import Badge from '../UI/Badge.jsx';
// import { taskName } from '../../utils/constants.js';
// import TasksActions from '../TasksActions/TasksActions.jsx';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const cameraTasks = useSelector(taskSelectors.cameraTasks);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);

  const handleClickTask = (task) => {
    console.log('handleClickTask', `Edit${task.name}`);
    dispatch(modalActions.openModal({ type: `Edit${task.name}`, data: { taskId: task._id } }));
  };

  const handleDeleteTask = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleDeleteTask', task);

    dispatch(taskActions.deleteOne({
      cameraId: selectedCamera._id,
      taskId: task._id,
    }));
  };

  // TODO refactor
  const renderText = (task) => {
    const { _id } = task;

    // if (photoSettings) {
    //   const { startTime, stopTime, interval, photoUrl } = photoSettings;
    //   const mapping = {
    //     [taskName.CREATE_PHOTO_BY_HAND]: `Url: ${photoUrl}`,
    //     [taskName.CREATE_PHOTOS_BY_TIME]: `StartAt: ${startTime}, StopAt: ${stopTime}, Interval: ${interval} sec`,
    //   };

    //   return mapping[name];
    // }

    // if (videoSettings) {
    //   const { startDate, endDate, duration, fps, periodicity } = videoSettings;
    //   const mapping = {
    //     [taskName.CREATE_VIDEO_BY_HAND]: `From: ${startDate}, To: ${endDate}, Duration: ${duration}, Fps: ${fps}`,
    //     [taskName.CREATE_VIDEOS_BY_TIME]: `Periodicity: ${periodicity}, Duration: ${duration}, Fps: ${fps}`,
    //   };

    //   return mapping[name];
    // }

    return _id.toString();
  };
  //

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
