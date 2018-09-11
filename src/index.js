/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import 'config/ReactotronConfig';

import React, { Component } from 'react';

import createNavigator from 'routes';

export default class App extends Component {
  render() {
    const Routes = createNavigator();

    return <Routes />;
  }
}
