import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { Row, Column as Col, Grid} from 'react-native-responsive-grid'

import styles from './Style'
import * as listActions from './FlatListAction'

class FlatListTab extends Component {
  constructor(props) {
    super(props)
    props.listFetch()
  }

  onEndReached = () => {
    this.props.listFetchReachedEnd()
  };

  onRefresh = () => {
    this.props.listFetch()
  }

  render() {
    console.log(this.props)

    const onPress = () => {
      this.props.navigator.push({
        screen: 'example.SubView'
      })
    }

    return (
        <FlatList
          data={this.props.data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          renderItem={
            ({ item }) => {
              return (
                <Grid>{(state, setState) => (
                <Row key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                  <Col size={80} offset={6} >
                    <Row>
                      <Col size={40} smSize={100}>
                        <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</Text>
                        <Row>
                          <Col size={5}>
                            {/* <MaterialIcons name='person' size={17} color='gray'/> */ }
                            <Text>*</Text>
                          </Col>
                          <Col smSize={60} size={87.5} offset={2.5}>
                            <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>{item.job}</Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col size={20} smSize={100}>
                        <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.firstName}</Text>
                      </Col>
                      <Col size={20} smSize={100}>
                        <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.lastName}</Text>
                      </Col>
                      <Col size={20} smSize={100}>
                        <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.date}</Text>
                      </Col> 
                    </Row>    
                  </Col>
                  <Col size={8} offset={-6} hAlign='right'>
                        <Text>{item.index}</Text>
                        <TouchableHighlight onPress={onPress}>
                          <View>
                            <Icon name="ios-arrow-forward" size={50} style={styles.icon} color="#900"/>
                          </View>
                        </TouchableHighlight>
                  </Col>
                </Row>
                )}
                </Grid>
              )
            }}
        />
    )
  }
}

const connectFunc = connect(
  state => ({ refreshing: state.home.refreshing, data: state.home.payload, icons: state.app.icons }),
  dispatch => bindActionCreators(listActions, dispatch)
)

export default compose(
  connectFunc
)(FlatListTab)
