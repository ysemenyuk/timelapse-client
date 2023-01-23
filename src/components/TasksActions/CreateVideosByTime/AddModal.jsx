import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import { taskActions } from '../../../redux/task/taskSlice';
import useThunkStatus from '../../../hooks/useThunkStatus';

// const validationSchema = Yup.object({
//   startTime: Yup.string().required(),
//   duration: Yup.number().required(),
//   fps: Yup.number().required(),
// });

function AddCreateVideosByTimeModal({ onHide }) {
  // const dispatch = useDispatch();
  const fetchStatus = useThunkStatus(taskActions.createOne);
  // const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);

  // const handleStartVideosByTime = () => {
  //   console.log('handleStart');
  // };

  // console.log('formik.errors -', formik.errors);
  // console.log('formik.values -', formik.values);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>VideosByTimeTask</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            Create video file from photos every day
          </Col>
        </Row>

      </Modal.Body>

      <Modal.Footer>
        {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
        <Button
          key="close"
          size="sm"
          disabled={fetchStatus.isLoading}
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          key="submit"
          size="sm"
          disabled={fetchStatus.isLoading}
          // onClick={formik.handleSubmit}
        >
          SaveAndStart
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddCreateVideosByTimeModal;
