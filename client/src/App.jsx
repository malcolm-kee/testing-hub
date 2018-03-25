import React from 'react';
import { Provider } from 'react-redux';

import './style/style.css';

import { configureStore } from './config/configureStore';
import MainRoute from './MainRoute';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <MainRoute />
  </Provider>
);

export default App;
