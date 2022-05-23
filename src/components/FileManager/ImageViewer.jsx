import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Modal, Button, Form } from 'react-bootstrap';
import cn from 'classnames';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import styles from './ImageViewer.module.css';

const isImage = (file) => file.type !== 'Folder';
// const getImages = (files) => (files ? files.filter(isImage) : []);

function ImageViewer(props) {
  const {
    onClose, currentFiles, selectedIndexes, setSelectedIndexes,
    onDeleteSelected, multiSelect, setMultiSelect,
  } = props;

  const [images, setImages] = useState(currentFiles.filter(isImage));

  const currentIndex = _.head(selectedIndexes);
  const currentImage = images[currentIndex];

  const disabledNext = currentIndex === images.length - 1;
  const disabledPrew = currentIndex === 0;

  const refs = _.reduce(images, (acc, value) => {
    acc[value._id] = React.createRef();
    return acc;
  }, {});

  const onHide = () => {
    setSelectedIndexes((prew) => [_.head(prew)]);
    onClose();
  };

  const onFileClick = (index) => {
    if (multiSelect) {
      setSelectedIndexes((prew) => ([...prew, index]));
    } else {
      setSelectedIndexes([index]);
    }
  };

  const onNextClick = () => {
    if (multiSelect) {
      setMultiSelect(false);
    }
    setSelectedIndexes((prew) => ([_.head(prew) + 1]));
  };

  const onPrewClick = () => {
    if (multiSelect) {
      setMultiSelect(false);
    }
    setSelectedIndexes((prew) => ([_.head(prew) - 1]));
  };

  const onMultiSelectClick = () => {
    setSelectedIndexes((prew) => ([_.head(prew)]));
    setMultiSelect(!multiSelect);
  };

  const onDeleteBtnClick = () => {
    const selectedItems = selectedIndexes.map((index) => images[index]);
    onDeleteSelected(selectedItems);
  };

  useEffect(() => {
    const newImages = currentFiles.filter(isImage);
    const imagesCount = newImages.length;

    if (imagesCount === 0) {
      setSelectedIndexes([]);
      onClose();
      return;
    }

    if (currentIndex > imagesCount - 1) {
      setSelectedIndexes([imagesCount - 1]);
    }

    setImages(newImages);
  }, [currentFiles]);

  useEffect(() => {
    if (currentImage) {
      const element = refs[currentImage._id].current;
      if (element) {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
        });
      }
    }
  }, [currentImage, refs]);

  if (!currentImage) {
    return null;
  }

  return (
    <Modal
      show
      onHide={onHide}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title bsPrefix="fs-6">{currentImage.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.bodyContainer}>
          <div className={styles.imageContainer}>
            <ImgWrapper width={100} height={0.5625} src={`/files/${currentImage._id}`} />
          </div>
          <div className={styles.overflowContainer}>
            <div style={{ width: `${images.length * 110}px` }} className={styles.itemsContainer}>
              {images.map((file, index) => {
                const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
                return (
                  <div ref={refs[file._id]} className={classNames} key={file._id}>
                    <ImgWrapper
                      width={100}
                      height={0.5625}
                      src={`/files/${file._id}?size=thumbnail`}
                      role="button"
                      onClick={() => onFileClick(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.footerContainer}>
          <div className={styles.deleteBtns}>
            <Button key="del" onClick={onDeleteBtnClick}>
              {`DeleteSelected (${selectedIndexes.length})`}
            </Button>
            <Form>
              <Form.Check
                type="switch"
                id="switch"
                label="MuliSelect"
                onChange={onMultiSelectClick}
                checked={multiSelect}
              />
            </Form>
          </div>
          <div className={styles.defaultBtns}>
            <Button key="prew" onClick={onPrewClick} disabled={disabledPrew}>
              Previous
            </Button>
            <Button key="next" onClick={onNextClick} disabled={disabledNext}>
              Next
            </Button>
            <Button key="close" onClick={onHide}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageViewer;
