export const ROOT_CHANGED = 'ROOT_CHANGED'
export const ROOT_LOGIN = 'login'
export const ROOT_AFTER_LOGIN = 'after-login'

const initialState = {
  root: undefined  
}

export default (state = initialState, action = {}) => {
  switch (action.type) {    
    case ROOT_CHANGED:
      return { ...state, root: action.root}
    default:
      return state
  }
}

export const changeAppRoot = (root) => ({
  type: ROOT_CHANGED, 
  root: root
})
