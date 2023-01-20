import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './components/App/App.jsx';
import SocketProvider from './context/SocketProvider.jsx';

const initApp = (store, socket, i18n) => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </Provider>
  </I18nextProvider>
);

export default initApp;
