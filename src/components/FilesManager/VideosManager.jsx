import React from 'react';
import { Col, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import cn from 'classnames';
// import _ from 'lodash';
import styles from './PhotosManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
// import folderImg from '../../assets/folder2.png';
// import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import 'react-datepicker/dist/react-datepicker.css';
import FileManagerHead from './FileManagerHead';

function VideosManager() {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    onRefetchClick,
    onDeleteSelected,
    onFileClick,
    isSelectFiles,
    onSelectButtonClick,
    // isRangeDate,
    // onChangeDateFormat,
    // startDate,
    // onChangeStartDate,
    // endDate,
    // onChangeEndDate,
  } = useFileManager();

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const src = `/files/${file._id}?size=thumbnail`;
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
    return (
      <div
        role="presentation"
        className={classNames}
        key={file._id}
        onClick={() => onFileClick(index)}
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
      <FileManagerHead
        fetchStatus={fetchStatus}
        currentFiles={currentFiles}
        selectedIndexes={selectedIndexes}
        onRefetchClick={onRefetchClick}
        onDeleteSelected={onDeleteSelected}
        isSelectFiles={isSelectFiles}
        onSelectButtonClick={onSelectButtonClick}
        // isRangeDate={isRangeDate}
        // onChangeDateFormat={onChangeDateFormat}
        // startDate={startDate}
        // onChangeStartDate={onChangeStartDate}
        // endDate={endDate}
        // onChangeEndDate={onChangeEndDate}
      />

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

    </>
  );
}

export default VideosManager;
