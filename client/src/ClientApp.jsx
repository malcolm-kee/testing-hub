import React from 'react';
import { render } from 'react-dom';
import { registerSw } from './registerSw';
import App from './App';

const renderApp = () => {
  render(<App />, document.getElementById('app'));
};
renderApp();
registerSw();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
