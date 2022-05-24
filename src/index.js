import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/favicon.ico';
import './index.css';
import initApp from './components/App/init.jsx';
import createStore from './redux/store.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'app:*';
}

const store = createStore();

ReactDOM.render(initApp(store), document.getElementById('root'));

// serviceWorker();
