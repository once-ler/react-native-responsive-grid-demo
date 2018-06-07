/* @flow */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as caPatientActions from './CaPatientAction'

export default connect(
  state => ({
    caPatient: state.caPatient    
  }),
  dispatch => bindActionCreators(caPatientActions, dispatch)
)
