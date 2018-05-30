/* @flow */
import {Record} from 'immutable'

const Form = Record({
  originalProfile: new (Record({
    username: null,
    email: null,
    objectId: null,
    emailVerified: null
  }))(),
  disabled: false,
  error: null,
  isValid: false,
  isLoading: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    emailVerified: false
  }))()
})

const InitialState = Record({
  form: new Form()
})

export default InitialState
