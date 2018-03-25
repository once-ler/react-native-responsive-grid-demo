/* @flow */
import React from 'react'
import {View, Button, Text} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import * as loginActions from './LoginAction'

const enhanceWithHandlers = withHandlers({
  onLoginPress: ({login}) => () => login(1)
})

const connectFunc = connect(
  state => ({ loginError: state.login.error }),
  dispatch => bindActionCreators(loginActions, dispatch)
)

const Presentation = ({onLoginPress}) => (
  <View>
  <Button large onPress={ () => onLoginPress()} title="Continue">
    <Text>Continue</Text>
  </Button>
  </View>
)

export default compose(
  connectFunc,
  enhanceWithHandlers
)(Presentation)
