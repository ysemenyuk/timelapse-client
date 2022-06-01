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
import { taskName } from '../../utils/constants.js';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const cameraTasks = useSelector(taskSelectors.cameraTasks);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);

  const handleClickTask = (task) => {
    console.log('handleClickTask', `Edit${task.name}`);
    dispatch(modalActions.openModal({ type: `Edit${task.name}`, data: { taskId: task._id } }));
  };

  const handleHideTask = (e, task) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleHideTask', task);
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

  const renderText = (task) => {
    const { name, settings } = task;

    if (settings) {
      const mapping = {
        [taskName.CREATE_PHOTO]: `Url: ${settings?.photoUrl}`,
        [taskName.CREATE_PHOTOS_BY_TIME]: `StartAt: ${settings.startTime}, StopAt: ${settings.stopTime}, Interval: ${settings.interval} sec`,
        [taskName.CREATE_VIDEO]: `From: ${settings.startDate}, to: ${settings.endDate}, Duration: ${settings.duration}, Fps: ${settings.fps}`,
        [taskName.CREATE_VIDEOS_BY_TIME]: `StartAt: ${settings.startTime}, Duration: ${settings.duration}, Fps: ${settings.fps}`,
      };

      return mapping[name];
    }

    return task._id.toString();
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

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Tasks
      </Heading>

      {cameraTasks.map((task) => (
        <Card onClick={() => handleClickTask(task)} key={task._id} bsPrefix="card mb-3">
          <Card.Header bsPrefix="card-header d-flex justify-content-between align-items-center">
            {task.name}
            <Badge status={task.status} />
          </Card.Header>
          <Card.Body bsPrefix="card-body d-flex justify-content-between align-items-center pt-2 pb-2">
            <div className="text-truncate">{renderText(task)}</div>
            <div className="d-flex align-items-center ms-2">
              <Button onClick={(e) => handleHideTask(e, task)} variant="link" size="sm">
                Hide
              </Button>
              <Button onClick={(e) => handleDeleteTask(e, task)} variant="link" size="sm">
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

    </Col>
  );
}

export default CameraTasks;
