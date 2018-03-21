/* @flow */
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  dispatch
})

export const connectFunc = connect(
  state => ({
    nav: state.navigation,
    user: state.auth.user,
    theme: state.theme
  }),
  mapDispatchToProps
)
