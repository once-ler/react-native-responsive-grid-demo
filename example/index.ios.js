import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

import { AppRegistry } from 'react-native'
import App from './src/modules/App/App'
console.log('ios')
const app = new App()
