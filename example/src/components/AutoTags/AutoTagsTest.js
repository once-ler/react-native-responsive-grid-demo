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
import createStore from '../../createStore'

// const store = createStore()

const ConnectFunc = connect(
  state => ({
    suggest: state.suggest,
    data: state.suggest.data
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
)

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
  // this.setState({isLoading: true})
  try {
    let response = await fetch(`${API}${text}`).catch(e => console.log(e))
    let responseJson = await response.json()
    console.log(responseJson)
    // this.setState({genes: responseJson.hits})
  } catch (error) {
    console.error(error); 
  }
  // this.setState({isLoading: false})
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
    left: 0,
    position: 'absolute',
    right: 0,
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

export default ConnectFunc(App);
