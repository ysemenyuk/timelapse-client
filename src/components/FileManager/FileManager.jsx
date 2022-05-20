import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Breadcrumb, Col, Button, Spinner, Form } from 'react-bootstrap';
import cn from 'classnames';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
// import { fileManagerActions } from '../../store/fileManagerSlice';
import ButtonsGroup from '../UI/ButtonsGroup';
import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
// import { IMAGE_VIEWER, CREATE_VIDEO } from '../../utils/constants';
// import { modalActions } from '../../store/modalSlice';
import ImageViewerModal from '../ImageViewerModal/ImageViewerModal';
// import useImageViewer from '../ImageViewerModal/useImageViewer';

function CameraFileManager({ selectedCamera }) {
  // const dispatch = useDispatch();

  const [selectedItems, selectItem] = useState({});
  const [multiSelect, setMultiSelect] = useState(false);
  const [show, setShow] = useState(false);

  const {
    fetchStatus,
    files,
    folders,
    navigationStack,
    selectedFolder,
    onRefreshClick,
    onBreadCrumbClick,
    onFolderDoubleClick,
    onBackButtonClick,
  } = useFileManager(selectedCamera);

  // const {
  //   onImageDoubleClick,
  //   ...imageViewerProps
  // } = useImageViewer(selectedCamera, files);

  // const deleteFileHandler = (file) => {
  //   dispatch(fileManagerActions.deleteOneFile({
  //     cameraId: selectedCamera._id,
  //     file: file,
  //   }));
  // };

  const deleteSelectedHandler = () => {
    // delete selectedItems
  };

  const multiSelectClickHandler = () => {
    if (multiSelect) {
      selectItem({});
    }
    setMultiSelect(!multiSelect);
  };

  const doubleClickFileHandler = (file) => {
    // if file is image
    // onImageDoubleClick(index);
    selectItem({ [file._id]: file });
    setShow(true);
  };

  const selectItemHandler = (item) => {
    if (multiSelect) {
      selectItem((prew) => ({ ...prew, [item._id]: item }));
    } else {
      selectItem({ [item._id]: item });
    }
  };

  const renderBreadcrumbs = () => navigationStack.map((folder) => (
    <Breadcrumb.Item
      onClick={() => onBreadCrumbClick(folder)}
      key={folder._id}
    >
      {folder.name}
    </Breadcrumb.Item>
  ));

  const renderFolders = () => folders.map((folder) => {
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedItems[folder._id] });
    return (
      <div className={classNames} key={folder._id}>
        <ImgWrapper
          width={100}
          height={0.5625}
          src={folderImg}
          role="button"
          onClick={(e) => selectItemHandler(folder, e)}
          onDoubleClick={() => onFolderDoubleClick(folder)}
        />
        <span>{folder.name}</span>
      </div>
    );
  });

  const renderFiles = () => files.map((file, index) => {
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedItems[file._id] });
    return (
      <div className={classNames} key={file._id}>
        <ImgWrapper
          width={100}
          height={0.5625}
          src={`/files/${file._id}?size=thumbnail`}
          role="button"
          onClick={() => selectItemHandler(file)}
          onDoubleClick={() => doubleClickFileHandler(file, index)}
        />
        <span>{file.name}</span>
      </div>
    );
  });

  return (
    <>
      <Col md={12} className="mb-4">
        <Heading lvl={6} className="mb-3">
          Files
        </Heading>

        <ButtonsGroup>
          <Button
            type="primary"
            size="sm"
            onClick={onBackButtonClick}
            disabled={fetchStatus.isLoading}
          >
            Back
          </Button>
          <Button
            type="primary"
            size="sm"
            onClick={onRefreshClick}
            disabled={fetchStatus.isLoading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            size="sm"
            onClick={deleteSelectedHandler}
            disabled={fetchStatus.isLoading}
          >
            DeleteSelected
          </Button>
          <Form>
            <Form.Check
              type="switch"
              id="switch"
              label="MuliSelect"
              onChange={multiSelectClickHandler}
              checked={multiSelect}
            />
          </Form>
        </ButtonsGroup>
      </Col>

      <Choose>
        <When condition={!selectedFolder || !navigationStack}>
          <Spinner animation="border" />
        </When>

        <Otherwise>
          <Col md={12} className="mb-4">
            <Breadcrumb>
              {renderBreadcrumbs()}
            </Breadcrumb>
          </Col>

          <Col md={12} className="mb-4">
            <Choose>
              <When condition={fetchStatus.isError}>
                <Error message="Fetch files. Network error " type="error" />
              </When>

              <When condition={!folders || !files || fetchStatus.isLoading}>
                <Spinner animation="border" />
              </When>

              <When condition={folders.length === 0 && files.length === 0}>
                <div className={styles.container}>No files or folders..</div>
              </When>

              <When condition={folders && files}>
                <div className={styles.container}>
                  {renderFolders()}
                  {renderFiles()}
                </div>
              </When>
            </Choose>
          </Col>
        </Otherwise>
      </Choose>

      <If condition={show}>
        <ImageViewerModal files={files} selectedFiles={selectedItems} setShow={setShow} show={show} />
      </If>

    </>
  );
}

export default CameraFileManager;
