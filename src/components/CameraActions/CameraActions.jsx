import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

import { EDIT_CAMERA, DELETE_CAMERA, CREATE_PHOTO, CREATE_VIDEO } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';

function CameraActions() {
  const dispatch = useDispatch();

  const openDeleteCameraModal = async () => {
    dispatch(modalActions.openModal(DELETE_CAMERA));
  };

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal(EDIT_CAMERA));
  };

  const createPhotoHandler = () => {
    dispatch(modalActions.openModal(CREATE_PHOTO));
  };

  const createVideoHandler = () => {
    dispatch(modalActions.openModal(CREATE_VIDEO));
  };

  return (
    <div className="mb-3 d-flex justify-content-between">
      <div>
        <Button onClick={openEditCameraModal} variant="primary" size="sm" className="me-2">
          Settings
        </Button>
        <Button onClick={openDeleteCameraModal} variant="primary" size="sm" className="me-2">
          Delete
        </Button>
      </div>
      <DropdownButton as={ButtonGroup} title="CreateTask" size="sm">
        <Dropdown.Item onClick={createPhotoHandler}>CreatePhoto</Dropdown.Item>
        <Dropdown.Item onClick={createVideoHandler}>CreateVideo</Dropdown.Item>
        <Dropdown.Item>CreatePhotosByTime</Dropdown.Item>
        <Dropdown.Item>CreateVideosByTime</Dropdown.Item>
        <Dropdown.Item>ConcatVideos</Dropdown.Item>
        <Dropdown.Item>SpeedUpVideo</Dropdown.Item>
      </DropdownButton>

    </div>
  );
}

export default CameraActions;
