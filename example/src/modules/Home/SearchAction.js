/* @flow */
export const SEARCH = 'SEARCH'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_CANCELLED = 'SEARCH_CANCELLED'
export const SEARCH_REJECTED = 'SEARCH_REJECTED'

const initialState = {
  query: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {...state, query: action.payload}
    case SEARCH_SUCCESS:
      return {...state, payload: action.payload}
    case SEARCH_CANCELLED:
      return state
    case SEARCH_REJECTED:
      console.error(action)
      return { ...state, payload: action.payload, error: action.error }  
    default:
      return state
  }
}

export const search = (query) => ({
  type: SEARCH,
  payload: query
})

export const searchFulfilled = (payload) => ({
  type: SEARCH_SUCCESS,
  payload
})
