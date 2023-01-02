import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import useThunkStatus from '../hooks/useThunkStatus.js';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
// import Screenshot from '../components/Screenshot/Screenshot.jsx';
// import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
// import FoldersList from '../components/FoldersList/FoldersList.jsx';
// import TasksList from '../components/TasksList/TasksList.jsx';

function CameraListPage() {
  const dispatch = useDispatch();

  const allCameras = useSelector(cameraSelectors.allCameras);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  const fetchStatus = useThunkStatus(cameraActions.fetchAll);

  useEffect(() => {
    if (allCameras.length < 2) {
      dispatch(cameraActions.fetchAll());
    }
  }, []);

  return (
    <Choose>
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError && selectedCamera}>
        <Row>
          <Col sm={12}>
            <CamerasList cameras={allCameras} selectedCamera={selectedCamera} />
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

export default CameraListPage;
