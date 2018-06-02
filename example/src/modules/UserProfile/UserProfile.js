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
      const value = form.getValue()
      value && onProfileFormFieldChange(value)
    },
    onPress: ({updateProfile, userProfile, global}) => e => {
      const { form: { originalProfile, fields } } = userProfile
      const nextState = { ...originalProfile, ...fields }
      // updateProfile should reset isValid to false.
      updateProfile(nextState)
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
  const { form: {fields, isValid} } = userProfile

  console.log(userProfile)

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
    <View style={styles.container}>
      <Form
        ref={onRef}
        type={classOf}
        options={options}
        value={fields}
        onChange={onChange}
      />
      {isValid &&
      <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      }
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
