import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import SocketProvider from '../../context/SocketProvider.jsx';

const initApp = (store, socket) => (
  <Provider store={store}>
    <SocketProvider socket={socket}>
      <App />
    </SocketProvider>
  </Provider>
);

export default initApp;
