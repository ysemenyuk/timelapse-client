import React from 'react';
import { Button } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import DatePicker from 'react-datepicker';
import styles from './QueryBar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function QueryBar(props) {
  const {
    getFilesQuery,
    getDateInfoQuery,
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

  const { data } = getFilesQuery;
  const totalFiles = data ? data.total : 0;
  // console.log(1111, currentFiles);

  const { data: dateInfo } = getDateInfoQuery;
  // console.log(2222, dateInfo);

  return (
    <div className="mb-4">

      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-start align-items-center">
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

          <div className={`${styles.filesCount} d-flex h-100 align-items-center`}>
            {`Files: ${totalFiles}`}
          </div>

        </div>

        <If condition={dateInfo && dateInfo.weather}>
          <div className="d-flex gap-2 justify-content-end align-items-center ms-auto">
            <div className={`${styles.filesCount} d-flex h-100 gap-2 align-items-center`}>
              <div>{`Sunrise: ${format(fromUnixTime(dateInfo.weather.sys.sunrise), 'HH:mm')}`}</div>
              <div>
                {`Sunset: ${format(fromUnixTime(dateInfo.weather.sys.sunset), 'HH:mm')}`}
              </div>
              <div>
                {`Temp: ${(dateInfo.weather.main.temp_min).toFixed(1)}°C 
                .. ${(dateInfo.weather.main.temp_max).toFixed(1)}°C`}
              </div>
            </div>
          </div>
        </If>

      </div>

    </div>
  );
}

export default QueryBar;
