import React from 'react';
import { Col, Button, Spinner, Form } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import styles from './FileManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import folderImg from '../../assets/folder2.png';
import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import ImageViewer from './ImageViewer';

function CreateVideoFileManager({ selectedCamera }) {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    multiSelect,
    showImageViewer,

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
    filesCount,
    onSearch,
  } = useFileManager(selectedCamera);

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
      <Col md={12} className="mb-4">
        <Heading lvl={6} className="mb-3">
          Create video from photos
        </Heading>
      </Col>

      <Col md={12} className="mb-4 d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
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
          {`Files: ${filesCount}`}

          <Button
            type="primary"
            size="sm"
            onClick={onSearch}
          >
            Show
          </Button>
        </div>

        <div className="d-flex gap-2 align-items-center">
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

        </div>
      </Col>

      {currentFiles && `currentFiles: ${currentFiles.length}`}

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

export default CreateVideoFileManager;
