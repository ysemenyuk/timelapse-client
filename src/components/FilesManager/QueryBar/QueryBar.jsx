import React, { useEffect, useState } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import styles from './QueryBar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function QueryBar(props) {
  const {
    getFilesQuery,
    currentFilesCount,
    totalFilesCount,
    isRangeDate,
    fileType,
  } = props;

  const { selectedCamera } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const initStartDate = () => {
    if (searchParams.get('date_gte')) {
      return new Date(searchParams.get('date_gte'));
    }
    if (selectedCamera.firstVideo && selectedCamera.firstVideo.date) {
      return new Date(selectedCamera.firstVideo.date);
    }
    return new Date();
  };

  const initEndDate = () => {
    if (searchParams.get('date_lte')) {
      return new Date(searchParams.get('date_lte'));
    }
    if (selectedCamera.lastVideo && selectedCamera.lastVideo.date) {
      return new Date(selectedCamera.lastVideo.date);
    }
    return new Date();
  };

  const initOneDate = () => {
    if (searchParams.get('date')) {
      return new Date(searchParams.get('date'));
    }
    if (selectedCamera.lastPhoto && selectedCamera.lastPhoto.date) {
      return new Date(selectedCamera.lastPhoto.date);
    }
    return new Date();
  };

  const [type] = useState(fileType);
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);
  const [oneDate, setOneDate] = useState(initOneDate);

  useEffect(() => {
    if (isRangeDate) {
      searchParams.set('date_gte', format(startDate, 'yyyy-MM-dd'));
      searchParams.set('date_lte', format(endDate, 'yyyy-MM-dd'));
    } else {
      searchParams.set('date', format(oneDate, 'yyyy-MM-dd'));
    }
    searchParams.set('type', type);

    setSearchParams(searchParams);
  }, [isRangeDate, startDate, endDate, oneDate]);

  return (
    <div className="d-flex flex-wrap gap-2 mb-2 justify-content-start align-items-center">
      <div className="d-flex gap-2 justify-content-start align-items-center">
        <Button
          type="primary"
          size="sm"
          onClick={getFilesQuery.refetch}
          disabled={getFilesQuery.isFetching}
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
              onChange={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              className={styles.dateInput}
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={setEndDate}
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
              onChange={setOneDate}
            />
          </Otherwise>
        </Choose>
        <div className={`${styles.filesCount} d-flex h-100 align-items-center`}>
          {`Files: ${currentFilesCount} (${totalFilesCount})`}
        </div>
      </div>
    </div>
  );
}

export default QueryBar;
