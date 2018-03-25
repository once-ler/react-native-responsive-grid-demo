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
import '../rxjsOperators'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'

export const loginEpic = action$ =>
  action$.ofType(LOGIN_USER)
    .mergeMap(action =>
      ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${action.payload}`)
        .map(d => loginUserFulfilled(d.response))
        .takeUntil(action$.ofType(LOGIN_USER_CANCELLED))
        .catch(error => Observable.of({
          type: LOGIN_USER_REJECTED,
          payload: error,
          error: true
        }))
    )

// Switch to tab base screen after successful login.
export const loginSuccessEpic = action$ =>
  action$.ofType(LOGIN_USER_SUCCESS)
    .mapTo(changeAppRoot(ROOT_AFTER_LOGIN))
