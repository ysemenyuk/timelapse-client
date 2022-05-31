import React from 'react';
import { Badge } from 'react-bootstrap';
import { taskStatus } from '../../utils/constants';

function BadgeWrapper({ status }) {
  const mapping = {
    [taskStatus.CREATED]: 'secondary',
    [taskStatus.RUNNING]: 'info',
    [taskStatus.STOPPED]: 'secondary',
    [taskStatus.SUCCESSED]: 'success',
    [taskStatus.FAILED]: 'danger',
    [taskStatus.CANCELED]: 'warning',
  };

  return <Badge bg={mapping[status]}>{status}</Badge>;
}

export default BadgeWrapper;
