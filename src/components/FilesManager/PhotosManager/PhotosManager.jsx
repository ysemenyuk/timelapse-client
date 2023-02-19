import React from 'react';
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import { Image, Trash, Download } from 'react-bootstrap-icons';
import styles from './PhotosManager.module.css';
import ImgWrapper from '../../UI/ImgWrapper/ImgWrapper.jsx';
import Error from '../../UI/Error';
import useFileManager from '../useFileManager';
import PhotoViewer from './PhotoViewer';
import QueryBar from '../QueryBar/QueryBar';

function CameraPhotosManager() {
  const {
    onCreatePhotoFile,
    currentData,
    getFilesQuery,
    getDateInfoQuery,
    selectedIndex,
    isShowViewer,
    setSelectedIndex,
    onCloseViewer,
    onSetAvatar,
    onDeleteSelected,
    onFileClick,
    setPage,
  } = useFileManager({ limit: 30 });

  const onDeleteFile = (file) => () => {
    onDeleteSelected(file);
  };

  const onLoadMoreClick = () => {
    setPage((current) => current + 1);
  };

  const currentFiles = Object.entries(currentData.items).reduce((acc, [, items]) => [...acc, ...items], []);
  // console.log('currentFiles', currentFiles);

  const currentFilesCount = currentFiles ? currentFiles.length : 0;
  const totalFilesCount = currentData.totalFiles ? currentData.totalFiles : 0;

  const isLoadMoreButton = currentFilesCount !== totalFilesCount;

  const { data: dateInfo } = getDateInfoQuery;
  // console.log('dateInfo', dateInfo);

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    // const date = format(new Date(file.date), 'dd.MM.yyyy');
    const time = format(new Date(file.date), 'HH:mm:ss');
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
              src={`${file.link}?size=thumbnail`}
            />
            <div className={styles.overlay}>
              <Image className={styles.icon} />
            </div>
          </div>
          <div className={styles.itemBody}>
            <div>{time}</div>
            {/* <div>{date}</div> */}
            <div className="d-flex gap-2 align-items-center">
              <Button className="p-0" variant="link" size="sm" as="a" href={file.link} download><Download /></Button>
              <Button className="p-0" variant="link" size="sm" onClick={onDeleteFile(file)}><Trash /></Button>
            </div>
          </div>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2 mb-2 justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <Button
              variant="info"
              size="sm"
              onClick={onCreatePhotoFile}
            >
              +CreatePhoto
            </Button>
          </div>
        </div>

        <QueryBar
          getFilesQuery={getFilesQuery}
          currentFilesCount={currentFilesCount}
          totalFilesCount={totalFilesCount}
          isRangeDate={false}
          fileType="photo"
        />

        <If condition={dateInfo && dateInfo.weather}>
          <div className="d-flex mb-2 gap-2 justify-content-start align-items-center">
            <div className={`${styles.filesCount} d-flex h-100 gap-2 align-items-center`}>
              <div>{`Date: ${format(new Date(dateInfo.date), 'dd.MM.yyyy')}`}</div>
              <div>
                {`Sun: ${format(fromUnixTime(dateInfo.weather.sys.sunrise), 'HH:mm')}`}
                {` .. ${format(fromUnixTime(dateInfo.weather.sys.sunset), 'HH:mm')}`}
              </div>
              <div>
                {`Temp: ${(dateInfo.weather.main.temp_min).toFixed(1)}°C`}
                {` .. ${(dateInfo.weather.main.temp_max).toFixed(1)}°C`}
              </div>
            </div>
          </div>
        </If>
      </div>

      <div className="mb-4">
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

              <Row xs={1} sm={2} md={3} lg={5} xl={6} className="mb-3">
                {renderCurrentFiles()}
              </Row>

              <If condition={isLoadMoreButton}>
                <Button
                  variant="info"
                  size="sm"
                  onClick={onLoadMoreClick}
                >
                  {'LoadMore '}
                  {getFilesQuery.isFetching && <Spinner as="span" animation="border" size="sm" />}
                </Button>
              </If>

            </div>
          </When>
        </Choose>
      </div>

      <If condition={isShowViewer && selectedIndex >= 0}>
        <PhotoViewer
          onClose={onCloseViewer}
          currentFiles={currentFiles}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onDeleteSelected={onDeleteSelected}
          onSetAvatar={onSetAvatar}
        />
      </If>

    </>
  );
}

export default CameraPhotosManager;
