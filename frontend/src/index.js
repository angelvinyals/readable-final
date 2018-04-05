import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import storeConfig from './store/storeConfig';
import './index.css';
import App2 from './App2';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={storeConfig}>
    <App2 />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
