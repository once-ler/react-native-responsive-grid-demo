/* @flow */
import t from 'tcomb-form-native'
const { String, Boolean, Number, Date, maybe: Option, struct: Class, list: List } = t

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
  preferredNameType: Option(String),
  spouseLastNameFirst: Option(String),
  spouseLastNamePrefix: Option(String),
  suffix: Option(String),
  title: Option(String)
})
 
export const CaPatientAddress = Class({
  city: String,
  country: Option(String),
  county: Option(String),
  district: Option(String),
  email: List(CaPatientEmailInfo),
  houseNumber: Option(String),
  phoneNumbers: List(CaPatientPhoneInfo),
  postalCode: String,
  state: String,
  street: List(String),
  type: Option(String)
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
  addresses: List(CaPatientAddress(),
  aliases: List(String),
  careTeam: List(CaPatientCareTeamMember),
  confidentialName: Option(String),
  createDate: Option(Date),
  dateOfBirth: Date,
  emergencyContacts: List(CaPatientEmergencyContact),
  employmentInformation: Option(CaPatientEmploymentInformation),
  ethnicity: List(String),
  gender: String,
  historicalIds: List(CaPatientIdType),
  homeDeployment: Option(String),
  id: Option(String),
  ids: List(CaPatientIdType),
  maritalStatus: Option(String),
  mrn: Option(String),
  name: Option(String),
  nameComponents: List(CaPatientNameComponents),
  nationalIdentifier: Option(String),
  race: List(String),
  rank: Option(String),
  status: Option(String)
})
