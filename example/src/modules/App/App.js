/* @flow */
import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import Presentation from './Presentation'
import { connectFunc } from './Connect' 

const enhanceWithLifecycle = lifecycle({
  componentWillReceiveProps(nextProps) {
    
  },
  componentWillUpdate(nextProps, nextState) {
    
  },
  componentWillMount() {
    
  },
  componentWillUnmount() {
    
  },
  componentDidMount() {
    
  }
})

export default compose(
  connectFunc,
  enhanceWithLifecycle
)(Presentation)
