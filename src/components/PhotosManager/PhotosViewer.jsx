import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Modal, Button, ToggleButton } from 'react-bootstrap';
import cn from 'classnames';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import styles from './PhotosViewer.module.css';

const isImage = (file) => file.type !== 'folder';
// const getImages = (files) => (files ? files.filter(isImage) : []);

function ImageViewer(props) {
  const {
    onClose, currentFiles, selectedIndexes, setSelectedIndexes,
    onDeleteSelected, select, setSelect, onSetAvatarClick,
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
    if (select) {
      setSelectedIndexes((prew) => ([...prew, index]));
    } else {
      setSelectedIndexes([index]);
    }
  };

  const onNextClick = () => {
    if (select) {
      setSelect(false);
    }
    setSelectedIndexes((prew) => ([_.head(prew) + 1]));
  };

  const onPrewClick = () => {
    if (select) {
      setSelect(false);
    }
    setSelectedIndexes((prew) => ([_.head(prew) - 1]));
  };

  const onSelectClick = () => {
    if (!_.isEmpty(selectedIndexes)) {
      setSelectedIndexes((prew) => ([_.head(prew)]));
    }
    setSelect(!select);
  };

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => images[index]);
    onDeleteSelected(selectedItems);
  };

  const onAvatarBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }

    // TODO: check file is image?
    onSetAvatarClick(currentImage);
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
      <Modal.Header bsPrefix="modal-header" closeButton>
        {currentImage.name}
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
            <Button
              type="primary"
              size="sm"
              onClick={onAvatarBtnClick}
              disabled={_.isEmpty(selectedIndexes) || select}
            >
              SetAsAvatar
            </Button>
            <Button
              type="primary"
              size="sm"
              onClick={onDeleteBtnClick}
              disabled={_.isEmpty(selectedIndexes)}
            >
              Delete
            </Button>
            <ToggleButton
              size="sm"
              id="toggle-check-2"
              type="checkbox"
              variant="outline-primary"
              checked={select}
              onChange={onSelectClick}
            >
              SelectMany
            </ToggleButton>
            {(selectedIndexes.length > 0) && `Selected: ${selectedIndexes.length}`}
          </div>
          <div className={styles.defaultBtns}>
            <Button key="prew" size="sm" onClick={onPrewClick} disabled={disabledPrew}>
              Previous
            </Button>
            <Button key="next" size="sm" onClick={onNextClick} disabled={disabledNext}>
              Next
            </Button>
            <Button key="close" size="sm" onClick={onHide}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageViewer;
