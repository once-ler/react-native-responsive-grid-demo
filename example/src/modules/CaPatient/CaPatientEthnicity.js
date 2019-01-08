/* @flow */
import React from 'react'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {StyleSheet, View, Platform, Text} from 'react-native'
import {CaPatient} from './CaPatientTypes'
import connectFunc from './ConnectFunc'
import Form from '../../components/Form/Form'
// import {doneButton, doneButtonDisabled} from './CaPatientButtons'
import AutoTags from '../AutoTags/AutoTags'

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

const enhanceWithProps = withProps(({caPatient, suggest, updateTagsSelected}) => {
  const { form: { isLoading } } = caPatient

  return {
    classOf: CaPatient,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
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
          template: locals => {
            const passedTags = locals.value.slice()
            console.log(passedTags.length)
            if (passedTags.length > 0) {
              const a = passedTags.map(a => ({item: { _id: a, name: a }}));
              // console.log(a)
              updateTagsSelected(a)
            }
            
            return (
              <View>
                <Text>{locals.label}</Text>
                <AutoTags
                  onTagsChange={tags => {
                    console.log(tags)
                    console.log(locals)
                  }
                }
                />
              </View>
            )
          }
        }
      }
    }

  }
})

export default compose(
  connectFunc,
  enhanceWithProps
)(Form)
