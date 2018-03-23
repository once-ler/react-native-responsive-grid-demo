/* @flow */
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose'
import * as loginActions from './Action'

const enhanceWithHandlers = withHandlers({
  onLoginPress: props => () => props.dispatch(loginActions.login())
})

const connectFunc = connect(
  state => ({ loginError: state.auth.error }),
  dispatch => bindActionCreators(loginActions, dispatch)
)

const Presentation = props => (
  <View>
  <Button large onPress={ () => this.onLoginPress()} title="Continue">
    <Text> Continue</Text>
  </Button>
  </View>
)

export default compose(
  connectFunc,
  enhanceWithHandlers
)(Presentation)
