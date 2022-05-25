import React from 'react';
import { Col, Card } from 'react-bootstrap';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import Heading from '../UI/Heading.jsx';

function CameraScreen({ selectedCamera }) {
  if (selectedCamera === null) {
    return null;
  }

  return (
    <Col md={12} className="mb-4">
      <Heading lvl={6} className="mb-3">
        Screenshot
      </Heading>
      <Card>
        <Choose>
          <When condition={selectedCamera.avatar}>
            <ImgWrapper width={100} height={0.5625} src={`/files/${selectedCamera.avatar._id}`} />
          </When>
          <Otherwise>
            <ImgWrapper width={100} height={0.5625} src={null} />
          </Otherwise>
        </Choose>
      </Card>
    </Col>
  );
}

export default CameraScreen;
