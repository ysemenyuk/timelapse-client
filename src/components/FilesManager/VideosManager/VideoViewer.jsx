import React from 'react';
// import _ from 'lodash';
// import cn from 'classnames';
import format from 'date-fns/format';
import { Modal, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

function VideoViewer(props) {
  const {
    onClose,
    currentFiles,
    selectedIndex,
    setSelectedIndex,
    onDeleteSelected,
  } = props;

  const currentVideo = currentFiles[selectedIndex];
  // console.log(666, currentVideo);

  const startDate = format(new Date(currentVideo.videoFileData.startDate), 'yyyy.MM.dd');
  const endDate = format(new Date(currentVideo.videoFileData.endDate), 'yyyy.MM.dd');

  const onHide = () => {
    setSelectedIndex(null);
    onClose();
  };

  const onDeleteBtnClick = () => {
    onDeleteSelected(currentVideo);
    setSelectedIndex(null);
    onClose();
  };

  return (
    <Modal
      show
      onHide={onHide}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Timelapse (${startDate} - ${endDate})`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <video controls muted width="100%" height="100%">
          <source src={currentVideo.link} type="video/mp4" />
        </video> */}
        <Player
          autoPlay
          src={currentVideo.link}
          poster={currentVideo.poster.link}
        >
          <BigPlayButton position="center" />
        </Player>

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
