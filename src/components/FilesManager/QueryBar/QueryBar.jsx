import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import cn from 'classnames';
// import _ from 'lodash';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import styles from './QueryBar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { cameraSelectors } from '../../../redux/camera/cameraSlice';
import { useGetFilesCountsByDatesQuery } from '../../../api/fileManager.api';

function QueryBar(props) {
  const {
    getFilesQuery,
    currentFilesCount,
    totalFilesCount,
    isRangeDate,
    fileType,
  } = props;

  // console.log(2222, 'QueryBar');

  const selectedCameraId = useSelector(cameraSelectors.selectedCameraId);
  const selectedCameraStats = useSelector(cameraSelectors.cameraStatsByCameraId(selectedCameraId));

  const getFilesCountsByDatesQuery = useGetFilesCountsByDatesQuery({ cameraId: selectedCameraId });
  const { data } = getFilesCountsByDatesQuery;

  const datesWiithFiles = useMemo(() => {
    if (data && data.countsByDates) {
      return data.countsByDates.map((i) => new Date(i._id));
    }
    return [];
  }, [data]);

  const [searchParams, setSearchParams] = useSearchParams();

  const initStartDate = () => {
    if (searchParams.get('date_gte')) {
      return new Date(searchParams.get('date_gte'));
    }
    if (selectedCameraStats.firstVideo && selectedCameraStats.firstVideo.date) {
      return new Date(selectedCameraStats.firstVideo.date);
    }
    return new Date();
  };

  const initEndDate = () => {
    if (searchParams.get('date_lte')) {
      return new Date(searchParams.get('date_lte'));
    }
    if (selectedCameraStats.lastVideo && selectedCameraStats.lastVideo.date) {
      return new Date(selectedCameraStats.lastVideo.date);
    }
    return new Date();
  };

  const initOneDate = () => {
    if (searchParams.get('date')) {
      return new Date(searchParams.get('date'));
    }
    if (selectedCameraStats.lastPhoto && selectedCameraStats.lastPhoto.date) {
      return new Date(selectedCameraStats.lastPhoto.date);
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
          disabled={getFilesQuery.isLoading}
        >
          Refetch
        </Button>

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
                includeDates={datesWiithFiles}
              />
            </Otherwise>
          </Choose>
          <div className={`${styles.filesCount} d-flex h-100 align-items-center`}>
            {`Files: ${currentFilesCount} (${totalFilesCount})`}
          </div>
        </div>

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
    </div>
  );
}

export default QueryBar;
