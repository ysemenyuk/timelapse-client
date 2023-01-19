import React from 'react';
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

function CameraInfo() {
  const { selectedCamera } = useOutletContext();

  console.log(123, selectedCamera);

  return (
    <Col md={12} className="mb-4">
      <pre className="p-2">
        <div>---</div>
        <div>{`Id: ${selectedCamera._id}`}</div>
        <div>{`date: ${selectedCamera.date}`}</div>
        <div>---</div>
        <div>{`name: ${selectedCamera.name}`}</div>
        <div>{`description: ${selectedCamera.description}`}</div>
        <div>{`location.latitude: ${selectedCamera.location?.latitude}`}</div>
        <div>{`location.longitude: ${selectedCamera.location?.longitude}`}</div>
        <div>{`model: ${selectedCamera.model}`}</div>
        <div>---</div>
        <div>{`photoUrl: ${selectedCamera.photoUrl}`}</div>
        <div>{`rtspUrl: ${selectedCamera.rtspUrl}`}</div>
        <div>---</div>
        <div>{`lastPhoto.date: ${selectedCamera.lastPhoto?.date}`}</div>
        <div>{`firstPhoto.date: ${selectedCamera.firstPhoto?.date}`}</div>
        <div>{`totalPhotos: ${selectedCamera.totalPhotos}`}</div>
        <div>---</div>
        <div>{`lastVideo.date: ${selectedCamera.lastVideo?.date}`}</div>
        <div>{`firstVideo.date: ${selectedCamera.firstVideo?.date}`}</div>
        <div>{`totalVideos: ${selectedCamera.totalVideos}`}</div>
        <div>---</div>
        <div>{`photosByTimeTask.status: ${selectedCamera.photosByTimeTask.status}`}</div>
        <div>---</div>
      </pre>
      {/* <pre>{JSON.stringify(selectedCamera, null, 2)}</pre> */}
    </Col>
  );
}

export default CameraInfo;
