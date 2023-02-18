import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import ReactPlayer from 'react-player';
// import 'hls.js/dist/hls.js';

function CameraLive() {
  const { selectedCamera } = useOutletContext();

  return (
    <Col md={12} className="mb-4">
      <div>{`Name: ${selectedCamera.name}`}</div>
      <ReactPlayer
        // url="http://localhost:8000/live/s1/index.m3u8"
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        muted
        playing
        controls
      />
    </Col>
  );
}

export default CameraLive;
