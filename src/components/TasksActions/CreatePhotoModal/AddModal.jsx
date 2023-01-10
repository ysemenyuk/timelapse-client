import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { taskActions } from '../../../redux/task/taskSlice.js';
import { cameraSelectors } from '../../../redux/camera/cameraSlice.js';
import useThunkStatus from '../../../hooks/useThunkStatus.js';
import { taskName, taskType } from '../../../utils/constants.js';

function AddCreatePhotoModal({ onHide }) {
  const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const [link, setLink] = useState(selectedCamera.photoUrl);

  const handleSubmit = () => {
    dispatch(taskActions.createOne({
      cameraId: selectedCamera._id,
      payload: {
        name: taskName.CREATE_PHOTO_BY_HAND,
        type: taskType.ONE_TIME,
        photoSettings: {
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
        <div className="mb-2">Create photo from camera by http request</div>
        <Form.Group className="mb-3">
          {/* <Form.Label htmlFor="description">Http url</Form.Label> */}
          <Form.Control
            disabled
            onChange={(e) => setLink(e.target.value)}
            value={link}
            name="photoUrl"
            id="photoUrl"
            type="text"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}

        <Button
          key="close"
          size="sm"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          key="submit"
          size="sm"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>

    </>
  );
}

export default AddCreatePhotoModal;
