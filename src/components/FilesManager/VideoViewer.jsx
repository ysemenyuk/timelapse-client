import React from 'react';
import _ from 'lodash';
// import cn from 'classnames';
import format from 'date-fns/format';
import { Modal, Button } from 'react-bootstrap';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

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
  const startDate = format(new Date(currentVideo.metaData.startDate), 'yyyy.MM.dd');
  const endDate = format(new Date(currentVideo.metaData.endDate), 'yyyy.MM.dd');

  // console.log(666, currentVideo);

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
        {`${currentVideo.name} (${startDate} - ${endDate})`}
      </Modal.Header>

      <Modal.Body>
        {/* <video controls muted width="100%" height="100%">
          <source src={currentVideo.link} type="video/mp4" />
        </video> */}
        <Player
          autoPlay
          src={currentVideo.link}
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
