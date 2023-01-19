import React from 'react';
import { Button, ButtonGroup, Card, Col, Row, Spinner, ToggleButton } from 'react-bootstrap';
import cn from 'classnames';
import _ from 'lodash';
import format from 'date-fns/format';
import { Image } from 'react-bootstrap-icons';
import styles from './PhotosManager.module.css';
import ImgWrapper from '../UI/ImgWrapper/ImgWrapper.jsx';
import Error from '../UI/Error';
import useFileManager from './useFileManager';
import PhotoViewer from './PhotoViewer';
import FileManagerHead from './FileManagerHead';

function CameraPhotosManager() {
  const {
    onCreatePhotoFile,
    fetchStatus,
    currentFiles,
    selectedIndexes,
    isShowImageViewer,
    onCloseImageViewer,
    onRefetchClick,
    setSelectedIndexes,
    onSetAvatarClick,
    onDeleteSelected,
    onFileClick,
    onSelectButtonClick,
    isSelectFiles,
    isRangeDate,
    startDate,
    endDate,
    onChangeFileType,
    onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
  } = useFileManager();

  // console.log(1111, currentFiles);

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
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
            <If condition={isRangeDate}>
              <div>{date}</div>
            </If>
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
          <ButtonGroup>
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
          </ButtonGroup>
          <ToggleButton
            size="sm"
            id="select-button"
            type="checkbox"
            variant="outline-primary"
            checked={isSelectFiles}
            onChange={onSelectButtonClick}
          >
            SelectFiles
          </ToggleButton>

          <Button
            type="primary"
            size="sm"
            onClick={onDeleteBtnClick}
            disabled={fetchStatus.isLoading || _.isEmpty(selectedIndexes)}
          >
            {`Delete ${isSelectFiles ? `(${selectedIndexes.length})` : ''}`}
          </Button>

          <If condition={false}>
            <div className="d-flex align-items-center">
              {(isSelectFiles) && `Selected:${selectedIndexes.length}`}
            </div>
          </If>

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
              <Row xs={2} sm={2} md={4} lg={6} className="mb-3">
                {renderCurrentFiles()}
              </Row>
            </div>
          </When>
        </Choose>
      </Col>

      <If condition={isShowImageViewer}>
        <PhotoViewer
          onClose={onCloseImageViewer}
          currentFiles={currentFiles}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
          onDeleteSelected={onDeleteSelected}
          onSetAvatarClick={onSetAvatarClick}
        />
      </If>

    </>
  );
}

export default CameraPhotosManager;
