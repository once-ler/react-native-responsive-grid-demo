/* @flow */
import t from 'tcomb-form-native'
import {connect} from 'react-redux'
import defaultProps from 'recompose/defaultProps'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'

import * as profileActions from './UserProfileAction'

const { form: {Form}, String, Boolean, Number, maybe: Option, struct: Class } = t

const Person = Class({
  name: String,
  surname: Option(String),
  age: Number,
  rememberMe: Boolean
})

/*
const onPress = props => {
  // call getValue() to get the values of the form
  // const value = props.refs.form.getValue();
  const value = props.userProfile
  if (value) { // if validation fails, value will be null
    console.log(value); // value here is an instance of Person
  }
}
*/

const connectFunc = connect(
  state => ({
    profile: state.profile
  }),
  dispatch => bindActionCreators(profileActions, dispatch)
)

const enhanceWithDefaultProps = defaultProps({
  classOf: Person,
  options: {},
  styles: StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
      marginBottom: 30
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  })
})

const enhanceWithHandlers = withHandlers({
  onPress: ({userProfile}) => e => {
    if (userProfile)
      console.log(userProfile)
  }
})

const Presentation = ({
  classOf,
  onPress,
  options,
  styles
}) => (
  <View style={styles.container}>
    <Form
      ref="form"
      type={classOf}
      options={options}
    />
    <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableHighlight>
  </View>
)

export default compose(
  connectFunc,
  enhanceWithDefaultProps,
  enhanceWithProps,
  enhanceWithHandlers
)(Persentation)
