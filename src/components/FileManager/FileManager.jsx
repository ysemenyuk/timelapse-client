import React from 'react';
import { Col, Button, Spinner, Form, Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import cn from 'classnames';
import _ from 'lodash';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
// import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import ImageViewer from './ImageViewer';

function CameraFileManager({ selectedCamera }) {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    multiSelect,
    showImageViewer,
    onRefetchClick,
    onSetAvatarClick,
    onDeleteSelected,
    onMultiSelectClick,
    onFileClick,
    onFileDoubleClick,
    onCloseImageViewer,
    setSelectedIndexes,
    setMultiSelect,

    date,
    setDate,
    fileType,
    setFileType,
    // filesCount,
    // onSearch,
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

        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link active={fileType === 'photo,photoByTime'} onClick={() => setFileType('photo,photoByTime')}>
              Photos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={fileType === 'video,videoByTime'} onClick={() => setFileType('video,videoByTime')}>
              Videos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>

      <Col md={12} className="mb-4 d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          <Form.Group>
            <Form.Control
              size="sm"
              onChange={(e) => setDate((prew) => ({ ...prew, startDate: e.target.value }))}
              value={date.startDate}
              name="startDate"
              id="startDate"
              type="date"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              size="sm"
              onChange={(e) => setDate((prew) => ({ ...prew, endDate: e.target.value }))}
              value={date.endDate}
              name="endDate"
              id="endDate"
              type="date"
            />
          </Form.Group>
          {/* {`Total files: ${filesCount}`} */}
          <div className={styles.btnsContainer}>
            <div className={styles.defaultBtns}>
              <Button
                type="primary"
                size="sm"
                onClick={onRefetchClick}
                disabled={fetchStatus.isLoading}
              >
                Refetch
              </Button>
              <div>
                {currentFiles && `Files: ${currentFiles.length}`}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.deleteBtns}>
          <Form>
            <Form.Check
              type="switch"
              id="switch"
              label="MultiSelect"
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
            <div className={styles.container}>No files..</div>
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
