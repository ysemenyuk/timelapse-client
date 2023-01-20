import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/favicon.ico';
import './index.css';
import initApp from './initApp.jsx';
import initSocket from './socket.js';
import i18n from './i18n.js';
import createStore from './redux/store.js';
import setupYupLocale from '../setupYupLocale';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'app:*';
}

setupYupLocale(i18n);

const store = createStore();
const socket = initSocket(store);

ReactDOM.render(initApp(store, socket, i18n), document.getElementById('root'));

// serviceWorker();
