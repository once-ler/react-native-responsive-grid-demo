/* @flow */
import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import shouldUpdate from 'recompose/shouldUpdate'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import {bindActionCreators} from 'redux'
import { Cell, Section, TableView } from 'react-native-tableview-simple'
import {ScrollView, StyleSheet, TextInput, Text} from 'react-native'
import { ENV } from 'react-native-dotenv'
import * as caPatientActions from './CaPatientAction'
import {sampleCaPatient} from './CaPatientInitialState'
import {saveButton, saveButtonDisabled} from '../../components/Form/Buttons'

const connectFunc = connect(
  state => ({
    caPatient: state.caPatient    
  }),
  dispatch => bindActionCreators(caPatientActions, dispatch)
)

const enhanceWithShouldUpdate = shouldUpdate((props, nextProps) => {
  return !!nextProps.caPatient.context
})
//  !!props.classOf && !!props.onSubmit && !!props.passedFields)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.props.onNavigatorEvent.bind(this.props))

    // For production: react-native run-ios --configuration Release
    // Tests
    // console.log(['props', this.props])
    if (ENV === 'development')
      this.props.fetchCaPatientFulfilled(sampleCaPatient)
  }
})

const enhanceWithHandlers = withHandlers({
  onNavigatorEvent:  props => event => {
    console.log('CaTableView', event)
    switch (event.id) {
      case 'didAppear':
        // const {navigator, caPatient: {form: { isDirty }}} = props
        const {navigator, caPatient: { isDirty }} = props
      
        if (isDirty)
          navigator.setButtons({rightButtons: [saveButton]})
        else
          navigator.setButtons({rightButtons: [saveButtonDisabled]})
        
        return
      case 'save':
        // Some epic; if successful, disable button & set isDirty to false
        props.navigator.setButtons({rightButtons: [saveButtonDisabled]})
      default:
        return
    }
  }
})

const Presentation = ({navigator, caPatient}) => {
  
  return !caPatient.context ? null : (
    <ScrollView contentContainerStyle={styles.stage}>
      <TableView>
      <Section header="Name Components">
          {
            // caPatient.form.nameComponents.fields.map((a, id) => (
            caPatient.context.nameComponents.map((a, id) => (
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
            title="Ethnicity"
            accessory="DisclosureIndicator"
            onPress={
              () => navigator.push({
                screen: 'example.CaPatientEthnicity',
                passProps: {passedFields: caPatient.context.ethnicity}
              })
            }
            contentContainerStyle={{ flex: 1 }}
            cellContentView={
              <Text style={{ fontSize: 16, flex: 1 }}>Ethnicity Values</Text>
            }
          />
          <Cell
            cellStyle="Basic"
            title="Race"
            accessory="DisclosureIndicator"
            onPress={
              () => navigator.push({
                screen: 'example.CaPatientDemographics',
                passProps: {passedFields: {...caPatient.form.demographics.fields}}
              })
            }
            contentContainerStyle={{ flex: 1 }}
            cellContentView={
              <Text style={{ fontSize: 16, flex: 1 }}>Race Values</Text>
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
  enhanceWithHandlers,
  enhanceWithLifecycle,
  enhanceWithShouldUpdate
)(Presentation)
