import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, ProgressBar, Spinner } from 'react-bootstrap';
import { taskActions, taskSelectors } from '../../../redux/task/taskSlice.js';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskStatus } from '../../../utils/constants.js';

function EditCreatePhotoModal({ onHide, data: { taskId } }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.updateOne); // !!!
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);
  const task = useSelector(taskSelectors.selectTaskById(taskId));

  const { status, message, settings, ...rest } = task;
  const isRunning = status === taskStatus.RUNNING;

  const [link, setLink] = useState(settings.photoUrl);

  const handleDelete = () => {
    dispatch(taskActions.deleteOne({
      cameraId: selectedCamera._id,
      taskId,
    }))
      .then(() => {
        onHide();
      })
      .catch((e) => {
        console.log('- catch error -', e);
      });
  };

  const handleRepeat = () => {
    dispatch(taskActions.updateOne({
      cameraId: selectedCamera._id,
      taskId: task._id,
      payload: {
        ...rest,
        settings: {
          photoUrl: link,
        },
      },
    }))
      .then(() => {
        onHide();
      })
      .catch((e) => {
        console.log('- catch error -', e);
      });
  };

  return (
    <>
      <Modal.Header closeButton>
        Create photo
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          Create one photo from camera by http request
        </div>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">url</Form.Label>
          <Form.Control
            disabled
            onChange={(e) => setLink(e.target.value)}
            value={link}
            name="photoUrl"
            id="photoUrl"
            type="text"
          />
        </Form.Group>

        <div className="mb-3">
          {`Status - ${status}`}
        </div>
        <div className="mb-3">
          {message && message}
        </div>
        <If condition={isRunning}>
          <ProgressBar animated now={100} />
        </If>

      </Modal.Body>

      <Modal.Footer bsPrefix="modal-footer justify-content-between">
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
        </div>
        <div className="d-flex align-items-center gap-2">
          {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
          <Button
            key="close"
            size="sm"
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            key="repeat"
            size="sm"
            onClick={handleRepeat}
            disabled={isRunning}
          >
            Repeat
          </Button>
        </div>
      </Modal.Footer>

    </>
  );
}

export default EditCreatePhotoModal;
