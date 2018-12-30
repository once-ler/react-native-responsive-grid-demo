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

const {fetchSuggest} = suggestActions

// const store = createStore()

const ConnectFunc = connect(
  state => ({
    suggestions: state.suggest.suggestions
  }),
  dispatch => bindActionCreators(suggestActions, dispatch)
)

const API = 'http://mygene.info/v2/query?species=human&q='

const handleOnChange = text => {
  promise = fetch(`${API}${text}`)

  fetchSuggest({ promise })
}

/*
async function handleOnChange(text) {
  this.setState({isLoading: true})
  try {
    let response = await fetch(`${API}${text}`)
    let responseJson = await response.json()

    this.setState({genes: responseJson.hits})
  } catch (error) {
    console.error(error); 
  }
  this.setState({isLoading: false})
}
*/

class App extends Component {
  state = {
    bogus: false
  }

  constructor (props) {
    super(props)
    console.log('Called')
  }

  render() {
    console.log('Rendering')
    
    const {data} = this.props
    return (<View style={styles.container}>
        <Text>Autocomplete Tags</Text>
        {/*
        <AutoTags
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter gene symbol"
          containerStyle={styles.autocompleteContainer}
          onChangeText={handleOnChange}
          suggestions={data}
        />
        */}
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

export default App;
