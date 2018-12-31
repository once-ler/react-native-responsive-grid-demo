/* @flow */
import {FETCH_SUGGEST, FETCH_SUGGEST_CANCELLED, FETCH_SUGGEST_REJECTED, fetchSuggestSuccess} from './SuggestAction'
import { ajax } from 'rxjs/ajax'
import {of, from} from 'rxjs'
import {map, catchError, mergeMap, takeUntil} from 'rxjs/operators'
import { ofType } from 'redux-observable'

export const fetchSuggestEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SUGGEST),
    mergeMap(action => {
        const src = typeof action.promise !== 'undefined' ? from(action.promise) : ajax(action.url)
        // Could be rx AjaxResponse or xhr Response
        return src.pipe(
          map(d => fetchSuggestSuccess(d.hasOwnProperty('response') ? d.response : d)),
          takeUntil(action$.pipe(ofType(FETCH_SUGGEST_CANCELLED))),
          catchError(error => of({
            type: FETCH_SUGGEST_REJECTED,
            payload: error,
            error: true
          }))
        )
      }
    )
  )

/* 
// can also check d.xhr.responseHeaders
export const fetchSuggesEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SUGGEST),
    mergeMap(action =>
      ajax(action.url).pipe(
        map(d => { console.log(d.xhr.responseHeaders); return fetchSuggestSuccess(d.response); }),
        takeUntil(action$.pipe(ofType(FETCH_SUGGEST_CANCELLED))),
        catchError(error => of({
          type: FETCH_SUGGEST_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
      )
    )
  )
*/
