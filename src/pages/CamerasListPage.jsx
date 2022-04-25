import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import useThunkStatus from '../hooks/useThunkStatus.js';
import cameraThunks from '../thunks/cameraThunks.js';
import ScreenshotsByTime from '../components/ScreenshotsByTime/ScreenshotsByTime.jsx';

function CameraListPage() {
  const dispatch = useDispatch();
  const { allCameras, selectedCamera } = useSelector((state) => state.camera);

  const fetchStatus = useThunkStatus(cameraThunks.fetchAll);

  useEffect(() => {
    if (allCameras.length === 0) {
      dispatch(cameraThunks.fetchAll());
    }
  }, []);

  return (
    <Choose>
      <When condition={fetchStatus.isSuccess}>
        <Row>
          <Col sm={3}>
            <CamerasList cameras={allCameras} selectedCamera={selectedCamera} />
          </Col>
          <Col sm={6}>
            <Choose>
              <When condition={!allCameras.length}>
                Add your first camera
              </When>
              <Otherwise>
                <CameraInfo selectedCamera={selectedCamera} />
                <ScreenshotsByTime row selectedCamera={selectedCamera} />
              </Otherwise>
            </Choose>
          </Col>
          <Col sm={3}>
            <Screenshot selectedCamera={selectedCamera} />
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
