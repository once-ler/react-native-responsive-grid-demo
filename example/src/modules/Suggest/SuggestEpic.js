/* @flow */
import {FETCH_SUGGEST, FETCH_SUGGEST_CANCELLED, FETCH_SUGGEST_REJECTED, fetchSuggestSuccess} from './SuggestAction'
import { ajax } from 'rxjs/ajax'
import {of, from} from 'rxjs'
import {map, catchError, mergeMap, takeUntil} from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const fetchSuggestEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SUGGEST),
    mergeMap(action =>
      from(action.promise).pipe(
      // ajax(action.url).pipe(
        map(d => fetchSuggestSuccess(d)),
        takeUntil(action$.pipe(ofType(FETCH_SUGGEST_CANCELLED))),
        catchError(error => of({
          type: FETCH_SUGGEST_REJECTED,
          payload: error,
          error: true
        }))
      )
    )
  )