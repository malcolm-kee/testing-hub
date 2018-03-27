import React from 'react';
import { Provider } from 'react-redux';

import './style/style.css';

import { configureStore } from './config/configureStore';
import { registerSw } from './registerSw';
import { showCloseToUpdate } from './actions/ui';
import MainRoute from './MainRoute';

const store = configureStore();

registerSw()
  .then(result => {
    const { supportSw, waiting } = result;
    console.log('registerSw resolves', supportSw, waiting);
    if (supportSw && waiting) {
      store.dispatch(showCloseToUpdate());
    }
  })
  .catch(err => {
    console.log('registration of sw fail with error', err);
  });

const App = () => (
  <Provider store={store}>
    <MainRoute />
  </Provider>
);

export default App;
