import {
  LIST_FETCH,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_CANCELLED,
  LIST_FETCH_REJECTED,
  listFetchFullfilled,
  LIST_FETCH_REACHED_END
} from './FlatListAction'
import {of, fromPromise} from 'rxjs'
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
import faker from 'faker'

let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

const fakePromise = willReject => {
  return new Promise((resolve, reject) => {
    if (willReject || j > 20) {
      reject([])
    }
    resolve(randomUsers(10))
  })
}

export const listFetchEpic = (action$, state$) =>
  action$.pipe(
    ofType(LIST_FETCH),
    mergeMap(action =>
      fromPromise(fakePromise(false)).pipe(
        map(d => listFetchFullfilled(d)),
        takeUntil(action$.pipe(ofType(LIST_FETCH_CANCELLED))),
        catchError(error => of({
          type: LIST_FETCH_REJECTED,
          payload: error,
          error: true
        }))
      )
    )
  )

export const listFetchReachedEndEpic = action$ =>
  action$.pipe(
    ofType(LIST_FETCH_REACHED_END),
    mapTo({type:LIST_FETCH})  
  )
