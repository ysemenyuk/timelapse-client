import React, { useEffect, useState } from 'react';
import { Col, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
// import cn from 'classnames';
import _ from 'lodash';
import format from 'date-fns/format';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styles from './PhotosManager.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function FileManagerHead(props) {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    onRefetchClick,
    onDeleteSelected,
    isSelectFiles,
    onSelectButtonClick,
    // isRangeDate,
    // onChangeDateFormat,
    // startDate,
    // onChangeStartDate,
    // endDate,
    // onChangeEndDate,
  } = props;

  const { selectedCamera, tabName } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const isPhotos = tabName === 'photos';
  const isVideos = tabName === 'videos';

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
  };

  const [fileType, setFileType] = useState(() => {
    if (searchParams.get('fileType')) {
      return searchParams.get('fileType');
    }
    if (isVideos) {
      return 'video,videoByTime';
    }
    return 'photo,photoByTime';
  });

  const [startDate, setStartDate] = useState(() => {
    if (searchParams.get('startDate')) {
      return new Date(searchParams.get('startDate'));
    }
    if (isVideos && selectedCamera.firstVideo) {
      return new Date(selectedCamera.firstVideo.date);
    }
    if (isPhotos && selectedCamera.lastPhoto) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  });

  const [endDate, setEndDate] = useState(() => {
    if (searchParams.get('endDate')) {
      return new Date(searchParams.get('endDate'));
    }
    if (searchParams.get('oneDate')) {
      return new Date(searchParams.get('oneDate'));
    }
    if (isVideos && selectedCamera.lastVideo) {
      return new Date(selectedCamera.lastVideo.date);
    }
    if (isPhotos && selectedCamera.lastPhoto) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  });

  const [isRangeDate, setIsRangeDate] = useState(() => {
    if (isVideos) {
      return true;
    }
    return false;
  });

  console.log(22222, startDate, endDate);

  const onChangeFileType = (ft) => {
    setFileType(ft);
  };

  const onChangeDateFormat = () => {
    setIsRangeDate(!isRangeDate);
  };

  const onChangeStartDate = (d) => {
    setStartDate(d);
  };

  const onChangeEndDate = (d) => {
    setEndDate(d);
  };

  useEffect(() => {
    searchParams.set('fileType', fileType);
    if (!isRangeDate) {
      searchParams.set('oneDate', format(endDate, 'yyyy-MM-dd'));
      searchParams.delete('startDate');
      searchParams.delete('endDate');
    } else {
      searchParams.set('startDate', format(startDate, 'yyyy-MM-dd'));
      searchParams.set('endDate', format(endDate, 'yyyy-MM-dd'));
      searchParams.delete('oneDate');
    }
    setSearchParams(searchParams);
  }, [fileType, startDate, endDate, isRangeDate]);

  return (
    <>
      <Col md={12} className="mb-4 d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          <If condition={isPhotos}>
            <ButtonGroup>
              <ToggleButton
                size="sm"
                id="onedate-button"
                type="checkbox"
                variant="outline-primary"
                checked={!isRangeDate}
                onChange={onChangeDateFormat}
              >
                OneDay
              </ToggleButton>
              <ToggleButton
                size="sm"
                id="range-button"
                type="checkbox"
                variant="outline-primary"
                checked={isRangeDate}
                onChange={onChangeDateFormat}
              >
                Range
              </ToggleButton>
            </ButtonGroup>
          </If>

          <ButtonGroup>
            <ToggleButton
              size="sm"
              id="button-1"
              type="checkbox"
              variant="outline-primary"
              checked
              onChange={onChangeFileType}
            >
              All
            </ToggleButton>
            <ToggleButton
              size="sm"
              id="button-2"
              type="checkbox"
              variant="outline-primary"
              checked={false}
              onChange={onChangeFileType}
            >
              byHand
            </ToggleButton>
            <ToggleButton
              size="sm"
              id="button-3"
              type="checkbox"
              variant="outline-primary"
              checked={false}
              onChange={onChangeFileType}
            >
              byTime
            </ToggleButton>
          </ButtonGroup>

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
            </div>
          </div>
        </div>

        <div className={styles.deleteBtns}>
          {(isSelectFiles) && `Selected: ${selectedIndexes.length}`}

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
            Delete
          </Button>
        </div>
      </Col>

      <Col md={12} className="mb-4 d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          <If condition={isRangeDate}>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={onChangeStartDate}
            />
          </If>

          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={onChangeEndDate}
          />

          <div className="d-flex w-100 align-items-center">
            {`Files: ${currentFiles ? currentFiles.length : 0}`}
          </div>
        </div>
      </Col>
    </>
  );
}

export default FileManagerHead;
