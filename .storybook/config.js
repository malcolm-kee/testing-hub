import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.jsx?$/);
const req2 = require.context('../client/src/components/stories', true, /.stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
  req2.keys().forEach(fileName => req2(fileName));
}

configure(loadStories, module);
