import React from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';
// import cn from 'classnames';
// import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
// import ReactPlayer from 'react-player';
// import styles from './PhotosViewer.module.css';
// const isImage = (file) => file.type.includes('photo');
// const getImages = (files) => (files ? files.filter(isImage) : []);

function VideoViewer(props) {
  const {
    onClose,
    currentFiles,
    selectedIndexes,
    setSelectedIndexes,
    onDeleteSelected,
  } = props;

  const currentIndex = _.head(selectedIndexes);
  const currentVideo = currentFiles[currentIndex];

  console.log(666, currentVideo);

  const onHide = () => {
    setSelectedIndexes([]);
    onClose();
  };

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
    setSelectedIndexes([]);
  };

  return (
    <Modal
      show
      onHide={onHide}
      size="xl"
    >
      <Modal.Header closeButton>
        {currentVideo.name}
      </Modal.Header>

      <Modal.Body>
        <video controls muted width="100%" height="100%">
          <source src={`/files/${currentVideo._id}`} type="video/mp4" />
        </video>
        {/* <ReactPlayer width="100%" height="100%" playing controls url={`/files/${currentVideo._id}`} /> */}

      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="d-flex gap-2">
          <Button
            type="primary"
            size="sm"
          >
            Download
          </Button>
          <Button
            type="primary"
            size="sm"
            onClick={onDeleteBtnClick}
            disabled={_.isEmpty(selectedIndexes)}
          >
            Delete
          </Button>
        </div>
        <div className="d-flex gap-2">
          <Button key="close" size="sm" onClick={onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoViewer;
