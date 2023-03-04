import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Col, Row, Nav } from 'react-bootstrap';
import _ from 'lodash';
import useThunkStatus from '../hooks/useThunkStatus.js';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import TasksList from '../components/TasksList/TasksList.jsx';
import CameraCard from '../components/CameraCard/CameraCard.jsx';
import { modalActions } from '../redux/modalSlice.js';
import { modals } from '../utils/constants.js';

function CameraPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { cameraId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(5555, 'CameraPage');

  const fetchStatus = useThunkStatus(cameraActions.fetchAll);
  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);

  useEffect(() => {
    if (selectedCameraId === null) {
      dispatch(cameraActions.fetchAll())
        .then(() => {
          dispatch(cameraActions.selectCamera(cameraId));
        });
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
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError && selectedCameraId}>
        <Row>
          <Col xs={6} md={4} lg={3}>
            <Col md={12} className="mb-4">
              <CameraCard cameraId={cameraId} onClick={openEditCameraModal} tabName={tabName} />
            </Col>
            <TasksList selectedCameraId={cameraId} />
          </Col>

          <Col xs={6} md={8} lg={9}>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link active={tabName === 'photos'} onClick={handleClickOnTab('photos')}>
                  {t('photos')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={tabName === 'videos'} onClick={handleClickOnTab('videos')}>
                  {t('videos')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active={tabName === 'settings'} onClick={handleClickOnTab('settings')}>
                  {t('settings')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Link active={tabName === 'info'} onClick={handleClickOnTab('info')}>
                {t('info')}
              </Nav.Link>
              <Nav.Item />
              <Nav.Link active={tabName === 'live'} onClick={handleClickOnTab('live')}>
                {t('live')}
              </Nav.Link>
              <Nav.Item />
            </Nav>

            <Outlet context={{ selectedCameraId: cameraId }} />

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
