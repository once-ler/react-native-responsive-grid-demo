import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_CANCELLED,
  LOGIN_USER_REJECTED,
  loginUserFulfilled
} from './LoginAction'
import {
  ROOT_AFTER_LOGIN,
  changeAppRoot
} from '../App/AppAction'

export const loginEpic = action$ => {
  action$ofType(LOGIN_USER)
    .mergeMap(action => 
      fetch(`https://jsonplaceholder.typicode.com/users/${action.payload}`)
        .map(response => loginUserFulfilled(response.json()))
        .takeUntil(action$.ofType(LOGIN_USER_CANCELLED))
        .catch(error => Observable.of({
          type: LOGIN_USER_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
    )
}

// Switch to tab base screen after successful login.
export const loginSuccessEpic = action$ => {
  action$ofType(LOGIN_USER_SUCCESS)
    .mapTo(changeAppRoot(ROOT_AFTER_LOGIN))
}
