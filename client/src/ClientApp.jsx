import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { OfflineMessage } from './OfflineMessage';

const renderApp = () => {
  if (window.navigator.onLine === false) {
    render(<OfflineMessage />, document.getElementById('app'));
  } else {
    render(<App />, document.getElementById('app'));
  }
};
renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
