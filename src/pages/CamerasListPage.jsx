import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import { cameraActions, cameraSelectors } from '../redux/camera/cameraSlice.js';
import useThunkStatus from '../hooks/useThunkStatus.js';
import CamerasList from '../components/CamerasList/CamerasList.jsx';
import Spinner from '../components/UI/Spinner.jsx';
import Error from '../components/UI/Error.jsx';

function CameraListPage() {
  const dispatch = useDispatch();
  // const { t } = useTranslation();
  const fetchStatus = useThunkStatus(cameraActions.fetchAll);
  const camerasIds = useSelector(cameraSelectors.camerasIds);

  useEffect(() => {
    if (camerasIds.length < 1) {
      dispatch(cameraActions.fetchAll());
    }
  }, []);

  return (
    <Choose>
      <When condition={!fetchStatus.isLoading && !fetchStatus.isError}>
        <Row>
          <Col sm={12}>
            <CamerasList camerasIds={camerasIds} />
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
