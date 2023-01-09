import React from 'react';
// import cn from 'classnames';
// import { useDispatch } from 'react-redux';
import format from 'date-fns/format';
import { ListGroup, Card, Button } from 'react-bootstrap';
import Heading from '../UI/Heading.jsx';
import styles from './CameraInfo.module.css';
// import TasksActions from '../TasksActions/TasksActions.jsx';
// import { modals } from '../../utils/constants.js';
// import { modalActions } from '../../redux/modalSlice.js';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';

function CameraInfo({ selectedCamera, onClick, compact, buttons }) {
  // const dispatch = useDispatch();

  // const openEditCameraModal = () => {
  //   dispatch(modalActions.openModal({ type: modals.EDIT_CAMERA }));
  // };

  // const openDeleteCameraModal = async () => {
  //   dispatch(modalActions.openModal({ type: modals.DELETE_CAMERA }));
  // };

  if (selectedCamera === null) {
    return null;
  }

  return (
    <>
      <Choose>
        <When condition={compact}>
          <Card className={styles.card} role="button" onClick={onClick}>
            <ImgWrapper width={100} height={0.5625} src={`/files/${selectedCamera.avatar._id}`} />
            <Card.Header className={styles.cardHeader}>
              <div className="text-truncate fw-bold">{selectedCamera.name}</div>
              <div className="text-truncate">{selectedCamera.description}</div>
            </Card.Header>
            <Card.Body className={styles.cardBody}>
              <div className="text-truncate">
                {`First photo: ${format(new Date(selectedCamera.firstPhoto.date), 'dd.MM.yyyy hh:mm:ss')}`}
              </div>
              <div className="text-truncate">
                {`Last photo: ${format(new Date(selectedCamera.lastPhoto.date), 'dd.MM.yyyy hh:mm:ss')}`}
              </div>
              <div className="text-truncate">
                {`Total photos: ${selectedCamera.photosCount}`}
              </div>
            </Card.Body>
          </Card>
        </When>

        <Otherwise>
          <Heading lvl={6} className="mb-3">
            Info
          </Heading>
          <ListGroup className="mb-3" role="button" onClick={onClick}>
            <ListGroup.Item>
              <div className="w-50 me-3">Name:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.name}</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="w-50 me-3">Description:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.description}</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="me-3">http Link:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.photoUrl || 'Empty link'}</div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="w-50 me-3">rtsp Link:</div>
              <div className="w-75 text-truncate text-muted">{selectedCamera.rtspUrl || 'Empty link'}</div>
            </ListGroup.Item>
          </ListGroup>
        </Otherwise>
      </Choose>

      <If condition={buttons}>
        <div className="mb-3 mt-2 d-flex justify-content-between">
          <div>
            <Button onClick={onClick} variant="primary" size="sm" className="me-2">
              Settings
            </Button>
            {/* <Button onClick={openDeleteCameraModal} variant="primary" size="sm" className="me-2">
              Delete
            </Button> */}
          </div>

          {/* <TasksActions /> */}

        </div>
      </If>
    </>
  );
}

export default CameraInfo;
