/* eslint-disable max-len */
import React from 'react';
// import cn from 'classnames';
import { useDispatch } from 'react-redux';
import format from 'date-fns/format';
import { Card, Button } from 'react-bootstrap';
import styles from './CameraInfo.module.css';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { cameraActions } from '../../redux/camera/cameraSlice';

const getDate = (file) => {
  if (file && file.date) {
    return format(new Date(file.date), 'dd.MM.yyyy hh:mm:ss');
  }
  return '-';
};

function CameraInfo({ selectedCamera, onClick, tabName, main, buttons }) {
  const dispatch = useDispatch();

  const openEditCameraModal = () => {
    dispatch(cameraActions.selectCamera(selectedCamera._id));
    dispatch(modalActions.openModal({ type: modals.EDIT_CAMERA }));
  };

  const openDeleteCameraModal = async () => {
    dispatch(cameraActions.selectCamera(selectedCamera._id));
    dispatch(modalActions.openModal({ type: modals.DELETE_CAMERA }));
  };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.cardImgWithHeader} role="presentation" onClick={onClick}>
          <ImgWrapper width={100} height={0.5625} src={selectedCamera.avatar && `/files/${selectedCamera.avatar._id}`} />
          <Card.Header className={styles.cardHeader}>
            <div className="text-truncate fw-bold">{selectedCamera.name}</div>
            <div className="text-truncate">{selectedCamera.description}</div>
          </Card.Header>
        </div>
        <Card.Body className={styles.cardBody}>

          <If condition={main && selectedCamera.photosByTimeTask}>
            <div className="d-flex gap-2 align-items-start">
              {`PhotosByTime: ${selectedCamera.photosByTimeTask.status}`}
            </div>
          </If>

          <Choose>
            <When condition={tabName === 'videos'}>
              <div className="text-truncate">
                {`First video: ${getDate(selectedCamera.firstVideo)}`}
              </div>
              <div className="text-truncate">
                {`Last video: ${getDate(selectedCamera.lastVideo)}`}
              </div>
              <div className="text-truncate">
                {`Total videos: ${selectedCamera.totalVideos}`}
              </div>
            </When>
            <Otherwise>
              <div className="text-truncate">
                {`First photo: ${getDate(selectedCamera.firstPhoto)}`}
              </div>
              <div className="text-truncate">
                {`Last photo: ${getDate(selectedCamera.lastPhoto)}`}
              </div>
              <div className="text-truncate">
                {`Total photos: ${selectedCamera.totalPhotos}`}
              </div>
            </Otherwise>
          </Choose>

          <div className="d-flex gap-2 align-items-start">
            <Button className="p-0" variant="link" size="sm" onClick={openDeleteCameraModal}>Delete</Button>
            <Button className="p-0" variant="link" size="sm" onClick={openEditCameraModal}>Settings</Button>
          </div>
        </Card.Body>
      </Card>

      <If condition={buttons}>
        <div className="mt-3 mb-3 d-flex justify-content-start">
          <Button onClick={onClick} variant="primary" size="sm">
            Settings
          </Button>
          {/* <Button onClick={openDeleteCameraModal} variant="primary" size="sm">
              Delete
            </Button> */}
        </div>
      </If>
    </>
  );
}

export default CameraInfo;
