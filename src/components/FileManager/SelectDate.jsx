import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// import styles from './SelectDate.module.css';

function SelectDate() {
  const [startDate, setStartDate] = useState('2022-06-01');
  const [endDate, setEndDate] = useState('2022-06-30');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);
    setSearchParams(searchParams);
  }, [startDate, endDate]);

  return (
    <div className="d-flex gap-2">
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
