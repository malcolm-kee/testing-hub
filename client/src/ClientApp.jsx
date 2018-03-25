import React from 'react';
import { render } from 'react-dom';
import { registerSw } from './registerSw';
import App from './App';
import { OfflineMessage } from './OfflineMessage';

const renderApp = () => {
  if (window.navigator.onLine === false) {
    render(<OfflineMessage />, document.getElementById('app'));
  } else {
    render(<App />, document.getElementById('app'));
  }
};
renderApp();
registerSw();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
