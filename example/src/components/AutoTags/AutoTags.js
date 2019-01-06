/* 
  This is a fork of https://github.com/JoeRoddy/react-native-tag-autocomplete
  Modified for use with local version of AutoComplete.
*/
/*
  renderTags
  renderSuggestion
*/
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Autocomplete from "../AutoComplete/AutoComplete";
import {debounce} from '../../util'

export default class AutoTags extends Component {
  constructor(props) {
    super(props)
    props.onChangeText = props.onChangeText.bind(this)
  }
  
  state = {
    query: ""
  };

  renderTags = () => {
    if (this.props.renderTags) {
      return this.props.renderTags(this.props.tagsSelected);
    }

    const tagMargins = this.props.tagsOrientedBelow
      ? { marginBottom: 5 }
      : { marginTop: 5 };

    return (
      <View style={this.props.tagStyles || styles.tags}>
        <ScrollView>
        {this.props.tagsSelected.map((t, i) => {
          const item = t.item
          return (
            <View key={'rm_' + i} style={[styles.indicatorContainer]}>
              <TouchableHighlight
                key={i}
                style={[tagMargins, styles.tag]}
                onPress={() => this.props.handleDelete(i)}
              >
                <Text>{item.name}</Text>
              </TouchableHighlight>
              <RemoveIndicator onPress={() => this.props.handleDelete(i)}/>
            </View>
          );
        })}
        </ScrollView>
      </View>
    );
  };

  handleInput = text => {
    if (this.submitting) return;
    if (this.props.allowBackspace) {
      //TODO: on ios, delete last tag on backspace event && empty query
      //(impossible on android atm, no listeners for empty backspace)
    }
    if (this.props.onChangeText) return debounce(() => this.props.onChangeText(text), 200, true);
    if (
      this.props.createTagOnSpace &&
      this.props.onCustomTagCreated &&
      text.length > 1 &&
      text.charAt(text.length - 1) === " "
    ) {
      this.setState({ query: "" });
      return this.props.onCustomTagCreated(text.trim());
    } else if (this.props.createTagOnSpace && !this.props.onCustomTagCreated) {
      console.error(
        "When enabling createTagOnSpace, you must provide an onCustomTagCreated function"
      );
    }

    if (text.charAt(text.length - 1) === "\n") {
      return; // prevent onSubmit bugs
    }

    this.setState({ query: text });
  };
/*
  filterData = query => {
    if (!query || query.trim() == "" || !this.props.suggestions) {
      return;
    }
    if (this.props.filterData) {
      return this.props.filterData(query);
    }
    let suggestions = this.props.suggestions;
    let results = [];
    query = query.toUpperCase();
    suggestions.forEach(i => {
      if (i.name.toUpperCase().includes(query)) {
        results.push(i);
      }
    });
    return results;
  };
*/
  onSubmitEditing = () => {
    const { query } = this.state;
    if (!this.props.onCustomTagCreated || query.trim() === "") return;
    this.setState({ query: "" }, () => this.props.onCustomTagCreated(query));

    // prevents an issue where handleInput() will overwrite
    // the query clear in some circumstances
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 30);
  };

  addTag = tag => {
    this.props.handleAddition(tag);
    this.setState({ query: "" });
  };

  renderSeparator = () => (<View
    style={{
      height: 1,
      width: "86%",
      backgroundColor: "#CED0CE",
      marginLeft: "14%"
    }}
  />);

  render() {
    const { query } = this.state;
    // const data = this.filterData(query);
    const {suggestions} = this.props

    return (
      <View style={styles.AutoTags}>
        {!this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
        <Autocomplete
          data={suggestions}
          controlled={true}
          placeholder={this.props.placeholder}
          defaultValue={query}
          value={query}
          onChangeText={text => this.handleInput(text)}
          onSubmitEditing={this.onSubmitEditing}
          multiline={true}
          autoFocus={this.props.autoFocus === false ? false : true}
          renderItem={suggestion => (
            <TouchableOpacity onPress={e => this.addTag(suggestion)}>
              {this.props.renderSuggestion ? (
                this.props.renderSuggestion(suggestion)
              ) : (
                <Text>{suggestion.item.name}</Text>
              )}
            </TouchableOpacity>
          )}
          inputContainerStyle={
            this.props.inputContainerStyle || styles.inputContainerStyle
          }
          renderSeparator={this.props.renderSeparator || this.renderSeparator}
          containerStyle={this.props.containerStyle || styles.containerStyle}
          underlineColorAndroid="transparent"
          style={{ backgroundColor: "#efeaea" }}
          listContainerStyle={{
            backgroundColor: this.props.tagsOrientedBelow
              ? "#efeaea"
              : "transparent"
          }}
          {...this.props}
        />
        {this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
      </View>
    );
  }
}

const RemoveIndicator = ({onPress}) => {
  return (
    <TouchableHighlight style={styles.cellAccessoryView} onPress={onPress} >
      <View style={styles.accessory_disclosureIndicator}>
        <Icon name="ios-close-outline" size={30} color="#4F8EF7" />
      </View>
    </TouchableHighlight>
  )
}

const border = {
  borderColor: '#b9b9b9',
  borderWidth: 1,
}

const padding = {
  padding: 8
}

const indicatorStyles = {
  indicatorContainer: {
    justifyContent: 'space-between',
    // alignContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    width: 300,
    borderBottomWidth: 0.8,
    borderColor: 'gray'
  },
  cellAccessoryView: {
    justifyContent: 'center',
  },
  accessory_disclosureIndicator: {
    width: 30,
    height: 30,
    marginLeft: 7,
    backgroundColor: 'transparent'
  }
}

const styles = StyleSheet.create({
  ...indicatorStyles,
  AutoTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  tags: {
    ...border,
    ...padding,
    flexDirection: "column",
    alignItems: "flex-start",
    // backgroundColor: "#efeaea",
    backgroundColor: "transparent",
    width: 300,
    maxHeight: 160
  },
  tag: {
    ...padding,
    backgroundColor: "rgb(244, 244, 244)",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    marginLeft: 5
    // borderRadius: 30,
    // padding: 8
  },
  inputContainerStyle: {
    borderRadius: 0,
    paddingLeft: 5,
    height: 40,
    width: 300,
    justifyContent: "center",
    borderColor: "transparent",
    alignItems: "stretch",
    backgroundColor: "#efeaea"
  },
  containerStyle: {
    minWidth: 200,
    maxWidth: 300
  }
});
