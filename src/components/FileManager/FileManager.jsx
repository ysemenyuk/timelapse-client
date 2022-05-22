import React from 'react';
import { Breadcrumb, Col, Button, Spinner, Form } from 'react-bootstrap';
import cn from 'classnames';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import ImageViewer from './ImageViewer';

function CameraFileManager({ selectedCamera }) {
  const {
    fetchStatus,
    currentFolder,
    currentFiles,
    navigationStack,
    selectedIndexes,
    multiSelect,
    showImageViewer,
    onCloseImageViewer,
    onRefreshClick,
    onBackButtonClick,
    onBreadCrumbClick,
    onDeleteSelected,
    onMultiSelectClick,
    setSelectedIndexes,
    setMultiSelect,
    onFileClick,
    onFileDoubleClick,
  } = useFileManager(selectedCamera);

  const renderBreadcrumbs = () => navigationStack.map((folder) => (
    <Breadcrumb.Item
      onClick={() => onBreadCrumbClick(folder)}
      key={folder._id}
    >
      {folder.name}
    </Breadcrumb.Item>
  ));

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const src = file.type === 'folder' ? folderImg : `/files/${file._id}?size=thumbnail`;
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
    return (
      <div
        role="presentation"
        className={classNames}
        key={file._id}
        onClick={() => onFileClick(index)}
        onDoubleClick={() => onFileDoubleClick(file, index)}
      >
        <ImgWrapper
          width={100}
          height={0.5625}
          src={src}
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

        <div className={styles.btnsContainer}>
          <div className={styles.defaultBtns}>
            <Button
              type="primary"
              size="sm"
              onClick={onBackButtonClick}
              disabled={fetchStatus.isLoading || navigationStack.length < 2}
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
          </div>
          <div className={styles.deleteBtns}>
            <Form>
              <Form.Check
                type="switch"
                id="switch"
                label="MuliSelect"
                onChange={onMultiSelectClick}
                checked={multiSelect}
              />
            </Form>
            <Button
              type="primary"
              size="sm"
              onClick={() => onDeleteSelected(currentFiles)}
              disabled={fetchStatus.isLoading}
            >
              {`DeleteSelected (${selectedIndexes.length})`}
            </Button>
          </div>
        </div>
      </Col>

      <Choose>
        <When condition={!currentFolder || !navigationStack}>
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

              <When condition={!currentFiles || fetchStatus.isLoading}>
                <Spinner animation="border" />
              </When>

              <When condition={currentFiles.length === 0}>
                <div className={styles.container}>No files or folders..</div>
              </When>

              <When condition={currentFiles}>
                <div className={styles.container}>
                  {renderCurrentFiles()}
                </div>
              </When>
            </Choose>
          </Col>
        </Otherwise>
      </Choose>

      <If condition={showImageViewer}>
        <ImageViewer
          onClose={onCloseImageViewer}
          currentFiles={currentFiles}
          selectedIndexes={selectedIndexes}
          multiSelect={multiSelect}
          onFileClick={onFileClick}
          onDeleteSelected={onDeleteSelected}
          setSelectedIndexes={setSelectedIndexes}
          setMultiSelect={setMultiSelect}
          onMultiSelectClick={onMultiSelectClick}
        />
      </If>

    </>
  );
}

export default CameraFileManager;
