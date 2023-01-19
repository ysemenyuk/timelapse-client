/* eslint-disable max-len */
import React from 'react';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import cn from 'classnames';
import format from 'date-fns/format';
// import _ from 'lodash';
import { PlayCircle } from 'react-bootstrap-icons';
import styles from './VideosManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import FileManagerHead from './FileManagerHead';
import VideoViewer from './VideoViewer';

function VideosManager() {
  const {
    onCreateVideoFile,
    fetchStatus,
    currentFiles,
    selectedIndexes,
    isShowImageViewer,
    onCloseImageViewer,
    onRefetchClick,
    setSelectedIndexes,
    onDeleteSelected,
    onFileClick,
    isRangeDate,
    startDate,
    endDate,
    onChangeFileType,
    onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
  } = useFileManager();

  // console.log(2222, currentFiles);

  const onDeleteBtnClick = (file) => () => {
    console.log('onDeleteBtnClick', file);
    onDeleteSelected([file]);
  };

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const { videoFileData } = file;
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
    return (
      <Col key={file._id} className="mb-3">
        <Card
          border="light"
          className={classNames}
        >
          <div
            role="presentation"
            onClick={() => onFileClick(index)}
            className={styles.container}
          >
            <ImgWrapper
              width={100}
              height={0.5625}
              src={file.poster && file.poster.link && `${file.poster.link}?size=thumbnail`}
            />
            <div className={styles.overlay}>
              <PlayCircle className={styles.icon} />
            </div>
          </div>
          <div className={styles.itemBody}>
            <div className="text-truncate">{file.name}</div>
            {`${format(new Date(videoFileData.startDate), 'yyyy.MM.dd')} - ${format(new Date(videoFileData.endDate), 'yyyy.MM.dd')}`}
            <div>{`${videoFileData.duration} seconds`}</div>
            <div className="d-flex gap-2 align-items-start">
              <Button className="p-0" variant="link" size="sm" onClick={onDeleteBtnClick(file)}>Delete</Button>
              <Button className="p-0" variant="link" size="sm" as="a" href={file.link} download>Download</Button>
            </div>
          </div>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <Button
            variant="info"
            size="sm"
            onClick={onCreateVideoFile}
          >
            +CreateVideo
          </Button>
        </div>
      </div>

      <FileManagerHead
        fetchStatus={fetchStatus}
        currentFiles={currentFiles}
        onRefetchClick={onRefetchClick}
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
              <Row xs={1} sm={2} lg={4} className="mb-3">
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
