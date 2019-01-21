/* @flow */

import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import AutoTags from '../../components/AutoTags/AutoTags';
import * as suggestActions from '../Suggest/SuggestAction'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import setStatic from 'recompose/setStatic'
import compose from 'recompose/compose'

import AutoTags from './AutoTags'
import t from 'tcomb-form-native'

const {form: {Component}} = t

// https://github.com/gcanti/tcomb-form-native#custom-factories
class AutoTagsFactory extends Component {
  constructor(props) {
    super(props)
  }

  getLocals = () => super.getLocals()

  getTemplate() {
    return function(locals) {
      return (
        <View>
          <Text>{locals.label}</Text>
          <AutoTags
            onTagsChange={tags => {
              if (locals.config.transformTags) {
                const value = locals.config.transformTags(tags)
                // console.log(this.setState({value}))
                locals.onChange({value})
              }
            }
          }
          />
        </View>
      )
    }.bind(this)
  }
}

AutoTagsFactory.transformer = {
  format: value => value,
  parse: value => value,
}

export default AutoTagsFactory
