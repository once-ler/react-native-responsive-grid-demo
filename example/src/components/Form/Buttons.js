/* @flow */
import {Platform} from 'react-native'

const baseDoneButton = {
  id: 'done',
  buttonColor: 'blue',
  buttonFontSize: 14,
  buttonFontWeight: '600'
}

export const doneButton = Platform.OS === 'ios' ? {...baseDoneButton, systemItem: 'done'} : {...baseDoneButton, title: 'Done'}

export const doneButtonDisabled = {...doneButton, disabled: true}

const baseSaveButton = {
  id: 'save',
  buttonColor: 'blue',
  buttonFontSize: 14,
  buttonFontWeight: '600'
}

export const saveButton = Platform.OS === 'ios' ? {...baseSaveButton, systemItem: 'save'} : {...baseSaveButton, title: 'Save'}

export const saveButtonDisabled = {...saveButton, disabled: true}
