import React from 'react';
import { Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
// import cn from 'classnames';
import _ from 'lodash';
// import format from 'date-fns/format';
// import { useOutletContext, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styles from './FileManagerHead.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function FileManagerHead(props) {
  const {
    isPhotos,
    createButtonHandler,
    createButtonText,

    fetchStatus,
    currentFiles,
    selectedIndexes,
    setSelectedIndexes,
    onRefetchClick,
    onDeleteSelected,
    onSelectButtonClick,

    isSelectFiles,
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

      <div className="d-flex flex-wrap gap-2 mb-2 justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <Button
            variant="info"
            size="sm"
            onClick={createButtonHandler}
          >
            {createButtonText}
          </Button>
        </div>
        <If condition={isPhotos}>
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
        </If>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-start align-items-start">
        <div className="d-flex gap-2 justify-content-start align-items-start">
          <Button
            type="primary"
            size="sm"
            onClick={onRefetchClick}
            disabled={fetchStatus.isLoading}
          >
            Refetch
          </Button>
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
          <If condition={false}>
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
        </div>

        <div className="d-flex gap-2 justify-content-start align-items-center">
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

          <div className="d-flex h-100 align-items-center">
            {`Files:${currentFiles ? currentFiles.length : 0}`}
          </div>

          {/* <Button
            type="primary"
            size="sm"
            onClick={onRefetchClick}
            disabled={fetchStatus.isLoading}
          >
            Refetch
          </Button> */}

        </div>
      </div>

    </div>
  );
}

export default FileManagerHead;
