import React from 'react';
import { Breadcrumb, Col, Button, Spinner, Form } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import ImageViewer from './ImageViewer';
import SelectDate from './SelectDate';

function CameraFileManager({ selectedCamera }) {
  const {
    fetchStatus,
    currentFiles,
    navigationStack,
    selectedIndexes,
    multiSelect,
    showImageViewer,
    onRefreshClick,
    onBackButtonClick,
    onBreadCrumbClick,
    onSetAvatarClick,
    onDeleteSelected,
    onMultiSelectClick,
    onFileClick,
    onFileDoubleClick,
    onCloseImageViewer,
    setSelectedIndexes,
    setMultiSelect,
  } = useFileManager(selectedCamera);

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
  };

  const onAvatarBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }

    const currentIndex = _.head(selectedIndexes);
    const currentFile = currentFiles[currentIndex];

    // TODO: check file is image?
    onSetAvatarClick(currentFile);
  };

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
            {/* <Button
              type="primary"
              size="sm"
              onClick={onRefreshClick}
              disabled={fetchStatus.isLoading}
            >
              Refresh
            </Button> */}

            <If condition={navigationStack.length > 1}>
              <SelectDate />
            </If>

            <div>
              {currentFiles && `Files: ${currentFiles.length}`}
            </div>

          </div>
          <If condition={navigationStack.length > 1}>
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
                onClick={onDeleteBtnClick}
                disabled={fetchStatus.isLoading || _.isEmpty(selectedIndexes)}
              >
                {`Delete${selectedIndexes.length > 0 ? ` (${selectedIndexes.length})` : ''}`}
              </Button>
              <Button
                type="primary"
                size="sm"
                onClick={onAvatarBtnClick}
                disabled={fetchStatus.isLoading || _.isEmpty(selectedIndexes) || multiSelect}
              >
                AsAvatar
              </Button>
            </div>
          </If>
        </div>
      </Col>

      <Col md={12} className="mb-4">
        <Choose>
          <When condition={!navigationStack}>
            <Spinner animation="border" />
          </When>
          <Otherwise>
            <Breadcrumb>
              {renderBreadcrumbs()}
            </Breadcrumb>
          </Otherwise>
        </Choose>
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

          <When condition={currentFiles.length > 0}>
            <div className={styles.overflowContainer}>
              <div className={styles.filesContainer}>
                {renderCurrentFiles()}
              </div>
            </div>
          </When>
        </Choose>
      </Col>

      <If condition={showImageViewer}>
        <ImageViewer
          onClose={onCloseImageViewer}
          currentFiles={currentFiles}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
          multiSelect={multiSelect}
          setMultiSelect={setMultiSelect}
          onDeleteSelected={onDeleteSelected}
          onSetAvatarClick={onSetAvatarClick}
        />
      </If>

    </>
  );
}

export default CameraFileManager;
