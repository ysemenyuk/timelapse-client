import React from 'react';
import { Col, Button, Spinner, ToggleButton } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import cn from 'classnames';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import styles from './PhotosManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
// import Heading from '../UI/Heading';
import Error from '../UI/Error';
import usePhotosManager from './usePhotosManager';
import ImageViewer from './PhotosViewer';
import 'react-datepicker/dist/react-datepicker.css';

function CameraPhotosManager() {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    select,
    showImageViewer,
    onRefetchClick,
    onSetAvatarClick,
    onDeleteSelected,
    onSelectClick,
    onFileClick,
    onFileDoubleClick,
    onCloseImageViewer,
    setSelectedIndexes,
    setSelect,
    date,
    onChangeDate,
  } = usePhotosManager();

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
  };

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
      <Col md={12} className="mb-4 d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          <DatePicker
            selected={date}
            onChange={onChangeDate}
          />
          <div className={styles.btnsContainer}>
            <div className={styles.defaultBtns}>
              <div>
                {`Files: ${currentFiles ? currentFiles.length : 0}`}
              </div>
              <Button
                type="primary"
                size="sm"
                onClick={onRefetchClick}
                disabled={fetchStatus.isLoading}
              >
                Refetch
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.deleteBtns}>
          {(selectedIndexes.length > 0) && `Selected: ${selectedIndexes.length}`}
          <ToggleButton
            size="sm"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={select}
            onChange={onSelectClick}
          >
            SelectMany
          </ToggleButton>
          <Button
            type="primary"
            size="sm"
            onClick={onDeleteBtnClick}
            disabled={fetchStatus.isLoading || _.isEmpty(selectedIndexes)}
          >
            Delete
          </Button>
        </div>
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
            <div className={styles.container}>No files in this date ..</div>
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
          select={select}
          setSelect={setSelect}
          onDeleteSelected={onDeleteSelected}
          onSetAvatarClick={onSetAvatarClick}
        />
      </If>

    </>
  );
}

export default CameraPhotosManager;
