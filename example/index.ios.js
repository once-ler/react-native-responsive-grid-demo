import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

console.disableYellowBox = true

import { AppRegistry } from 'react-native'
import App from './src/modules/App/App'
// import App from './src/components/AutoTags/AutoTagsTest'

console.log('ios')
const app = new App()
