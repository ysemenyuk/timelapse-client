import React from 'react';
import { Col, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
// import cn from 'classnames';
import _ from 'lodash';
// import format from 'date-fns/format';
// import { useOutletContext, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styles from './FileManagerHead.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function FileManagerHead(props) {
  const {
    fetchStatus,
    currentFiles,
    selectedIndexes,
    setSelectedIndexes,
    onRefetchClick,
    onDeleteSelected,
    onSelectButtonClick,

    isSelectFiles,
    isPhotos,
    isVideos,
    isRangeDate,
    startDate,
    endDate,

    onChangeDateFormat,
    onChangeStartDate,
    onChangeEndDate,
  } = props;

  const onDeleteBtnClick = () => {
    if (_.isEmpty(selectedIndexes)) {
      return;
    }
    const selectedItems = selectedIndexes.map((index) => currentFiles[index]);
    onDeleteSelected(selectedItems);
    setSelectedIndexes([]);
  };

  return (
    <div className="mb-4">
      <Col md={12} className="mb-3 d-flex justify-content-between align-items-start gap-2">
        <div className="d-flex gap-2">
          <ButtonGroup>
            <ToggleButton
              size="sm"
              id="button-1"
              type="checkbox"
              variant="outline-primary"
              checked
            >
              All
            </ToggleButton>
            <ToggleButton
              size="sm"
              id="button-2"
              type="checkbox"
              variant="outline-primary"
              checked={false}
            >
              byHand
            </ToggleButton>
            <ToggleButton
              size="sm"
              id="button-3"
              type="checkbox"
              variant="outline-primary"
              checked={false}
            >
              byTime
            </ToggleButton>
          </ButtonGroup>

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
        </div>

        <div className="d-flex gap-2">
          <div className="d-flex w-100 align-items-center">
            {(isSelectFiles) && `Selected:${selectedIndexes.length}`}
          </div>

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
          <Choose>
            <When condition={isPhotos}>
              <Button
                type="primary"
                size="sm"
              >
                +CreatePhoto
              </Button>
            </When>
            <When condition={isVideos}>
              <Button
                type="primary"
                size="sm"
              >
                +CreateVideo
              </Button>
            </When>
          </Choose>

        </div>
      </Col>

      <Col md={12} className="mb-3 d-flex justify-content-between align-items-start">
        <div className="d-flex gap-2">
          {/* <If condition={isPhotos}> */}
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
          {/* </If> */}

          <If condition={isRangeDate}>
            <DatePicker
              className={styles.dateInput}
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={onChangeStartDate}
            />
          </If>

          <DatePicker
            className={styles.dateInput}
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={onChangeEndDate}
          />

          <div className="d-flex w-100 align-items-center">
            {`Files:${currentFiles ? currentFiles.length : 0}`}
          </div>
        </div>

        <div>
          <Button
            type="primary"
            size="sm"
            onClick={onRefetchClick}
            disabled={fetchStatus.isLoading}
          >
            Refetch
          </Button>
        </div>
      </Col>
    </div>
  );
}

export default FileManagerHead;
