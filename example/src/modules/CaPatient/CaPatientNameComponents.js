/* @flow */
import React from 'react'
import setStatic from 'recompose/setStatic'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {View, Platform} from 'react-native'
import {CaPatientNameComponents} from './CaPatientTypes'
import connectFunc from './ConnectFunc'
import Form from '../../components/Form/Form'
import {doneButton, doneButtonDisabled} from './CaPatientButtons'

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

const enhanceWithStatic = setStatic(
  'navigatorButtons', {
    rightButtons: [doneButton]
  }
)

const enhanceWithProps = withProps(({caPatient}) => {
  const { form: { isLoading } } = caPatient

  return {
    classOf: CaPatientNameComponents,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      onCaPatientFormFieldChange('nameComponents', formValues)
      // Go back to previous page.
      // navigator.pop({animated: true, animationType: 'fade'})
    },
    options: {
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        firstName: {
          label: 'First Name',
          editable: !isLoading
        },
        middleName: {
          label: 'MI',
          maxLength: 12,
          editable: !isLoading
        },
        lastName: {
          label: 'Last Name',
          editable: !isLoading
        }
      }
    }
  }
})

export default compose(
  // enhanceWithStatic,
  connectFunc,
  enhanceWithProps
)(Form)
