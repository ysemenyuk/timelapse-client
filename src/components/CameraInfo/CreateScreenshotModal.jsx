import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { taskActions } from '../../redux/task/taskSlice.js';
import { cameraSelectors } from '../../redux/camera/cameraSlice.js';
import useThunkStatus from '../../hooks/useThunkStatus.js';

function CreateScreenshotModal({ show, onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createScreenshot);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const handleSubmit = () => {
    dispatch(taskActions.createScreenshot({
      cameraId: selectedCamera._id,
      payload: {
        name: 'CreatePhoto',
        type: 'OneTime',
        photoSettings: {
          httpUrl: '',
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
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create screenshot</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>Create screenshot from camera by http request</div>
        <div className="text-truncate">{`"${selectedCamera.screenshotLink}"`}</div>
      </Modal.Body>
      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}

        <Button
          key="close"
          onClick={onHide}
          size="sm"
        >
          Cancel
        </Button>
        <Button
          key="submit"
          onClick={handleSubmit}
          size="sm"
        >
          Submit
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default CreateScreenshotModal;
