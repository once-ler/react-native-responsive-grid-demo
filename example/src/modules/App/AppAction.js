export const ROOT_CHANGED = 'ROOT_CHANGED'

export const changeAppRoot = (root) => {
  return {
    type: ROOT_CHANGED, 
    root: root
  };
}

/*
dispatch the actionCreators 
*/

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('login'));
  };
}