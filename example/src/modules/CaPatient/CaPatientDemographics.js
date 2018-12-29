/* @flow */
import React from 'react'
// import setStatic from 'recompose/setStatic'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {View, Platform} from 'react-native'
import {CaPatient} from './CaPatientTypes'
import connectFunc from './ConnectFunc'
import Form from '../../components/Form/Form'
import {doneButton, doneButtonDisabled} from './CaPatientButtons'

const flexLayout = (locals) => {
  return <Grid>{(state, setState) => {
    return (
    <Col fullWidth>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={45} smSize={100}>
              <View>{locals.inputs.ethnicity}</View>
            </Col>
            <Col size={45} smSize={100}>
              <View>{locals.inputs.race}</View>
            </Col>
          </Row>
        </Col>
      </Row>
      
    </Col>
    
    
    )
  }
  }
  </Grid>
}

const enhanceWithProps = withProps(({caPatient}) => {
  const { form: { isLoading } } = caPatient

  return {
    classOf: CaPatient,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      onCaPatientFormFieldChange('demograhics', formValues)
      // Go back to previous page.
      // navigator.pop({animated: true, animationType: 'fade'})
    },
    options: {
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        ethnicity: {
          label: 'Ethnicity',
          editable: !isLoading
        },
        race: {
          label: 'Race',
          editable: !isLoading
        }
      }
    }
  }
})

export default compose(
  connectFunc,
  enhanceWithProps
)(Form)
