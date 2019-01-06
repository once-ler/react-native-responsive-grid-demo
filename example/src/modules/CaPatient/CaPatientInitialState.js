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
