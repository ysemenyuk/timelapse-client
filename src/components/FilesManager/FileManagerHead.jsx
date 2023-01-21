import React from 'react';
import { Button } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
// import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import styles from './FileManagerHead.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function FileManagerHead(props) {
  const {
    fetchStatus,
    currentFiles,
    onRefetch,
    isRangeDate,
    startDate,
    endDate,
    oneDate,
    // onChangeDateFormat,
    // onChangeFileType,
    onChangeStartDate,
    onChangeEndDate,
    onChangeOneDate,
  } = props;

  return (
    <div className="mb-4">

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-start align-items-start">
        <div className="d-flex gap-2 justify-content-start align-items-start">

          <Button
            type="primary"
            size="sm"
            onClick={onRefetch}
            disabled={fetchStatus.isLoading}
          >
            Refetch
          </Button>

          {/* <ButtonGroup>
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
          </ButtonGroup> */}

          {/* <If condition={false}>
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
          </If> */}
        </div>

        <div className="d-flex gap-2 justify-content-start align-items-center">
          <Choose>
            <When condition={isRangeDate}>
              <DatePicker
                className={styles.dateInput}
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={onChangeStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <DatePicker
                className={styles.dateInput}
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={onChangeEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </When>
            <Otherwise>
              <DatePicker
                className={styles.dateInput}
                dateFormat="dd/MM/yyyy"
                selected={oneDate}
                onChange={onChangeOneDate}
              />
            </Otherwise>
          </Choose>

          <div className="d-flex h-100 align-items-center">
            {`Files:${currentFiles ? currentFiles.length : 0}`}
          </div>

        </div>
      </div>

    </div>
  );
}

export default FileManagerHead;
