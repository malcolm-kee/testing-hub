import React from 'react';
import { Simulate, render } from 'react-testing-library';

import { App } from './App';

jest.mock('./service/authenticationService');
test('render App', () => {
  const { getByText } = render(<App />);
  const logo = getByText('Testing Hub');
  Simulate.click(logo);
});
