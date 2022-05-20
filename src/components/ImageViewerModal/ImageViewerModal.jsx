import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import cn from 'classnames';
// import { useDispatch } from 'react-redux';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import styles from './ImageViewerModal.module.css';
// import { fileManagerActions } from '../../store/fileManagerSlice.js';

const isImage = (file) => file.type !== 'Folder';
// const getImages = (files) => (files ? files.filter(isImage) : []);

function ImageViewerModal(props) {
  const { show, setShow, files, selectedFiles } = props;

  // const dispatch = useDispatch();

  const selected = Object.values(selectedFiles)[0];
  const images = files.filter(isImage);
  const index = images.findIndex((image) => image._id === selected._id);

  const [currentIndex, setCurrentIndex] = useState(index);

  const image = images[currentIndex];

  const disabledNext = currentIndex === images.length - 1;
  const disabledPrew = currentIndex === 0;

  const refs = _.reduce(images, (acc, value) => {
    acc[value._id] = React.createRef();
    return acc;
  }, {});

  const onHide = () => {
    setShow(false);
  };

  const onNextClick = () => {
    setCurrentIndex((prew) => prew + 1);
  };

  const onPrewClick = () => {
    setCurrentIndex((prew) => prew - 1);
  };

  const onSelect = (indx) => {
    setCurrentIndex(indx);
  };

  // const onDelete = () => {
  //   dispatch(fileManagerActions.deleteOneFile({
  //     cameraId: image.camera,
  //     file: image,
  //   }))
  //     .then((resp) => {
  //       if (resp.error) {
  //         console.log('network error', resp);
  //         return;
  //       }

  //       if (images.length === 0) {
  //         setShow(false);
  //         return;
  //       }
  //       const index = currentIndex >= images.length ? images.length - 1 : currentIndex;
  //       setCurrentIndex(index);
  //     });
  //   // change index
  // };

  useEffect(() => {
    if (image) {
      const element = refs[image._id].current;
      if (element) {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
        });
      }
    }
  }, [image, refs]);

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
        <div className={styles.bodyContainer}>
          <div className={styles.imageContainer}>
            <ImgWrapper width={100} height={0.5625} src={`/files/${image._id}`} />
          </div>
          <div className={styles.overflowContainer}>
            <div style={{ width: `${images.length * 110}px` }} className={styles.itemsContainer}>
              {images.map((file, i) => {
                const classNames = cn(styles.item, { [styles.selectedItem]: image._id === file._id });
                return (
                  <div ref={refs[file._id]} className={classNames} key={file._id}>
                    <ImgWrapper
                      width={100}
                      height={0.5625}
                      src={`/files/${file._id}?size=thumbnail`}
                      role="button"
                      onClick={() => onSelect(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button key="delete" onClick={onDelete}>
          Delete selected
        </Button> */}
        <Button key="prew" onClick={onPrewClick} disabled={disabledPrew}>
          Previous
        </Button>
        <Button key="next" onClick={onNextClick} disabled={disabledNext}>
          Next
        </Button>
        <Button key="close" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageViewerModal;
