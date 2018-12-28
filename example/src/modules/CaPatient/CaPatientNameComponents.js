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
  return <Grid>{(state, setState) => {
    return (
    <Col fullWidth>
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
      </Row>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={60} smSize={100}>
              <View>{locals.inputs.preferredName}</View>
            </Col>
            <Col size={30} smSize={100}>
              <View>{locals.inputs.preferredNameType}</View>
            </Col> 
          </Row>
        </Col>
      </Row>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={30} smSize={100}>
              <View>{locals.inputs.lastNamePrefix}</View>
            </Col>
            <Col size={30} smSize={100}>
              <View>{locals.inputs.suffix}</View>
            </Col>
            <Col size={30} smSize={100}>
              <View>{locals.inputs.title}</View>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={45} smSize={100}>
              <View>{locals.inputs.initials}</View>
            </Col>
            <Col size={45} smSize={100}>
              <View>{locals.inputs.academic}</View>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={90} smSize={100}>
              <View>{locals.inputs.lastNameFromSpouse}</View>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col size={90} offset={6} >
          <Row>
            <Col size={50} smSize={100}>
              <View>{locals.inputs.spouseLastNamePrefix}</View>
            </Col>
            <Col size={40} smSize={100}>
              <View>{locals.inputs.spouseLastNameFirst}</View>
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
        },
        lastNameFromSpouse: {
          label: 'Last Name From Spouse',
          editable: !isLoading
        },
        spouseLastNameFirst: {
          label: 'Use Spouse Last Name First',
          editable: !isLoading
        },
        spouseLastNamePrefix: {
          label: 'Spouse Last Name Prefix',
          editable: !isLoading
        },
        preferredName: {
          label: 'Preferred Name',
          editable: !isLoading
        },
        preferredNameType: {
          label: 'Preferred Name Type',
          editable: !isLoading
        },
        lastNamePrefix: {
          label: 'Last Name Prefix',
          editable: !isLoading
        },
        suffix: {
          label: 'Suffix',
          editable: !isLoading
        },
        title: {
          label: 'Title',
          editable: !isLoading
        },
        initials: {
          label: 'Initials',
          editable: !isLoading
        },
        academic: {
          label: 'Academic',
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
