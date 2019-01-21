/* @flow */
// import t from 'tcomb-form-native'
import t from 'tcomb'

export const { String, Boolean, Number, Date, maybe: Option, struct: Class, list: List, enums: Enumeration, union: Union } = t

export const CaPatientPhoneInfo = Class({
  number: String,
  type: String
})
 
export const CaPatientEmailInfo = Class({
  email: String,
  type: String
})
 
export const CaPatientIdType = Class({
 id: String,
 type: String
})

const PreferredNameType = Enumeration.of([
  'Given', 'Nickname', 'Middlename', 'Derivation', ''
], 'PreferredNameType')

const Gender = Enumeration.of([
  'M', 'F'
], 'Gender')

const Ethnicity = Class({
  code: String,
  text: String 
})

const Race = Class({
  code: String,
  text: String 
})

export const CaPatientNameComponents = Class({
  academic: Option(String),
  firstName: String,
  givenName: Option(String),
  initials: Option(String),
  lastName: String,
  lastNameFromSpouse: Option(String),
  lastNamePrefix: Option(String),
  middleName: Option(String),
  preferredName: Option(String),
  preferredNameType: Option(PreferredNameType),
  spouseLastNameFirst: Option(String),
  spouseLastNamePrefix: Option(String),
  suffix: Option(String),
  title: Option(String)
})

export const CaPatientNameComponentsList = Class({
  list: List(CaPatientNameComponents)
})
 
export const CaPatientAddress = Class({
  city: Option(String),
  country: Option(String),
  county: Option(String),
  district: Option(String),
  email: Option(List(CaPatientEmailInfo)),
  houseNumber: Option(String),
  phoneNumbers: List(CaPatientPhoneInfo),
  postalCode: Option(String),
  state: Option(String),
  street: List(String),
  type: String
})
 
export const CaPatientCareTeamMember = Class({
  ids: List(CaPatientIdType),
  name: String,
  type: String
})
 
export const CaPatientEmergencyContact = Class({
  legalGuardian: Option(String),
  name: String,
  phoneNumbers: List(CaPatientPhoneInfo),
  relation: String
})
 
export const CaPatientEmploymentInformation = Class({
  employerName: String,
  occupation: String,
  phoneNumbers: List(CaPatientPhoneInfo)
})
 
export const CaPatient = Class({
  addresses: Option(List(CaPatientAddress)),
  aliases: Option(List(String)),
  careTeam: Option(List(CaPatientCareTeamMember)),
  confidentialName: Option(String),
  createDate: Option(Date),
  dateOfBirth: Option(Date),
  emergencyContacts: Option(List(CaPatientEmergencyContact)),
  employmentInformation: Option(CaPatientEmploymentInformation),
  ethnicity: Option(List(String)),
  gender: Option(String),
  historicalIds: Option(List(CaPatientIdType)),
  homeDeployment: Option(String),
  id: Option(String),
  ids: Option(List(CaPatientIdType)),
  maritalStatus: Option(String),
  mrn: Option(String),
  name: Option(String),
  nameComponents: Option(List(CaPatientNameComponents)),
  nationalIdentifier: Option(String),
  race: Option(List(String)),
  rank: Option(String),
  status: Option(String)
})
