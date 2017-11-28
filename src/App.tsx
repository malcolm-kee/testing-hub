import * as React from 'react';
import { Provider } from 'react-redux';
import store from './config/store';
// import MainRoute from './MainRoute';

class App extends React.Component {
  public render() {
    return <Provider><div>Hello world from TS!</div></Provider>;
  }
}

export default App;
