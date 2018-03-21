
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, View } from 'native-base'
import AppNavigator from './AppNavigator'
import theme from './themes/base-theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  }
})

export default props =>
  <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
    <Content style={styles.container}>
    <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
    </View>
    </Content>
  </Container>
