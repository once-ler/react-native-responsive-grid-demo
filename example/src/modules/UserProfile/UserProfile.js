/* @flow */
import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import withState from 'recompose/withState'
import defaultProps from 'recompose/defaultProps'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import {Text, View, TouchableHighlight} from 'react-native'

import {Person} from './UserProfileTypes'
import * as profileActions from './UserProfileAction'
import styles from './UserProfileStyles'

const {form: {Form}} = t

const connectFunc = connect(
  state => ({
    userProfile: state.userProfile    
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)

const enhanceWithState = withState('formValues', 'setFormValues', {
  username: '',
  email: ''
})

const enhanceWithDefaultProps = defaultProps({
  classOf: Person,
  options: {},
  styles: styles
})

const enhanceWithProps = withProps(props => ({
  options: {
    auto: 'placeholders',
    fields: {
      username: {
        label: 'Profile.username',
        maxLength: 12,
        editable: !props.userProfile.form.isLoading,
        hasError: props.userProfile.form.fields.usernameHasError,
        error: props.userProfile.form.fields.usernameErrorMsg
      },
      email: {
        label: 'Profile.email',
        keyboardType: 'email-address',
        editable: !props.userProfile.form.isLoading,
        hasError: props.userProfile.form.fields.emailHasError,
        error: props.userProfile.form.fields.emailErrorMsg
      }
    }
  }
}))

const enhanceWithHandlers = withHandlers({
  onChange: ({onProfileFormFieldChange}) => ({value}) => {
    if (value.username !== '') {
      onProfileFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      onProfileFormFieldChange('email', value.email)
    }
    // Should we update state for this?
    // setValue({value})
  },
  onPress: ({updateProfile, userProfile, global}) => e => {
    updateProfile(
      userProfile.form.originalProfile.objectId,
      userProfile.form.fields.username,
      userProfile.form.fields.email
    )
  }
})

const Presentation = ({
  classOf,
  onPress,
  options,
  styles,
  userProfile
}) => {
  const { form: {fields} } = userProfile

  return (
    <View style={styles.container}>
      <Form
        type={classOf}
        options={options}
        value={fields}
      />
      <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  )
}

export default compose(
  connectFunc,
  enhanceWithDefaultProps,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation)
