import React, { useEffect } from 'react';
// import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import ButtonsGroup from '../UI/ButtonsGroup';
import Heading from '../UI/Heading.jsx';
import { CREATE_SCREENSHOT, CREATE_VIDEO } from '../../utils/constants.js';
import { modalActions } from '../../redux/slices/modalSlice';
import CreateVideoModal from './CreateVideoModal';
import ScreenshotsByTime from './ScreenshotsByTime/ScreenshotsByTime';
import VideosByTime from './VideosByTime/VideosByTime';
import CreateScreenshotModal from './CreateScreenshotModal';
// import useThunkStatus from '../../hooks/useThunkStatus';
import { taskActions } from '../../redux/slices/taskSlice';
import useModal from '../../hooks/useModal';

function CameraTasks({ selectedCamera }) {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);
  // const fetchStatus = useThunkStatus(taskActions.fetchAll);
  const createVideoModal = useModal();

  const cameraTasks = tasks[selectedCamera._id];

  console.log(44444, createVideoModal);

  useEffect(() => {
    if (selectedCamera && !cameraTasks) {
      dispatch(
        taskActions.fetchAll({ cameraId: selectedCamera._id }),
      );
    }
  }, [selectedCamera]);

  const createScreenshotHandler = () => {
    dispatch(modalActions.openModal(CREATE_SCREENSHOT));
  };

  const createVideofileHandler = () => {
    // dispatch(modalActions.openModal(CREATE_VIDEO));
    createVideoModal.open();
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <>

      <Col md={12} className="mb-4">
        <Heading lvl={6} className="mb-3">
          Tasks
        </Heading>

        <ScreenshotsByTime selectedCamera={selectedCamera} compact />
        <VideosByTime selectedCamera={selectedCamera} compact />

        <ButtonsGroup>
          <DropdownButton as={ButtonGroup} title="CreateTask" size="sm">
            <Dropdown.Item eventKey="1" onClick={createScreenshotHandler}>CreateScreenshot</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={createVideofileHandler}>CreateVideoFromScreenshots</Dropdown.Item>
          </DropdownButton>
        </ButtonsGroup>
      </Col>

      <If condition={createVideoModal.isOpen}>
        <CreateVideoModal onHide={createVideoModal.close} selectedCamera={selectedCamera} />
      </If>

      {/* <CreateScreenshotModal selectedCamera={selectedCamera} /> */}
    </>
  );
}

export default CameraTasks;
