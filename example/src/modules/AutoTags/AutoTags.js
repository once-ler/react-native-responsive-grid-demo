/* @flow */

import React  from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AutoTags from '../../components/AutoTags/AutoTags';
import * as suggestActions from '../Suggest/SuggestAction'
import withState from 'recompose/withState'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'

// User need to override searchUrl and parseForSuggestions as needed
const enhanceWithDefaultProps = defaultProps({
  placeholder: 'Enter item to search',
  searchUrl: 'http://mygene.info/v2/query?species=human&q=',
  parseForSuggestions: data => data && data.hits ? data.hits : [],
  onTagsChange: tags => tags
})

const connectFunc = connect(
  state => ({
    suggest: state.suggest,
    data: state.suggest.data,
    tagsSelected: state.suggest.tagsSelected
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
)

// const enhanceWithTagsSelectedState = withState('tagsSelected', 'setTagsSelected', [])

const enhanceWithHandlers = withHandlers({
  handleOnChange: ({searchUrl, fetchSuggest}) => text =>
    fetchSuggest({ url: `${searchUrl}${text}` }),
  handleDelete: ({tagsSelected, onTagsChange, updateTagsSelected}) => index => {
    tagsSelected.splice(index, 1)
    // setTagsSelected(tagsSelected)
    onTagsChange(tagsSelected)
    updateTagsSelected(tagsSelected)
  },
  handleAddition: ({tagsSelected, onTagsChange, updateTagsSelected}) => suggestion => {
    tagsSelected = tagsSelected.concat([suggestion])
    // setTagsSelected(tagsSelected)
    onTagsChange(tagsSelected)
    updateTagsSelected(tagsSelected)
  }
})

const Presentation = ({data, tagsSelected, handleAddition, handleDelete, handleOnChange, parseForSuggestions,
  renderTags, renderSuggestion, renderSeparator, placeholder}) => {
    
  return (
  <View style={styles.container}>
    <View style={styles.autocompleteContainer}>
      <AutoTags
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        itemHeight={20}
        maxItems={6}
        onChangeText={handleOnChange}
        suggestions={parseForSuggestions(data)}
        tagsSelected={tagsSelected}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        renderTags={renderTags}
        renderSuggestion={renderSuggestion}
        renderSeparator={renderSeparator}
    />
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
    alignItems: "center", 
    justifyContent: "center"
  },
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: 'absolute',
    right: 20,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  label: {
    color: "#614b63",
    fontWeight: "bold",
    marginBottom: 10
  }
})

export default compose(
  enhanceWithDefaultProps,
  connectFunc,
  // enhanceWithTagsSelectedState,
  enhanceWithHandlers  
)(Presentation)
