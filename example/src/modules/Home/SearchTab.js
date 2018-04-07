import React, { PureComponent } from 'react';
import {View} from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { SearchBar } from 'react-native-elements'

export default class SearchExample extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: ''  
    }
  }

  render() {
    return (
      <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input 
                autoCapitalize="none"
                placeholder="Search"
                value={this.state.query}
                onChangeText={query => {this.setState({query}); setTimeout(() => console.log(this.state.query), 100); }} 
                ref={ (c) => this.inputEl = c }  
              />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Clear</Text>
            </Button>
          </Header>
        </Container>
    )
  }
}
