/* @flow */

// TODO: Need to rewrite as factory.
// https://github.com/gcanti/tcomb-form-native/issues/335

import React from 'react'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {StyleSheet, View, Platform, Text} from 'react-native'
import {CaPatient} from './CaPatientTypes'
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

// const enhanceWithProps = withProps(({caPatient, suggest, updateTagsSelected}) => {
const enhanceWithProps = withProps(props => {
  console.log(props)
  const {caPatient, suggest, updateTagsSelected, passedFields} = props
  const { form: { isLoading } } = caPatient

  let passedFieldsWithName = passedFields.map(a => ({item: { _id: a, name: a }}))
  
  return {
    classOf: CaPatient,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      console.log(formValues)
      onCaPatientFormFieldChange('demograhics:ethnicity', formValues)
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
            passedFields: passedFieldsWithName
          }
          /*
          template: locals => {
            const passedTags = locals.value.slice()
            // console.log(passedTags.length)
            if (passedTags.length > 0) {
              const a = passedTags.map(a => ({item: { _id: a, name: a }}));
              // console.log(a)
              // updateTagsSelected(a)
              // cannot update here
            }
            console.log(locals)
            return (
              <View>
                <Text>{locals.label}</Text>
                <AutoTags
                  onTagsChange={tags => {
                    // console.log(tags)
                    console.log(locals)
                    // path: ethnicity
                    // updateTagsSelected(tags)
                    locals.onChange(tags, [], "ethnicity", "add")
                  }
                }
                />
              </View>
            )
          }
          */
        }
      }
    }

  }
})

const enhanceWithHandlers = withHandlers(({onSubmit, onNavigatorEvent, onChange}) => {

  return {
    onChange: props => e => {
      console.log(props)
    }
    
  }
})

export default compose(
  connectFunc,
  // enhanceWithHandlers,
  enhanceWithProps
)(Form)
