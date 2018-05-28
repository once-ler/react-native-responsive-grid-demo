import {FETCH_PROFILE, FETCH_PROFILE_CANCELLED, FETCH_PROFILE_REJECTED, fetchProfileFulfilled} from './UserProfileAction'
import { ajax } from 'rxjs/ajax'
import {of} from 'rxjs'
import {map, catchError, mergeMap, takeUntil} from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const userProfileEpic = action$ =>
  action$.pipe(
    ofType(FETCH_PROFILE),
    mergeMap(action => 
      ajax(`https://jsonplaceholder.typicode.com/users/${action.payload}`).pipe(
        map(d => fetchProfileFulfilled(d.response)),
        takeUntil(action$.pipe(ofType(FETCH_PROFILE_CANCELLED))),
        catchError(error => Observable.of({
          type: FETCH_PROFILE_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
      )
    )
  )
