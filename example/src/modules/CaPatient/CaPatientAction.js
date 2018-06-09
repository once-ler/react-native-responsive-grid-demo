/* @flow */
import initialState from './CaPatientInitialState'

export const ON_CA_PATIENT_FORM_FIELD_CHANGE = 'ON_CA_PATIENT_FORM_FIELD_CHANGE'
export const FETCH_CA_PATIENT = 'FETCH_CA_PATIENT'
export const FETCH_CA_PATIENT_SUCCESS = 'FETCH_CA_PATIENT_SUCCESS'
export const FETCH_CA_PATIENT_REJECTED = 'FETCH_CA_PATIENT_REJECTED'
export const FETCH_CA_PATIENT_CANCELLED = 'FETCH_CA_PATIENT_CANCELLED'

export const UPDATE_CA_PATIENT = 'UPDATE_CA_PATIENT'
export const UPDATE_CA_PATIENT_SUCCESS = 'UPDATE_CA_PATIENT_SUCCESS'
export const UPDATE_CA_PATIENT_REJECTED = 'UPDATE_CA_PATIENT_REJECTED'
export const UPDATE_CA_PATIENT_CANCELLED = 'UPDATE_CA_PATIENT_CANCELLED'

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CA_PATIENT:
    case UPDATE_CA_PATIENT:
      return {...state, payload: action.payload, isLoading: true}
    case FETCH_CA_PATIENT_SUCCESS:
    case UPDATE_CA_PATIENT_SUCCESS:
      return {...state, payload: action.payload, isLoading: false}
    case FETCH_CA_PATIENT_CANCELLED:
    case UPDATE_CA_PATIENT_CANCELLED:
      return { ...state, isLoading: false }
    case FETCH_CA_PATIENT_REJECTED:
    case UPDATE_CA_PATIENT_REJECTED:
      return { ...state, payload: action.payload, error: action.error, isLoading: false }
    case ON_CA_PATIENT_FORM_FIELD_CHANGE: {
      // const nextSubcomponent = { fields: { ...action.payload }, isValid: true, isLoading: false }
      // const nextNameComponents = { nameComponents: nextSubcomponent }
      // const form = { ...state.form, ...nextNameComponents }
        
      switch (action.subComponent) {
        case 'nameComponents':
          const fields = state.form.nameComponents.fields.map((item, id) => {
            if (id === action.payload.id) {
              return {...item, ...action.payload}
            }
            return item
          })

          const nameComponents = { ...state.form.nameComponents, fields }
          const form = {...state.form, nameComponents, isDirty: true}
          
          return { form }
        default:
          return state
      }      
    }
    default:
      return state

  }
}

export const fetchCaPatient = () => {
  // ???
}

export const updateCaPatient =() => {
  // ???
}

export const fetchCaPatientFulfilled = (payload) => ({
  type: FETCH_CA_PATIENT_SUCCESS,
  payload
})

export const updateCaPatientFulfilled = (payload) => ({
  type: UPDATE_CA_PATIENT_SUCCESS,
  payload
})

export const onCaPatientFormFieldChange = (subComponent, payload) => ({
  type: ON_CA_PATIENT_FORM_FIELD_CHANGE,
  subComponent,
  payload
})
