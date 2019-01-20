/* @flow */
export default {
  form: {
    original: {},
    disabled: false,
    error: null,
    isValid: false,
    isLoading: false,
    isDirty: false,
    fields: {},
    addresses: {
      original: [],
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: []
    },
    emergencyContacts: {
      original: [],
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: []
    },
    nameComponents: {
      original: [],
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: [{firstName: "Jimmy", lastName: "Jones"}, {firstName: "Harold", lastName: "Harris"}]
    },
    employmentInformation: {
      original: {},
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: {}
    },
    careTeam: {
      original: [],
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: []
    },
    demographics: {
      original: {},
      disabled: false,
      error: null,
      isValid: false,
      isLoading: false,
      fields: { ethnicity: ['ABCD'] }
    }
  }
}

export const sampleCaPatient = 
{
  "addresses": [{
    "city": "Lake Buena Vista",
    "country": "",
    "county": "",
    "district": "",
    "email": [{
      "email": "theMainMouse@disney.com",
      "type": "Home"
    }],
    "houseNumber": "",
    "phoneNumbers": [{
      "number": "(407)939-1289",
      "type": "Home"
    }],
    "postalCode": "32830",
    "state": "FL",
    "street": ["123 Main St."],
    "type": "HOME"
  }],
  "aliases": [],
  "careTeam": [],
  "confidentialName": "",
  "createDate": "2018-10-05 19:49:20.324",
  "dateOfBirth": "1928-11-18",
  "emergencyContacts": [],
  "employmentInformation": {
    "employerName": "",
    "occupation": "",
    "phoneNumbers": []
  },
  "ethnicity": ["N","H"],
  "gender": "M",
  "historicalIds": [],
  "homeDeployment": "",
  "id": "935769",
  "ids": [{
    "id": "935769",
    "type": "MRN"
  }],
  "maritalStatus": "",
  "mrn": "935769",
  "name": "",
  "nameComponents": [{
    "academic": "",
    "firstName": "MICKEY",
    "givenName": "",
    "initials": "",
    "lastName": "MOUSE",
    "lastNameFromSpouse": "",
    "lastNamePrefix": "",
    "middleName": "J",
    "preferredName": "",
    "preferredNameType": "",
    "spouseLastNameFirst": "",
    "spouseLastNamePrefix": "",
    "suffix": "",
    "title": ""
  }],
  "nationalIdentifier": "",
  "race": ["W","B"],
  "rank": "",
  "status": ""
}
