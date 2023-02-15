import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import ReactPlayer from 'react-player';

function CameraLive() {
  const { selectedCamera } = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      {/* <video src="http://localhost:8000/live/s1.flv" controls muted width="100%" height="100%">
        <source type="video/mp4" />
      </video> */}
      <ReactPlayer
        url="http://localhost:8000/live/s1.flv"
        muted
        playing
      />
    </Col>
  );
}

export default CameraLive;
