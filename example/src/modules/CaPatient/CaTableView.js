import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import {ScrollView, StyleSheet, TextInput, Text} from 'react-native'
import * as caPatientActions from './CaPatientAction'

const connectFunc = connect(
  state => ({
    caPatient: state.caPatient    
  }),
  dispatch => bindActionCreators(caPatientActions, dispatch)
)

const Presentation = ({navigator, caPatient}) => {

  return (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView>
      <Section header="Name Components">
          {
            caPatient.form.nameComponents.fields.map((a, id) => (
              <Cell
                key={Math.random()}
                cellStyle="Basic"
                title={a.firstName}
                accessory="DisclosureIndicator"
                onPress={
                  () => navigator.push({
                    screen: 'example.CaPatientNameComponents',
                    passProps: {passedFields: {...a, id}}
                  })
                }
                contentContainerStyle={{ flex: 1 }}
                cellContentView={
                  <Text style={{ fontSize: 16, flex: 1 }}>{a.firstName} {a.lastName}</Text>
                }
              />
            ))          
          }
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
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
  },
})

export default compose(
  connectFunc,
)(Presentation)
