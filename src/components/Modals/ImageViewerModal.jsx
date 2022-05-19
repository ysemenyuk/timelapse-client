import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';

function ImageViewerModal(props) {
  const { show, onHide, image, onNextClick, onPrewClick, disabledPrew, disabledNext, onDelete } = props;

  if (!image) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>{image.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImgWrapper width={100} height={0.5625} src={`/files/${image._id}`} />
      </Modal.Body>
      <Modal.Footer>
        <Button key="prew" onClick={onPrewClick} disabled={disabledPrew}>
          Previous
        </Button>
        <Button key="next" onClick={onNextClick} disabled={disabledNext}>
          Next
        </Button>
        <Button key="delete" onClick={onDelete}>
          Delete
        </Button>
        <Button key="close" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageViewerModal;
