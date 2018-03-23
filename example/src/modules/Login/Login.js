/* @flow */
import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'

const mapDispatchToProps = dispatch => ({
  dispatch,
  submitAction
})

const submitAction = data => (dispatch, getState) => {
  dispatch({ type: 'LOGIN_FORM_CLEAR_ERROR' });
  dispatch({ type: 'LOGIN', data });
}

const connectFunc = connect(
  state => ({ loginError: state.auth.error }),
  mapDispatchToProps
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
  SimplerForm({id: 'login'}),
)(Presentation)
