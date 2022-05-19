import React from 'react';

function ButtonsGroup({ children }) {
  return <div className="d-flex gap-2 justify-content-start align-items-center">{children}</div>;
}

export default ButtonsGroup;
