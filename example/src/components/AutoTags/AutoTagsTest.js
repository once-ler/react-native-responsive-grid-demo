import AutoTags from './AutoTags';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
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
    suggestions: state.suggest.suggestions
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
    bogus: false
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

  render() {
    console.log('Rendering')
    
    const {data} = this.props
    return (
      <View style={styles.container}>
        <Text>Autocomplete Tags</Text>
        <AutoTags
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter gene symbol"
          containerStyle={styles.autocompleteContainer}
          onChangeText={handleOnChange}
          suggestions={data}
        />
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
  }
})

export default ConnectFunc(App);
