import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import useThunkStatus from '../hooks/useThunkStatus.js';
import FileManager from '../components/FileManager/FileManager.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import TasksList from '../components/TasksList/TasksList.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';

function CameraPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchStatus = useThunkStatus(cameraActions.fetchOne);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraActions.fetchOne(id));
    }
  }, []);

  return (
    <Choose>
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError && selectedCamera}>
        <Row>
          <Col sm={3}>
            <Screenshot selectedCamera={selectedCamera} />
            <CameraInfo selectedCamera={selectedCamera} compact />
            <TasksList selectedCamera={selectedCamera} />
          </Col>
          <Col sm={9}>
            <FileManager selectedCamera={selectedCamera} />
          </Col>
        </Row>
      </When>

      <When condition={fetchStatus.isLoading}>
        <Spinner />
      </When>

      <When condition={fetchStatus.isError}>
        <Error />
      </When>
    </Choose>
  );
}

export default CameraPage;
