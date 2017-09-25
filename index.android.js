



import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import App from './components/index.js';

export default class Cryptonet extends Component
{
  render() {
            return (
                   <App />
                   );
            }
}

AppRegistry.registerComponent('Cryptonet', () => Cryptonet);
