import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import cn from 'classnames';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import styles from './ImageViewerModal.module.css';

function ImageViewerModal(props) {
  const { show, onHide, image, images, onNextClick, onPrewClick, disabledPrew, disabledNext, onDelete } = props;

  if (!image) {
    return null;
  }

  const renderFiles = () => images.map((file, index) => {
    const classNames = cn(styles.item, { [styles.selectedItem]: image._id === file._id });
    return (
      <div className={classNames} key={file._id}>
        <ImgWrapper
          width={100}
          height={0.5625}
          src={`/files/${file._id}?size=thumbnail`}
          role="button"
          // onClick={() => selectItemHandler(file)}
        />
        {/* <span>{file.name}</span> */}
      </div>
    );
  });

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      fullscreen
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{image.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.bodyContainer}>
          <div className={styles.imageContainer}>
            <ImgWrapper width={100} height={0.5625} src={`/files/${image._id}`} />
          </div>
          <div className={styles.itemsContainer}>
            {renderFiles()}
          </div>
        </div>
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
