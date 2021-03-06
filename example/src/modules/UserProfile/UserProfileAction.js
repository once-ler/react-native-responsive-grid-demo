/* @flow */
import initialState from './UserProfileInitialState'

export const ON_PROFILE_FORM_FIELD_CHANGE = 'ON_PROFILE_FORM_FIELD_CHANGE'
export const FETCH_PROFILE = 'FETCH_PROFILE'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'
export const FETCH_PROFILE_REJECTED = 'FETCH_PROFILE_REJECTED'
export const FETCH_PROFILE_CANCELLED = 'FETCH_PROFILE_CANCELLED'

export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_REJECTED = 'UPDATE_PROFILE_REJECTED'
export const UPDATE_PROFILE_CANCELLED = 'UPDATE_PROFILE_CANCELLED'

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
    case UPDATE_PROFILE:
      return {...state, payload: action.payload, isLoading: true}
    case FETCH_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {...state, payload: action.payload, isLoading: false}
    case FETCH_PROFILE_CANCELLED:
    case UPDATE_PROFILE_CANCELLED:
      return { ...state, isLoading: false }
    case FETCH_PROFILE_REJECTED:
    case UPDATE_PROFILE_REJECTED:
      return { ...state, payload: action.payload, error: action.error, isLoading: false }
    case ON_PROFILE_FORM_FIELD_CHANGE: {
      const nextForm = { form: { fields: { ...action.payload }, isValid: true, isLoading: false } }
      return { ...state, ...nextForm }
    }
    default:
      return state

  }
}

export const fetchProfile = () => {
  // ???
}

export const updateProfile =() => {
  // ???
}

export const fetchProfileFulfilled = (payload) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload
})

export const updateProfileFulfilled = (payload) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload
})

export const onProfileFormFieldChange = (payload) => ({
  type: ON_PROFILE_FORM_FIELD_CHANGE,
  payload
})
