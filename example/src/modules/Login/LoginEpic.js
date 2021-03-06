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
import { ajax } from 'rxjs/ajax'
import {of} from 'rxjs'
import {
  map, 
  catchError, 
  switchMap, 
  mergeMap, 
  filter, 
  debounceTime, 
  distinctUntilChanged, 
  takeUntil 
} from 'rxjs/operators'
import { ofType } from 'redux-observable'

/*
export const loginEpic = action$ => 
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action =>
      ajax(`https://jsonplaceholder.typicode.com/users/${action.payload}`).pipe(
        map(d => loginUserFulfilled(d.response)),
        takeUntil(action$.pipe(ofType(LOGIN_USER_CANCELLED))),
        catchError(error => of({
          type: LOGIN_USER_REJECTED,
          payload: error,
          error: true
        }))
      )
    )
  )
*/

export const loginEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action => of(loginUserFulfilled()))
  )

// Switch to tab base screen after successful login.
export const loginSuccessEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER_SUCCESS),
    mergeMap(() => of(changeAppRoot(ROOT_AFTER_LOGIN)))
  )
