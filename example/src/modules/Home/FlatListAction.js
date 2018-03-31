/* @flow */
export const LIST_FETCH = 'LIST_FETCH'
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS'
export const LIST_FETCH_REACHED_END = 'LIST_FETCH_REACHED_END'
export const LIST_FETCH_CANCELLED = 'LIST_FETCH_CANCELLED'
export const LIST_FETCH_REJECTED = 'LIST_FETCH_REJECTED'

const initialState = {
  refreshing: false,
  filter: {},
  payload: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LIST_FETCH:
      return {...state, filter: action.filter, refreshing: true}
    case LIST_FETCH_SUCCESS:
      const payload = state.payload.concat(action.payload)
      return {...state, payload, refreshing: false}
    case LIST_FETCH_REACHED_END:
      return state
    case LIST_FETCH_CANCELLED:
      return {...state, refreshing: false}
    case LIST_FETCH_REJECTED:
      return { ...state, error: action.error, refreshing: false }  
    default:
      return state
  }
}

export const listFetch = (filter) => ({
  type: LIST_FETCH,
  filter
})

export const listFetchFullfilled = (payload) => ({
  type: LIST_FETCH_SUCCESS,
  payload
})

export const listFetchReachedEnd = () => ({
  type: LIST_FETCH_REACHED_END
})
