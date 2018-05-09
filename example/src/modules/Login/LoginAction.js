/* @flow */
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_CANCELLED = 'LOGIN_USER_CANCELLED'
export const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, payload: action.payload}
    case LOGIN_USER_SUCCESS:
      console.log(action)
      return {...state, payload: action.payload}
    case LOGIN_USER_CANCELLED:
      return state
    case LOGIN_USER_REJECTED:
      console.error(action)
      return { ...state, payload: action.payload, error: action.error }  
    default:
      return state
  }
}

export const login = (id) => ({
  type: LOGIN_USER,
  payload: id
})

export const loginUserFulfilled = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload
})
