/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';
// import cn from 'classnames';
import { Card, Button } from 'react-bootstrap';
import styles from './CameraCard.module.css';
import { modals } from '../../utils/constants.js';
import { modalActions } from '../../redux/modalSlice.js';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { cameraActions, cameraSelectors } from '../../redux/camera/cameraSlice';

const getDate = (file) => {
  if (file && file.date) {
    return format(new Date(file.date), 'dd.MM.yy HH:mm:ss');
  }
  return '-';
};

const getCount = (count) => {
  if (count) {
    return count;
  }
  return '-';
};

function CameraCard({ cameraId, onClick, tabName, camerasList }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const camera = useSelector(cameraSelectors.cameraById(cameraId));
  const cameraStats = useSelector(cameraSelectors.cameraStatsByCameraId(cameraId));

  console.log(3333, 'CameraCard', cameraStats);

  const openEditCameraModal = () => {
    dispatch(cameraActions.selectCamera(cameraId));
    dispatch(modalActions.openModal({ type: modals.EDIT_CAMERA }));
  };

  const openDeleteCameraModal = async () => {
    dispatch(cameraActions.selectCamera(cameraId));
    dispatch(modalActions.openModal({ type: modals.DELETE_CAMERA }));
  };

  if (cameraId === null) {
    return null;
  }

  return (
    <Card className={styles.card}>
      <div className={styles.cardImgWithHeader} role="presentation" onClick={onClick}>
        <ImgWrapper width={100} height={0.5625} src={camera.avatar && `${camera.avatar.link}`} />
        <Card.Header className={styles.cardHeader}>
          <div className="text-truncate fw-bold">{camera.name}</div>
          <div className="text-truncate">{camera.description}</div>
        </Card.Header>
      </div>
      <Card.Body className={styles.cardBody}>

        <If condition={camerasList && camera.photosByTimeTask}>
          <div className="d-flex gap-2 align-items-start">
            {`PhotosByTime: ${camera.photosByTimeTask.status}`}
          </div>
        </If>

        <Choose>
          <When condition={tabName === 'videos'}>
            <div className="text-truncate">
              {`First video: ${getDate(cameraStats.firstVideo)}`}
            </div>
            <div className="text-truncate">
              {`Last video: ${getDate(cameraStats.lastVideo)}`}
            </div>
            <div className="text-truncate">
              {`Total videos: ${getCount(cameraStats.totalVideos)}`}
            </div>
          </When>
          <Otherwise>
            <div className="text-truncate">
              {`First photo: ${getDate(cameraStats.firstPhoto)}`}
            </div>
            <div className="text-truncate">
              {`Last photo: ${getDate(cameraStats.lastPhoto)}`}
            </div>
            <div className="text-truncate">
              {`Total photos: ${getCount(cameraStats.totalPhotos)}`}
            </div>
          </Otherwise>
        </Choose>

        <div className="d-flex gap-2 align-items-start">
          <Button className="p-0" variant="link" size="sm" onClick={openDeleteCameraModal}>{t('delete')}</Button>
          <Button className="p-0" variant="link" size="sm" onClick={openEditCameraModal}>{t('settings')}</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CameraCard;
