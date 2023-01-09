import React from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import cn from 'classnames';
import format from 'date-fns/format';
// import _ from 'lodash';
import styles from './VideosManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
// import folderImg from '../../assets/folder2.png';
// import Heading from '../UI/Heading';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import 'react-datepicker/dist/react-datepicker.css';
import FileManagerHead from './FileManagerHead';
import VideoViewer from './VideoViewer';

function VideosManager() {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    isShowImageViewer,
    onCloseImageViewer,
    onRefetchClick,
    setSelectedIndexes,
    onDeleteSelected,
    onFileClick,
    onSelectButtonClick,

    isSelectFiles,
    isPhotos,
    isVideos,
    isRangeDate,
    startDate,
    endDate,

    onChangeFileType,
    onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
  } = useFileManager();

  // console.log(7777, currentFiles);

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const { video } = file;
    const src = `/files/${video.poster}?size=thumbnail`;
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
    return (
      <Col key={file._id} className="mb-3">
        <Card
          border="light"
          role="button"
          className={classNames}
          onClick={() => onFileClick(index)}
        >
          <ImgWrapper
            width={100}
            height={0.5625}
            src={src}
          />
          <div className={styles.itemBody}>
            <div className="text-truncate">{file.name}</div>
            {`${format(new Date(video.startDate), 'yyyy.MM.dd')} - ${format(new Date(video.endDate), 'yyyy.MM.dd')}`}
            <div>{`${video.duration} seconds`}</div>
          </div>
        </Card>
      </Col>
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
        onSelectButtonClick={onSelectButtonClick}
        isSelectFiles={isSelectFiles}
        isPhotos={isPhotos}
        isVideos={isVideos}
        isRangeDate={isRangeDate}
        startDate={startDate}
        endDate={endDate}
        onChangeFileType={onChangeFileType}
        onChangeDateFormat={onChangeDateFormat}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
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
              <Row sm={4} className="mb-3">
                {renderCurrentFiles()}
              </Row>
            </div>
          </When>
        </Choose>
      </Col>

      <If condition={isShowImageViewer}>
        <VideoViewer
          onClose={onCloseImageViewer}
          currentFiles={currentFiles}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
          onDeleteSelected={onDeleteSelected}
        />
      </If>

    </>
  );
}

export default VideosManager;
