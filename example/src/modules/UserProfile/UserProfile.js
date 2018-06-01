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
import {Text, ScrollView, View, TouchableHighlight} from 'react-native'

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

const enhanceWithState = withState('formValues', 'setFormValues', {})

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
        editable: !props.userProfile.form.isLoading
      },
      email: {
        label: 'Profile.email',
        keyboardType: 'email-address',
        editable: !props.userProfile.form.isLoading
      }
    }
  }
}))

// https://stackoverflow.com/questions/45678526/how-do-you-add-refs-to-functional-components-using-withhandlers-in-recompose-and/45748180#45748180
const enhanceWithHandlers = withHandlers(() => {
  let form = null
  
  return {
    onRef: () => (ref) => (form = ref),
    onChange: ({onProfileFormFieldChange}) => (nextValue) => {
      console.log(nextValue)
      const value = form.getValue()
      value && typeof value !== 'undefined' && onProfileFormFieldChange(value)
    },
    onPress: ({updateProfile, userProfile, global}) => e => {
      const value = form.getValue()
      value && typeof value !== 'undefined' && onProfileFormFieldChange(value)
      return 1;

      updateProfile(
        userProfile.form.originalProfile.objectId,
        userProfile.form.fields.username,
        userProfile.form.fields.email
      )
    }
  }
})

const Presentation = ({
  classOf,
  onRef,
  onChange,
  onPress,
  options,
  styles,
  userProfile
}) => {
  const { form: {fields} } = userProfile

  console.log(fields)

  return (
    <ScrollView>
    <View style={styles.container}>
      <Form
        ref={onRef}
        type={classOf}
        options={options}
        value={fields}
        onChange={onChange}
      />
      <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
    </ScrollView>
  )
}

export default compose(
  connectFunc,
  enhanceWithDefaultProps,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation)
