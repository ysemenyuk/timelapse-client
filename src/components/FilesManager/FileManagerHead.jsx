import React from 'react';
import { Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
// import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import styles from './FileManagerHead.module.css';
import 'react-datepicker/dist/react-datepicker.css';
// import { useGetOneQuery } from '../../api/dateInfoApi.js';

function FileManagerHead(props) {
  const {
    fetchStatus,
    currentFiles,
    onRefetchClick,
    isRangeDate,
    startDate,
    endDate,
    onChangeDateFormat,
    // onChangeFileType,
    onChangeStartDate,
    onChangeEndDate,
  } = props;

  // eslint-disable-next-line max-len
  // const { data, isLoading, isSuccess, isError, refetch } = useGetOneQuery({ cameraId: selectedCamera._id, date: '2023-01-21' });
  // const fetchStatus = { isLoading, isSuccess, isError };

  return (
    <div className="mb-4">

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

        </div>
      </div>

    </div>
  );
}

export default FileManagerHead;
