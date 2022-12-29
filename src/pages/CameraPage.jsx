import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Col, Row, Nav } from 'react-bootstrap';
import useThunkStatus from '../hooks/useThunkStatus.js';
// import FileManager from '../components/FileManager/FileManager.jsx';
// import Screenshot from '../components/Screenshot/Screenshot.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import TasksList from '../components/TasksList/TasksList.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import { makeTodayName } from '../utils/utils.js';

function CameraPage() {
  const dispatch = useDispatch();
  const { cameraId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('location', location);

  const fetchStatus = useThunkStatus(cameraActions.fetchOne);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraActions.fetchOne(cameraId));
    }
  }, []);

  const fileTypeMap = {
    photos: 'photo,phtoByTime',
    videos: 'video,videoByTime',
    settings: 'settings',
  };

  const [tabName, setTabName] = useState('photos');

  useEffect(() => {
    if (tabName === 'settings') {
      navigate(`/cameras/${cameraId}/settings`);
      return;
    }

    const todayDate = makeTodayName(new Date());
    navigate(
      `/cameras/${cameraId}/${tabName}?fileType=${fileTypeMap[tabName]}&startDate=${todayDate}&endDate=${todayDate}`,
      // { state: selectedCamera },
    );
  }, [tabName]);

  const handleClickOnTab = (name) => (event) => {
    event.preventDefault();
    setTabName(name);
  };

  return (
    <Choose>
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError && selectedCamera}>
        <Row>
          <Col sm={3}>
            <CameraInfo selectedCamera={selectedCamera} compact />
            <TasksList selectedCamera={selectedCamera} />
          </Col>

          <Col sm={9}>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link active={tabName === 'photos'} onClick={handleClickOnTab('photos')}>
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={tabName === 'videos'} onClick={handleClickOnTab('videos')}>
                  Videos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={tabName === 'settings'} onClick={handleClickOnTab('settings')}>
                  Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Outlet context={selectedCamera} />

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
