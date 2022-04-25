import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import { fileManagerActions } from '../../store/fileManagerSlice.js';
import withModalWrapper from './withModalWrapper.jsx';
import { IMAGE_VIEWER } from '../../utils/constants.js';

function ImgViewerModal({ type, show, onHide, files, onDeleteFile }) {
  const dispatch = useDispatch();
  const { currentFileIndex } = useSelector((state) => state.fileManager);

  if (currentFileIndex === null || !files) {
    return null;
  }

  const currentFile = files[currentFileIndex];

  const nextImgBtnDisabled = currentFileIndex === files.length - 1;
  const prewImgBtnDisabled = currentFileIndex === 0;

  const nextImageHandler = () => {
    dispatch(fileManagerActions.nextFile());
  };

  const prewImageHandler = () => {
    dispatch(fileManagerActions.prewFile());
  };

  const deleteFileHandler = () => {
    onDeleteFile(currentFile);
  };

  return (
    <Modal
      show={show && type === IMAGE_VIEWER}
      onHide={onHide}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>{currentFile?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImgWrapper width={100} height={0.5625} src={`/files/${currentFile?.name}`} />
      </Modal.Body>
      <Modal.Footer>
        <Button key="prew" onClick={prewImageHandler} disabled={prewImgBtnDisabled}>
          Previous
        </Button>
        <Button key="next" onClick={nextImageHandler} disabled={nextImgBtnDisabled}>
          Next
        </Button>
        <Button key="delete" onClick={deleteFileHandler}>
          Delete
        </Button>
        <Button key="close" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withModalWrapper(ImgViewerModal);
