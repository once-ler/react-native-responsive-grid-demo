/* @flow */

// TODO: Need to rewrite as factory.
// https://github.com/gcanti/tcomb-form-native/issues/335

import React from 'react'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {StyleSheet, View, Platform, Text} from 'react-native'
import {CaPatient, String} from './CaPatientTypes'
import connectFunc from './ConnectFunc'
import Form from '../../components/Form/Form'
// import {doneButton, doneButtonDisabled} from './CaPatientButtons'
import AutoTagsFactory from '../AutoTags/AutoTagsFactory'

const flexLayout = (locals) => {
  return <View style={styles.autocompleteContainer}>{locals.inputs.ethnicity}</View>
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: 'absolute',
    right: 20,
    top: -20,
    zIndex: 1
  }
})


const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    // Update suugest.tagsSelected
    const caPatient = this.props.caPatient
    let ethnicityWithName = caPatient.context && caPatient.context.ethnicity ? caPatient.context.ethnicity.map(a => ({item: { _id: a, name: a }})) : []

    this.props.updateTagsSelected(ethnicityWithName)
  }
})

// const enhanceWithProps = withProps(({caPatient, suggest, updateTagsSelected}) => {
const enhanceWithProps = withProps(props => {
  // console.log(props)
  const {caPatient, suggest} = props
  const { form: { isLoading } } = caPatient

  // let passedFieldsWithName = passedFields.map(a => ({item: { _id: a, name: a }}))
  let ethnicityWithName = caPatient.context && caPatient.context.ethnicity ? caPatient.context.ethnicity.map(a => ({item: { _id: a, name: a }})) : []

  return {
    classOf: CaPatient,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      console.log(formValues)
      onCaPatientFormFieldChange('ethnicity', formValues)
      // Go back to previous page.
      // navigator.pop({animated: true, animationType: 'fade'})
    },
    options: {
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        ethnicity: {
          label: 'Ethnicity',
          editable: !isLoading,
          factory: AutoTagsFactory,
          config: {
            transformTags: function(tags) {
              return tags.map(a => a.item._id)
            }
          }
        }
      }
    }

  }
})

/*
const enhanceWithHandlers = withHandlers(({onSubmit, onNavigatorEvent, onChange}) => {

  return {
    onChange: props => e => {
      console.log(props)
    }
    
  }
})
*/

export default compose(
  connectFunc,
  // enhanceWithHandlers,
  enhanceWithProps,
  enhanceWithLifecycle
)(Form)
