import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
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

const stylesheet = cloneDeep(Form.stylesheet);

// Horizontal
const flexLayout = (locals) => {
  return <Grid>{() => {
    const screenInfo = ScreenInfo()
    const textWidth3 = Math.ceil(screenInfo.width / 4)
    return (
    <Row>
      <Col size={90} offset={6} >
        <Row>
          <Col size={40} smSize={100}>
            <View style={{fontSize: 12, color: '#0a0a0a'}}>{locals.inputs.firstName}</View>
          </Col>
          <Col size={20} smSize={100}>
            <View style={{fontSize: 12, color: '#0a0a0a'}}>{locals.inputs.middleName}</View>
          </Col>
          <Col size={30} smSize={100}>
            <View style={{fontSize: 12, color: '#0a0a0a'}}>{locals.inputs.lastName}</View>
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

const enhanceWithDefaultProps = defaultProps({
  classOf: CaPatientNameComponents,
  options: {stylesheet},
  styles: styles
})

const enhanceWithProps = withProps(({options, caPatient}) => {
  const { stylesheet } = options
  return {    
    options: {
      template: flexLayout,
      stylesheet,
      auto: 'placeholders',
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
    onChange: ({onCaPatientFormFieldChange}) => (nextValue) => {
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

