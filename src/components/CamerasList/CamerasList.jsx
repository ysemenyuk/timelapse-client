import React from 'react';
// import cn from 'classnames';
// import format from 'date-fns/format';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Card } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import { cameraActions } from '../../redux/camera/cameraSlice.js';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import CameraCard from '../CameraCard/CameraCard.jsx';
// import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';

// const createLinkToPhotos = (camera) => {
//   const date = camera.lastPhoto ? new Date(camera.lastPhoto.date) : new Date();
//   const query = `?type=photo&oneDate=${format(date, 'yyyy-MM-dd')}`;
//   return `/cameras/${camera._id}/photos${query}`;
// };

function CamerasList({ cameras }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        Cameras List
      </Heading>

      <Row sm={4} className="mb-3">
        {cameras.map((camera) => (
          <Col className="mb-4" key={camera._id}>
            <CameraCard selectedCamera={camera} onClick={handleSelectItem(camera)} main />
          </Col>
        ))}

        <Col className="mb-4">
          <Card className="card justify-content-center align-items-center h-100">
            Add new camera
            <Button onClick={handleAddCamera} size="sm">
              AddCamera
            </Button>
          </Card>
        </Col>
      </Row>

    </Col>
  );
}

export default CamerasList;
