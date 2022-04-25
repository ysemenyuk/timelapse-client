import React from 'react';

const Error = (props) => {
  return (
    <div>
      <span>{props.message || 'Error...'}</span>
    </div>
  );
};

export default Error;
