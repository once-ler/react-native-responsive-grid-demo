/* @flow */
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_CANCELLED = 'FETCH_USER_CANCELLED'
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {...state, payload: action.payload}
    case FETCH_USER_SUCCESS:
      return {...state, payload: action.payload}
    case FETCH_USER_CANCELLED:
      return state
    case FETCH_USER_REJECTED:
      return { ...state, payload: action.payload, error: action.error }  
    default:
      return state
  }
}

export const fetchUserFulfilled = (payload) => ({
  type: FETCH_USER_SUCCESS,
  payload
})
