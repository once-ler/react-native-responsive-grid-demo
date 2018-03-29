export const SAVE_APP_ICONS = 'SAVE_APP_ICONS'

const initialState = {
  icons: undefined  
}

export default (state = initialState, action = {}) => {
  switch (action.type) {    
    case SAVE_APP_ICONS:
      return { ...state, icons: action.icons}
    default:
      return state
  }
}

export const saveIcons = (icons) => ({
  type: SAVE_APP_ICONS, 
  icons
})
