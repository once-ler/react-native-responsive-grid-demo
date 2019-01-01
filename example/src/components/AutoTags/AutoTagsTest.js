import AutoTags from './AutoTags';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as suggestActions from '../../modules/Suggest/SuggestAction'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'

import AutoTagsMod from '../../modules/AutoTags/AutoTags'
// User need to override parseForSuggestions as needed
const enhanceWithDefaultProps = defaultProps({
  title: 'Search',
  placeholder: 'Enter item to search',
  parseForSuggestions: data => data && data.hits ? data.hits : []
})

const connectFunc = connect(
  state => ({
    suggest: state.suggest,
    data: state.suggest.data
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
)

const enhanceWithTagsSelectedState = withState('tagsSelected', 'setTagsSelected', [])

const enhanceWithHandlers = withHandlers({
  handleOnChange: ({fetchSuggest}) => text =>
    fetchSuggest({ url: `${API}${text}` }),
  handleDelete: ({tagsSelected, setTagsSelected}) => index => {
    tagsSelected.splice(index, 1)
    setTagsSelected(tagsSelected)
  },
  handleAddition: ({tagsSelected, setTagsSelected}) => suggestion =>
    setTagsSelected(tagsSelected.concat([suggestion]))
})

const Presentation = ({data, tagsSelected, handleAddition, handleDelete, handleOnChange, parseForSuggestions,
  renderTags, renderSuggestion, renderSeparator, title, placeholder}) => (
  <View style={styles.container}>
    <View style={styles.autocompleteContainer}>
      <Text style={styles.label}>{title}</Text>
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

/*
export default compose(
  connectFunc,
  enhanceWithDefaultProps,
  enhanceWithTagsSelectedState,
  enhanceWithHandlers
)(Presentation)
*/

export default AutoTagsMod

/*
  https://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/
  enable http
  info.plist
  <key>NSAppTransportSecurity</key>
  <dict>
      <key>NSAllowsArbitraryLoads</key>
      <true/>
  </dict>
*/
const API = 'http://mygene.info/v2/query?species=human&q='

function handleOnChange(text) {
  const url = `${API}${text}`
  const promise = fetch(url).then(d => d.json())
  // handleOnChange2(text)
  // console.log(this)
  const { fetchSuggest } = this.props
  // fetchSuggest({ promise })
  // This will also work now:
  fetchSuggest({ url })
}

async function handleOnChange2(text) {
  try {
    let response = await fetch(`${API}${text}`).catch(e => console.log(e))
    let responseJson = await response.json()
    console.log(responseJson)
  } catch (error) {
    console.error(error); 
  }
}

class App extends Component {
  state = {
    tagsSelected: []
  }

  constructor (props) {
    super(props)
    handleOnChange = handleOnChange.bind(this)
  }

  componentWillMount() {
    console.log('Will count');
  }

  componentDidMount() {
    console.log('mounted')
  }

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          const {item: {name}} = t
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => this.handleDelete(i)}
            >
              <Text style={{ color: "gray" }}>
                {i}) {name}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  customRenderSuggestion = suggestion => {
    const {taxid, symbol, name, entrezgene, _id} = suggestion.item
    return <Text style={styles.itemText}>{_id} {taxid} {symbol} {name})</Text>
  }

  customRenderSeparator = () => (<View
    style={{
      height: 1,
      width: "86%",
      backgroundColor: "#CED0CE",
      marginLeft: "14%"
    }}
  />)

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }
  
  handleAddition = suggestion => {
    console.log(this.state.tagsSelected)
    // TODO: make sure the tagsSelected container does not already contain this item.  
    this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
  }

  render() {
    const {data} = this.props
    
    const suggestions = data && data.hits ? data.hits : []

    return (
      <View style={styles.container}>
        <View style={styles.autocompleteContainer}>
        <Text style={styles.label}>Recipients</Text>
          <AutoTags
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Enter gene symbol"
            itemHeight={20}
            maxItems={6}
            onChangeText={handleOnChange}
            suggestions={suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            // renderTags={this.customRenderTags}
            // renderSuggestion={customRenderSuggestion}
            // renderSeparator={customRenderSeparator}
          />
        </View>
      </View>
      
    )
  }
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

// export default connectFunc(App);
