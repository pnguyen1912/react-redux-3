import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom'
const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
