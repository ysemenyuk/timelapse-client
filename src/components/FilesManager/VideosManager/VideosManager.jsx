/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { Button, Card, Col, Row, Spinner, Pagination } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
import format from 'date-fns/format';
import { PlayCircle } from 'react-bootstrap-icons';
import styles from './VideosManager.module.css';
import ImgWrapper from '../../UI/ImgWrapper/ImgWrapper.jsx';
import Error from '../../UI/Error';
import useFileManager from '../useFileManager';
import QueryBar from '../QueryBar/QueryBar';
import VideoViewer from './VideoViewer';

function VideosManager() {
  const {
    onCreateVideoFile,
    onAddVideosByTimeTask,
    currentData,
    getFilesQuery,
    selectedIndex,
    isShowViewer,
    setSelectedIndex,
    onCloseViewer,
    onDeleteSelected,
    onFileClick,
    setPage,
  } = useFileManager({ limit: 4 });

  const currentFiles = currentData.items[currentData.currentPage];
  // console.log('currentFiles', currentFiles);

  const currentFilesCount = currentFiles ? currentFiles.length : 0;
  const totalFilesCount = currentData.totalFiles ? currentData.totalFiles : 0;

  const isPagunation = currentFilesCount < totalFilesCount;

  const pages = useMemo(() => {
    const active = currentData.currentPage;
    const items = [];
    for (let number = 1; number <= currentData.totalPages; number += 1) {
      items.push(
        <Pagination.Item onClick={() => setPage(number)} key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  }, [currentData]);

  const onDeleteFile = (file) => () => {
    onDeleteSelected(file);
  };

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const { videoFileData } = file;
    return (
      <Col key={file._id} className="mb-3">
        <Card
          border="light"
          className={styles.item}
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
            <div className="text-truncate">{videoFileData.customName}</div>
            {`${format(new Date(videoFileData.startDate), 'yyyy.MM.dd')} 
            - ${format(new Date(videoFileData.endDate), 'yyyy.MM.dd')}`}
            <div>{`${videoFileData.duration} seconds`}</div>
            <div className="d-flex gap-2 align-items-start">
              <Button className="p-0" variant="link" size="sm" onClick={onDeleteFile(file)}>Delete</Button>
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
          <Button
            variant="info"
            size="sm"
            onClick={onAddVideosByTimeTask}
          >
            +AddVideoTask
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <QueryBar
          getFilesQuery={getFilesQuery}
          currentFilesCount={currentFilesCount}
          totalFilesCount={totalFilesCount}
          isRangeDate
          fileType="video"
        />
      </div>

      <Col md={12} className="mb-4">
        <Choose>
          <When condition={getFilesQuery.isError}>
            <Error message="Fetch files. Network error " type="error" />
          </When>

          <When condition={!currentFiles || getFilesQuery.isLoading}>
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

              <If condition={isPagunation}>
                <Pagination>{pages}</Pagination>
              </If>
            </div>

          </When>
        </Choose>
      </Col>

      <If condition={isShowViewer && selectedIndex >= 0}>
        <VideoViewer
          onClose={onCloseViewer}
          currentFiles={currentFiles}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onDeleteSelected={onDeleteSelected}
        />
      </If>

    </>
  );
}

export default VideosManager;
