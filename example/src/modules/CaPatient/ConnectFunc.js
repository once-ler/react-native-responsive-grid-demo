/* @flow */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as caPatientActions from './CaPatientAction'
import * as suggest from '../Suggest/SuggestAction'

export default connect(
  state => ({
    caPatient: state.caPatient,
    suggest: state.suggest
  }),
  dispatch => bindActionCreators({...caPatientActions, ...suggest}, dispatch)
)
