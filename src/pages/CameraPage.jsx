import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Col, Row, Nav } from 'react-bootstrap';
import _ from 'lodash';
import useThunkStatus from '../hooks/useThunkStatus.js';
// import Screenshot from '../components/Screenshot/Screenshot.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import TasksList from '../components/TasksList/TasksList.jsx';
import CameraInfo from '../components/CameraInfo/CameraInfo.jsx';
import { modalActions } from '../redux/modalSlice.js';
import { modals } from '../utils/constants.js';
// import { makeTodayName } from '../utils/utils.js';

function CameraPage() {
  const dispatch = useDispatch();
  const { cameraId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log('location', _.last(_.split(location.pathname, '/')));

  const fetchStatus = useThunkStatus(cameraActions.fetchOne);
  const selectedCamera = useSelector(cameraSelectors.selectedCamera);

  useEffect(() => {
    if (selectedCamera === null) {
      dispatch(cameraActions.fetchOne(cameraId));
    }
  }, []);

  const [tabName, setTabName] = useState(_.last(_.split(location.pathname, '/')));

  const handleClickOnTab = (name) => (event) => {
    event.preventDefault();
    if (name === tabName) {
      return;
    }
    setTabName(name);
    navigate(`/cameras/${cameraId}/${name}`);
  };

  const openEditCameraModal = () => {
    dispatch(modalActions.openModal({ type: modals.EDIT_CAMERA }));
  };

  return (
    <Choose>
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError && selectedCamera}>
        <Row>
          <Col sm={3}>
            {/* <Screenshot selectedCamera={selectedCamera} /> */}
            <CameraInfo selectedCamera={selectedCamera} onClick={openEditCameraModal} compact buttons />
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

            <Outlet context={{ selectedCamera, tabName }} />

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
