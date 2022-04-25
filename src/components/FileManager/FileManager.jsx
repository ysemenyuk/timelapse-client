import React from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumb, Col, Button, Spinner } from 'react-bootstrap';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
import { cameraActions } from '../../store/cameraSlice';
import { fileManagerActions } from '../../store/fileManagerSlice';
import ButtonsGroup from '../UI/ButtonsGroup';
import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from '../../hooks/useFileManager';
import { IMAGE_VIEWER } from '../../utils/constants';
import { modalActions } from '../../store/modalSlice';
import ImgViewerModal from '../Modals/ImgViewerModal';

function CameraFileManager({ selectedCamera }) {
  const dispatch = useDispatch();

  const {
    files,
    folders,
    parentFolder,
    foldersStack,
    fetchStatus,
  } = useFileManager(selectedCamera);

  const cameraId = selectedCamera._id;
  const btnDisabled = !parentFolder || fetchStatus.isLoading;

  const clickFileHandler = (index) => {
    dispatch(fileManagerActions.setCurrentFileIndex({ cameraId, index }));
    dispatch(modalActions.openModal(IMAGE_VIEWER));
  };

  const clickFolderHandler = (item) => {
    dispatch(fileManagerActions.pushToFoldersStack({ cameraId, item }));
  };

  const clickBreadcrumbHandler = (folder) => {
    dispatch(fileManagerActions.setParentFolder({ cameraId, folder }));
  };

  const clickBackHandler = () => {
    dispatch(fileManagerActions.popFromFoldersStack({ cameraId }));
  };

  const clickRefreshHandler = () => {
    if (parentFolder) {
      dispatch(
        fileManagerActions.fetchFiles({
          cameraId: selectedCamera._id,
          parentId: parentFolder._id,
        }),
      );
    }
  };

  const createScreenshotHandler = () => {
    dispatch(cameraActions.createScreenshot({
      cameraId: selectedCamera._id,
      parentId: parentFolder._id,
    }));
  };

  const deleteFileHandler = (currentFile) => {
    dispatch(
      fileManagerActions.deleteOneFile({
        cameraId: selectedCamera._id,
        fileId: currentFile._id,
      }),
    );
  };

  const renderBreadcrumbs = () => foldersStack.map((folder) => (
    <Breadcrumb.Item
      onClick={() => clickBreadcrumbHandler(folder)}
      key={folder._id}
    >
      {folder.name}
    </Breadcrumb.Item>
  ));

  const renderFolders = () => folders.map((folder) => (
    <div className={styles.item} key={folder._id}>
      <ImgWrapper
        width={100}
        height={0.5625}
        src={folderImg}
        role="button"
        onClick={() => clickFolderHandler(folder)}
      />
      <span>{folder.name}</span>
    </div>
  ));

  const renderFiles = () => files.map((file, index) => (
    <div className={styles.item} key={file._id}>
      <ImgWrapper
        width={100}
        height={0.5625}
        src={`/files/${file.name}?size=thumbnail`}
        role="button"
        onClick={() => clickFileHandler(index)}
      />
      <span>{file.name}</span>
    </div>
  ));

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
            onClick={clickBackHandler}
            disabled={btnDisabled || foldersStack.length === 1}
          >
            Back
          </Button>
          <Button
            type="primary"
            size="sm"
            onClick={clickRefreshHandler}
            disabled={btnDisabled}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            size="sm"
            onClick={createScreenshotHandler}
            disabled={btnDisabled}
          >
            CreateScreenshot
          </Button>
          <Button
            type="primary"
            size="sm"
            disabled={btnDisabled}
          >
            CreateVideo
          </Button>
        </ButtonsGroup>
      </Col>

      <Choose>
        <When condition={!parentFolder || !foldersStack}>
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
                <Error message="Network error folders and files" type="error" />
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

      <ImgViewerModal
        files={files}
        onDeleteFile={deleteFileHandler}
      />
    </>
  );
}

export default CameraFileManager;
