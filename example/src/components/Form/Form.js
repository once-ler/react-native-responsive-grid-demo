import React from 'react'
import t from 'tcomb-form-native'
// import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
import lifecycle from 'recompose/lifecycle'
import shouldUpdate from 'recompose/shouldUpdate'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import cloneDeep from 'lodash.clonedeep'
import {Text, ScrollView, View, TouchableHighlight} from 'react-native'
import styles from './Styles'
import {doneButton, doneButtonDisabled} from './Buttons'

const {form: {Form}} = t

const stylesheet = cloneDeep(Form.stylesheet)
stylesheet.button.alignSelf = 'flex-end'
stylesheet.button.flex = 0

const enhanceWithFormState = withState('formValues', 'setFormValues', {})

const enhanceWithFormIsValidState = withState('isValid', 'setFormIsValid', false)

// Users must define classOf, onSubmit, passedFields
const enhanceWithShouldUpdate = shouldUpdate((props, nextProps) =>
  !!props.classOf && !!props.onSubmit && !!props.passedFields)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    const {setFormValues, passedFields} = this.props
    
    setFormValues(passedFields)

    this.props.navigator.setOnNavigatorEvent(this.props.onNavigatorEvent.bind(this.props))
  }
})

const enhanceWithDefaultProps = defaultProps({
  classOf: undefined,
  options: {stylesheet},
  styles: styles
})

/*
  There is a bug in tcomb for required but not rendered values.
  https://github.com/gcanti/tcomb-form/issues/372
  So if we were to use a custom factory component for ethnicity and only render that field, 
  we have to make all other fields Option[A].
*/
const enhanceWithHandlers = withHandlers(({onSubmit, onNavigatorEvent}) => {
  let form = null

  return {
    onRef: () => (ref) => (form = ref),
    onChange: ({setFormValues, setFormIsValid, formValues, navigator}) => (nextValue) => {
      let valid
      
      try {
        valid = form.getValue()
      } catch (e) {
        // hasError styles need to kick in.
        return
      }
      
      console.log([formValues, valid, nextValue])
      
      if (valid) {
        // Set pseudo id from passedFields.
        setFormValues({...nextValue, id: formValues.id})
        setFormIsValid(true)
        navigator.setButtons({rightButtons: [doneButton]})
      } else {
        setFormIsValid(false)
        navigator.setButtons({rightButtons: [doneButtonDisabled]})
      }
    },
    onSubmit,
    onNavigatorEvent: props => event => {
      switch (event.id) {
        case 'done':
          props.onSubmit(props)(event)
          return props.navigator.pop({animated: true, animationType: 'fade'})
        default:
          return
      }
    }
  }
})

const Presentation = ({
  classOf,
  onRef,
  onChange,
  options,
  styles,
  formValues
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
    </View>
    </ScrollView>
  )
}

export default compose(
  enhanceWithShouldUpdate,
  enhanceWithFormState,
  enhanceWithFormIsValidState,
  enhanceWithDefaultProps,
  enhanceWithHandlers,
  enhanceWithLifecycle  
)(Presentation)
