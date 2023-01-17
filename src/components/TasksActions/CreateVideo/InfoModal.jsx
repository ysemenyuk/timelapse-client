/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Spinner, ProgressBar } from 'react-bootstrap';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskStatus } from '../../../utils/constants.js';

function InfoCreateVideoModal({ onHide, data: { taskId } }) {
  const dispatch = useDispatch();
  const fetchStatusDeleting = useThunkStatus(taskActions.deleteOne);
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);
  const task = useSelector(taskSelectors.selectTaskById(taskId));

  const handleDelete = () => {
    dispatch(taskActions.deleteOne({
      cameraId: selectedCameraId,
      taskId,
    }))
      .then(() => {
        onHide();
      })
      .catch((e) => {
        console.log('- catch error -', e);
      });
  };

  if (!task) {
    return null;
  }

  const isRunning = task.status === taskStatus.RUNNING;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create video</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          Create video from photos
        </div>

        <div className="mb-3">
          {`Status - ${task.status}`}
        </div>
        <If condition={task.message}>
          <div className="mb-3">
            {`Message - ${task.message}`}
          </div>
        </If>
        <If condition={isRunning}>
          <ProgressBar animated now={100} />
        </If>

      </Modal.Body>

      <Modal.Footer className="modal-footer justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Button
            key="delete"
            size="sm"
            onClick={handleDelete}
            disabled={isRunning}
          >
            Delete
          </Button>
          <If condition={isRunning}>
            <Button
              key="cancel"
              size="sm"
            >
              Cancel
            </Button>
          </If>
          {fetchStatusDeleting.isLoading && <Spinner as="span" animation="border" size="sm" />}
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button
            key="close"
            size="sm"
            onClick={onHide}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
}

export default InfoCreateVideoModal;
