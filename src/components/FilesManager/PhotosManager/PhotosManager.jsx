import React from 'react';
import { Button, Card, Col, Row, Spinner, ToggleButton } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import format from 'date-fns/format';
import { Image } from 'react-bootstrap-icons';
import styles from './PhotosManager.module.css';
import ImgWrapper from '../../UI/ImgWrapper/ImgWrapper.jsx';
import Error from '../../UI/Error';
import useFileManager from '../useFileManager';
import PhotoViewer from './PhotoViewer';
import QueryBar from '../QueryBar/QueryBar';

function CameraPhotosManager() {
  const {
    onCreatePhotoFile,
    getFilesQuery,
    getDateInfoQuery,
    isShowViewer,
    onCloseViewer,
    selectedIndexes,
    setSelectedIndexes,
    onDeleteSelected,
    onFileClick,
    onSetAvatar,
    isSelectFiles,
    onSelectButtonClick,
    startDate,
    endDate,
    oneDate,
    onChangeStartDate,
    onChangeEndDate,
    onChangeOneDate,
  } = useFileManager();

  const currentFiles = getFilesQuery.data || [];
  // console.log(1111, currentFiles);

  const onDeleteBtnClick = () => {
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
    setSelectedIndexes([]);
  };

  const renderCurrentFiles = () => currentFiles.map((file, index) => {
    const classNames = cn(styles.item, { [styles.selectedItem]: selectedIndexes.includes(index) });
    const date = format(new Date(file.date), 'dd.MM.yyyy');
    const time = format(new Date(file.date), 'HH:mm:ss');

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
              src={`${file.link}?size=thumbnail`}
            />
            <div className={styles.overlay}>
              <Image className={styles.icon} />
            </div>
          </div>
          <div className={styles.itemBody}>
            <div>{time}</div>
            <div>{date}</div>
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
            onClick={onCreatePhotoFile}
          >
            +CreatePhoto
          </Button>
        </div>

        <div className="d-flex gap-2">
          {/* <ButtonGroup>
            <ToggleButton
              size="sm"
              id="Small-button"
              type="checkbox"
              variant="outline-primary"
              checked
            >
              Small
            </ToggleButton>
            <ToggleButton
              size="sm"
              id="Medium-button"
              type="checkbox"
              variant="outline-primary"
            >
              Medium
            </ToggleButton>
          </ButtonGroup> */}

          <If condition={isSelectFiles}>
            <Button
              type="primary"
              size="sm"
              onClick={onDeleteBtnClick}
              disabled={getFilesQuery.isLoading || _.isEmpty(selectedIndexes)}
            >
              {`Delete ${isSelectFiles ? `(${selectedIndexes.length})` : ''}`}
            </Button>

            <Button
              type="primary"
              size="sm"
            >
              SelectAll
            </Button>
          </If>

          <ToggleButton
            size="sm"
            id="select-button"
            type="checkbox"
            variant="outline-primary"
            checked={isSelectFiles}
            onChange={onSelectButtonClick}
          >
            {isSelectFiles ? 'Cancel' : 'SelectFiles'}
          </ToggleButton>

        </div>
      </div>

      <QueryBar
        getFilesQuery={getFilesQuery}
        getDateInfoQuery={getDateInfoQuery}
        isRangeDate={false}
        startDate={startDate}
        endDate={endDate}
        oneDate={oneDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onChangeOneDate={onChangeOneDate}
      />

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
              <Row xs={2} sm={2} md={4} lg={6} className="mb-3">
                {renderCurrentFiles()}
              </Row>
            </div>
          </When>
        </Choose>
      </Col>

      <If condition={isShowViewer}>
        <PhotoViewer
          onClose={onCloseViewer}
          currentFiles={currentFiles}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
          onDeleteSelected={onDeleteSelected}
          onSetAvatar={onSetAvatar}
        />
      </If>

    </>
  );
}

export default CameraPhotosManager;
