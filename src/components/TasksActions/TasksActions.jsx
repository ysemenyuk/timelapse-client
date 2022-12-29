import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function TasksActions() {
  const dispatch = useDispatch();

  const createPhotoHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_PHOTO }));
  };

  const createVideoHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_VIDEO }));
  };

  const createPhotosByTimeHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_PHOTOS_BY_TIME }));
  };

  const createVideosByTimeHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_VIDEOS_BY_TIME }));
  };

  return (
    <DropdownButton as={ButtonGroup} title="CreateTask" size="sm">
      <Dropdown.Item onClick={createPhotoHandler}>CreateOnePhoto</Dropdown.Item>
      <Dropdown.Item onClick={createVideoHandler}>CreateOneVideo</Dropdown.Item>
      <Dropdown.Item onClick={createPhotosByTimeHandler}>CreatePhotosByTime</Dropdown.Item>
      <Dropdown.Item onClick={createVideosByTimeHandler}>CreateVideosByTime</Dropdown.Item>
      {/* <Dropdown.Item>ConcatVideos</Dropdown.Item>
      <Dropdown.Item>SpeedUpVideo</Dropdown.Item> */}
    </DropdownButton>
  );
}

export default TasksActions;
