import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import Screenshot from '../components/Screenshot/Screenshot.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import ScreenshotsByTime from '../components/ScreenshotsByTime/ScreenshotsByTime.jsx';
import useCameraList from '../hooks/useCamerasList.js';

function CameraListPage() {
  const { allCameras, selectedCamera, fetchStatus } = useCameraList();

  return (
    <Choose>
      <When condition={fetchStatus.isSuccess}>
        <Row>
          <Col sm={3}>
            <CamerasList cameras={allCameras} selectedCameraId={selectedCamera && selectedCamera._id} />
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
