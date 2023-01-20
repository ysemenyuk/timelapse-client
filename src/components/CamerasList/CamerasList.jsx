import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Card } from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
// import cn from 'classnames';
// import format from 'date-fns/format';
import styles from './CamerasList.module.css';
import Heading from '../UI/Heading.jsx';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import CameraCard from '../CameraCard/CameraCard.jsx';

function CamerasList({ cameras }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectItem = (camera) => () => {
    dispatch(cameraActions.selectCamera(camera._id));
    navigate(`/cameras/${camera._id}/photos`);
  };

  const handleAddCamera = () => {
    dispatch(modalActions.openModal({ type: modals.ADD_CAMERA }));
  };

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        {t('cameras')}
      </Heading>

      <Row sm={4} className="mb-3">
        {cameras.map((camera) => (
          <Col className="mb-4" key={camera._id}>
            <CameraCard selectedCamera={camera} onClick={handleSelectItem(camera)} main />
          </Col>
        ))}

        <Col className="mb-4">
          <Card className={`${styles.card} gap-2 justify-content-center align-items-center h-100`}>
            <Camera size="3rem" color="#0d6efd" />
            <Button variant="outline-primary" onClick={handleAddCamera} size="sm">
              {t('add_camera')}
            </Button>
          </Card>
        </Col>
      </Row>

    </Col>
  );
}

export default CamerasList;
