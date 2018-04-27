import Autocomplete from './Autocomplete';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import {
  Text
} from 'native-base';

const API = 'http://mygene.info/v2/query?species=human&q='

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

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      genes: [],
      query: ''
    }

    handleOnChange = handleOnChange.bind(this)
  }

  render() {
    const {genes, query} = this.state
    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={genes}
          defaultValue={query}
          keyExtractor={(item, index) => item._id.toString()}
          itemHeight={20}
          maxItems={10}
          onChangeText={debounce(handleOnChange, 200, true)}
          placeholder="Enter gene symbol"
          renderItem={({index, item}) => {
            const {taxid, symbol, name, entrezgene, _id} = item
            return (<TouchableOpacity onPress={() => this.setState({ query: name, genes: [] })}>
              <Text style={styles.itemText}>{_id} {taxid} {symbol} {name})</Text>
              </TouchableOpacity>
            )
          }}
          renderSeparator={() => (<View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />)}
        />        
      </View>
    );
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
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
})

export default App
