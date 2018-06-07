import React from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
import lifecycle from 'recompose/lifecycle'
import shouldUpdate from 'recompose/shouldUpdate'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import cloneDeep from 'lodash.clonedeep'
import {Text, ScrollView, View, TouchableHighlight} from 'react-native'
import styles from './Styles'

const {form: {Form}} = t

const stylesheet = cloneDeep(Form.stylesheet)
stylesheet.button.alignSelf = 'flex-end'
stylesheet.button.flex = 0

const enhanceWithFormState = withState('formValues', 'setFormValues', {})

const enhanceWithFormIsValidState = withState('isValid', 'setFormIsValid', false)

// Users must define classOf, onSubmit, passedValues
const enhanceWithShouldUpdate = shouldUpdate((props, nextProps) =>
  props.classOf && props.onSubmit && props.passedValues)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    const {setFormValues, passedFields} = this.props
    setFormValues(passedFields)
  }
})

const enhanceWithDefaultProps = defaultProps({
  classOf: undefined,
  options: {stylesheet},
  styles: styles
})

const enhanceWithHandlers = withHandlers(({onSubmit}) => {
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
    onSubmit
  }
})

const Presentation = ({
  classOf,
  onRef,
  onChange,
  onSubmit,
  options,
  styles,
  passedFields,
  formValues,
  isValid
}) => {
  // Late binding.
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
      <TouchableHighlight style={styles.button} onPress={onSubmit} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      }
    </View>
    </ScrollView>
  )
}

export default compose(
  enhanceWithShouldUpdate,
  enhanceWithFormState,
  enhanceWithFormIsValidState,
  enhanceWithLifecycle,
  enhanceWithDefaultProps,
  enhanceWithHandlers  
)(Presentation)
