import React from 'react';

function Error({ message }) {
  return (
    <div>
      <span>{message || 'Error...'}</span>
    </div>
  );
}

export default Error;
