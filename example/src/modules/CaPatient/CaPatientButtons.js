/* @flow */
import {Platform} from 'react-native'

const baseDoneButton = {
  id: 'done',
  buttonColor: 'blue',
  buttonFontSize: 14,
  buttonFontWeight: '600'
}

export const doneButton = Platform.OS === 'ios' ? {...baseDoneButton, systemItem: 'done'} : {...baseDoneButton, title: 'Done'}
