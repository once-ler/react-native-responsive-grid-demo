/* @flow */
import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as suggestActions from '../Suggest/SuggestAction'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import setStatic from 'recompose/setStatic'
import compose from 'recompose/compose'

import AutoTags from './AutoTags'
import t from 'tcomb-form-native'
import { UnsubscriptionError } from 'rxjs';

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
              let value = tags
              if (locals.config.transformTags) {
                value = locals.config.transformTags(tags)
              }
              locals.onChange(value)
            }
          }
          renderSuggestion={locals.config.renderSuggestion}
          />
        </View>
      )
    }.bind(this)
  }
}

AutoTagsFactory.transformer = {
  format: value => Array.isArray(value) ? value.join(' ') : value,
  parse: str => typeof str === 'string' ? str.split(' ') : []
}

export default AutoTagsFactory
