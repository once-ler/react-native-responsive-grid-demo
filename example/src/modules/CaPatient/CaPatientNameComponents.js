import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import cloneDeep from 'lodash.clonedeep'
import { Row, Column as Col, Grid, ScreenInfo, setBreakPoints} from 'react-native-responsive-grid'
import {Text, ScrollView, View, TouchableHighlight} from 'react-native'

import {CaPatientNameComponents} from './CaPatientTypes'
import * as profileActions from './CaPatientAction'
import styles from './CaPatientStyles'

const {list: List, form: {Form}} = t

const stylesheet = cloneDeep(Form.stylesheet)
stylesheet.button.alignSelf = 'flex-end'
stylesheet.button.flex = 0

// Horizontal
const flexLayout = (locals) => {
  return <Grid>{() => {
    return (
    <Row>
      <Col size={90} offset={6} >
        <Row>
          <Col size={40} smSize={100}>
            <View>{locals.inputs.firstName}</View>
          </Col>
          <Col size={20} smSize={100}>
            <View>{locals.inputs.middleName}</View>
          </Col>
          <Col size={30} smSize={100}>
            <View>{locals.inputs.lastName}</View>
          </Col> 
        </Row>
      </Col>
    </Row>)
  }
  }
  </Grid>
}

const connectFunc = connect(
  state => ({
    caPatient: state.caPatient,
    nameComponents: state.caPatient.form.nameComponents    
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)

const enhanceWithFormState = withState('formValues', 'setFormValues', {})

const enhanceWithFormIsValidState = withState('isValid', 'setFormIsValid', false)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    const {setFormValues, passedFields} = this.props
    setFormValues(passedFields)
  }
})

const enhanceWithDefaultProps = defaultProps({
  classOf: CaPatientNameComponents,
  options: {stylesheet},
  styles: styles
})

const enhanceWithProps = withProps(({options, caPatient}) => {
  const { stylesheet } = options

  return {
    options: {
      stylesheet,
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        firstName: {
          label: 'First Name',
          editable: !caPatient.form.isLoading
        },
        middleName: {
          label: 'MI',
          maxLength: 12,
          editable: !caPatient.form.isLoading
        },
        lastName: {
          label: 'Last Name',
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
    onChange: ({setFormValues, setFormIsValid, formValues}) => (nextValue) => {
      const value = form.getValue()
      if (value) {
        // Set pseudo id from passedFields.
        setFormValues({...value, id: formValues.id})
        setFormIsValid(true)
      } else {
        setFormIsValid(false)
      }
    },
    onPress: ({formValues, onCaPatientFormFieldChange}) => e => {
      onCaPatientFormFieldChange('nameComponents', formValues)
      // Go back to previous page.
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
  caPatient,
  passedFields,
  formValues,
  isValid
}) => {
  // const { form: {fields, isValid} } = caPatient
  // const {firstName} = passedFields

  console.log(caPatient)

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
    <View style={styles.container}>
      <Form
        ref={onRef}
        type={classOf}
        options={options}
        value={formValues}
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
  enhanceWithFormState,
  enhanceWithFormIsValidState,
  enhanceWithLifecycle,
  enhanceWithDefaultProps,
  enhanceWithProps,
  enhanceWithHandlers
)(Presentation)

