import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  
  FlatList,
  ListView,
  Platform,
  StyleSheet,
  TextInput as Input,
  Text,
  View,
  ViewPropTypes as RNViewPropTypes
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
  static propTypes = {
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ListView.propTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func
  };

  static defaultProps = {
    data: [],
    defaultValue: '',
    keyboardShouldPersistTaps: 'always',
    keyExtractor: (item, index) => index.toString(),
    onStartShouldSetResponderCapture: () => false,
    onEndReached: ({ distanceFromEnd }) => {},
    onEndReachedThreshold: 1,
    renderItem: ({ item, index }) => <Text>{item}</Text>,
    renderSeparator: null,
    renderTextInput: props => <Input {...props} />
  };

  constructor(props) {
    super(props);
    this.resultList = null;
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
  }

  renderResultList() {
    const {
      data,
      itemHeight,
      keyboardShouldPersistTaps,
      keyExtractor,
      listStyle,
      maxItems,
      onEndReached,
      onEndReachedThreshold,
      renderItem,
      renderSeparator
    } = this.props;
    
    const height = Math.min(itemHeight*data.length,maxItems*itemHeight)
    console.log(height)
    return (
      <FlatList
        ref={(resultList) => { this.resultList = resultList; }}
        data={data}
        ItemSeparatorComponent={renderSeparator}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        keyExtractor={keyExtractor}        
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        renderItem={renderItem}
        style={[styles.list,{height},listStyle]}
      />
    );    
  }

  renderTextInput() {
    const { onEndEditing, renderTextInput, style } = this.props;
    const props = {
      style: [styles.input, style],
      ref: ref => (this.textInput = ref),
      onEndEditing: e => onEndEditing && onEndEditing(e),
      ...this.props
    };

    return renderTextInput(props);
  }

  render() {
    const {
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture,
      data
    } = this.props;
    const showResults = data.length > 0

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
        </View>
        {showResults && (
          <View
            style={[styles.listContainer, listContainerStyle]}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderBottomWidth: 1,
};

const androidStyles = {
  container: {
    flex: 1,
    marginBottom: 10
  },
  inputContainer: {
    ...border,
    marginBottom: 0
  },
  listContainer: {
    flex: 1
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    margin: 10,
    marginTop: 0
  }
};

const iosStyles = {
  container: {
    zIndex: 1,
    marginBottom: 10
  },
  inputContainer: {
    ...border
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3    
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    left: 0,
    right: 0
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 5,
    fontSize: 17
  },
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});

export default Autocomplete;
