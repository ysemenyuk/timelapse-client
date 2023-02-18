import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function TasksActions() {
  const dispatch = useDispatch();

  const createPhotoHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_PHOTO_BY_HAND }));
  };

  const createVideoHandler = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CREATE_VIDEO_BY_HAND }));
  };

  return (
    <DropdownButton as={ButtonGroup} title="AddTask" size="sm">
      <Dropdown.Item onClick={createPhotoHandler}>CreateOnePhoto</Dropdown.Item>
      <Dropdown.Item onClick={createVideoHandler}>CreateOneVideo</Dropdown.Item>
    </DropdownButton>
  );
}

export default TasksActions;
