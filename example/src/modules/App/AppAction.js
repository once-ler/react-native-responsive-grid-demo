export const ROOT_CHANGED = 'ROOT_CHANGED'
export const ROOT_LOGIN = 'login'
export const ROOT_AFTER_LOGIN = 'after-login'

export const changeAppRoot = (root) => ({
  type: ROOT_CHANGED, 
  root: root
})
