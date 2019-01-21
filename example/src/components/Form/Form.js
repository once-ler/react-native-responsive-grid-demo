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

const enhanceWithHandlers = withHandlers(({onSubmit, onNavigatorEvent}) => {
  let form = null

  return {
    onRef: () => (ref) => (form = ref),
    onChange: ({setFormValues, setFormIsValid, formValues, navigator}) => (nextValue) => {
      console.log(form.refs.input)
      console.log(form.refs.input.validate.toString())
      /*
function validate() {
        var value = {};
        var errors = [];
        var hasError = false;
        var result = void 0;

        if (this.typeInfo.isMaybe && this.isValueNully()) {
          this.removeErrors();
          return new _tcombValidation2.default.ValidationResult({
            errors: [],
            value: null
          });
        }

        for (var ref in this.refs) {
          if (this.refs.hasOwnProperty(ref)) {
            result = this.refs[ref].validate();
            errors = errors.concat(result.errors);
            value[ref] = result.value;
          }
        }

        if (errors.length === 0) {
          var InnerType = this.typeInfo.innerType;
          value = new InnerType(value);

          if (this.typeInfo.isSubtype && errors.length === 0) {
            result = _tcombValidation2.default.validate(value, this.props.type, this.getValidationOptions());
            hasError = !result.isValid();
            errors = errors.concat(result.errors);
          }
        }

        this.setState({
          hasError: hasError
        });
        return new _tcombValidation2.default.ValidationResult({
          errors: errors,
          value: value
        });
      }
      */
      const value = form.getValue()
      console.log([formValues, value, nextValue])
      
      if (value) {
        if (!Array.isArray(value)) {
          // Set pseudo id from passedFields.
          setFormValues({...value, id: formValues.id})
        }
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
