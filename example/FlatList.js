import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView
} from 'react-native';

import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
// import { MaterialIcons } from '@expo/vector-icons';
import faker from 'faker';

let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

export default class Home extends Component {
  state = {
    refreshing: false,
    data: randomUsers(10),
  };

  onEndReached = () => {
    const data = [
        ...this.state.data,
        ...randomUsers(10),
      ]

    this.setState(state => ({
      data
    }));
  };

  onRefresh = () => {
    this.setState({
      data: randomUsers(10),
    });
  }

  render() {
    return (
        <FlatList
          data={this.state.data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
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
