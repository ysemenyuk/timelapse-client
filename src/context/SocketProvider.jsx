import React from 'react';
import SocketContext from './SocketContext.js';

function SocketProvider({ children, socket }) {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
