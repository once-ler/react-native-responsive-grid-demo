import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import cloneDeep from 'lodash.clonedeep'
import {Text, ScrollView, View, TouchableHighlight} from 'react-native'

import {CaPatientNameComponents} from './CaPatientTypes'
import * as profileActions from './CaPatientAction'
import styles from './CaPatientStyles'

const {list: List, form: {Form}} = t

const stylesheet = cloneDeep(Form.stylesheet);

// Horizontal
stylesheet.fieldset = {
  flexDirection: 'row'
}
stylesheet.formGroup.normal.flex = 1
stylesheet.formGroup.error.flex = 1
stylesheet.textbox.normal.flex = 3
stylesheet.textbox.error.flex = 3

const connectFunc = connect(
  state => ({
    caPatient: state.caPatient,
    nameComponents: state.caPatient.form.nameComponents    
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)

const enhanceWithDefaultProps = defaultProps({
  classOf: CaPatientNameComponents,
  options: { stylesheet },
  styles: styles
})

const enhanceWithProps = withProps(({options, caPatient}) => {
  const { stylesheet } = options
  return {    
    options: {
      stylesheet,
      auto: 'placeholders',
      fields: {
        firstName: {
          label: 'First Name',
          maxLength: 12,
          editable: !caPatient.form.isLoading
        },
        lastName: {
          label: 'Last Name',
          keyboardType: 'email-address',
          editable: !caPatient.form.isLoading
        }
      }
    }
  }
})

const enhanceWithHandlers = withHandlers(() => {
  let form = null
  
  return {
    onRef: () => (ref) => (form = ref),
    onChange: ({onProfileFormFieldChange}) => (nextValue) => {
      const value = form.getValue()
      value && onCaPatientFormFieldChange('nameComponents', value)
    },
    onPress: ({updateCaPatient, caPatient, global}) => e => {
      const { form: { original, fields } } = caPatient
      const nextState = { ...original, ...fields }
      // updateCaPatient should reset isValid to false.
      updateCaPatient(nextState)
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
  caPatient
}) => {
  const { form: {fields, isValid} } = caPatient

  console.log(options)

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

