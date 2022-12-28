import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';

// import styles from './SelectDate.module.css';
import 'react-datepicker/dist/react-datepicker.css';

function SelectDate() {
  // const [dateD, setDateD] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (startDate) {
      searchParams.set('startDate', startDate);
    }
    if (endDate) {
      searchParams.set('endDate', endDate);
    }
    setSearchParams(searchParams);
  }, [startDate, endDate]);

  return (
    <div className="d-flex gap-2">
      {/* <DatePicker
        inline
        selected={startDate}
        onChange={(date) => setDateD(date)}
        dayClassName={(date) => {
          console.log(date);
          // date.getDate() < Math.random() * 31 ? 'random' : undefined;
        }}
      /> */}
      <Form.Group>
        <Form.Control
          size="sm"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          name="startDate"
          id="startDate"
          type="date"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          size="sm"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          name="endDate"
          id="endDate"
          type="date"
        />
      </Form.Group>
    </div>
  );
}

export default SelectDate;
