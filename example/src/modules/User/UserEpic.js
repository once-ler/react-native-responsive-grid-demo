import mergeMap from 'rxjs'
import {FETCH_USER, FETCH_USER_CANCELLED, FETCH_USER_REJECTED, fetchUserFulfilled} from './UserAction'
import '../rxjsOperators'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'

export const userEpic = action$ =>
  action$.ofType(FETCH_USER)
    .mergeMap(action => 
      ajax.getJSON(`https://jsonplaceholder.typicode.com/users/${action.payload}`)
        .map(d => fetchUserFulfilled(d.response)
        .takeUntil(action$.ofType(FETCH_USER_CANCELLED))
        .catch(error => Observable.of({
          type: FETCH_USER_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
      )
    )

// reference: https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/doc/operators/ajax.md

/*
fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
*/
