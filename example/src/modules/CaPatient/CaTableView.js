import React, { Component } from 'react'
import { Cell, Section, TableView } from 'react-native-tableview-simple'

const Presentation = () => (
  <ScrollView contentContainerStyle={styles.stage}>
    <TableView>
    <Section header="Name Components">
        <Cell
          cellStyle="Basic"
          title="Name Components"
          accessory="DisclosureIndicator"
          onPress={() => console.log('Heyho!')}
          contentContainerStyle={{ flex: 1 }}
          cellContentView={
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="TextInput"
            />
          }
        />
      </Section>
      <Section header="Demographics">
        <Cell
          cellStyle="Basic"
          title="Demographics"
          accessory="DisclosureIndicator"
          onPress={() => console.log('Heyho!')}
          contentContainerStyle={{ flex: 1 }}
          cellContentView={
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="TextInput"
            />
          }
        />
      </Section>
      <Section header="Addresses">
        <Cell
          cellStyle="Basic"
          title="Addresses"
          accessory="DisclosureIndicator"
          onPress={() => console.log('Heyho!')}
          contentContainerStyle={{ flex: 1 }}
          cellContentView={
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="TextInput"
            />
          }
        />
      </Section>
      <Section header="Emergency Contacts">
        <Cell
          cellStyle="Basic"
          title="Emergency Contacts"
          accessory="DisclosureIndicator"
          onPress={() => console.log('Heyho!')}
          contentContainerStyle={{ flex: 1 }}
          cellContentView={
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="TextInput"
            />
          }
        />
      </Section>
      <Section header="Employment Information">
        <Cell
          cellStyle="Basic"
          title="Employment Information"
          accessory="DisclosureIndicator"
          onPress={() => console.log('Heyho!')}
          contentContainerStyle={{ flex: 1 }}
          cellContentView={
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              placeholder="TextInput"
            />
          }
        />
      </Section>
    </TableView>
  </ScrollView>
)

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
})
