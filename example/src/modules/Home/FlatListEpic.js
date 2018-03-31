import {
  LIST_FETCH,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_CANCELLED,
  LIST_FETCH_REJECTED,
  listFetchFullfilled,
  LIST_FETCH_REACHED_END
} from './FlatListAction'
import '../rxjsOperators'
// import { ajax } from 'rxjs/observable/dom/ajax'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { Observable } from 'rxjs/Observable'
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

export const listFetchEpic = action$ =>
  action$.ofType(LIST_FETCH)
    .mergeMap(action =>
      fromPromise(fakePromise(false))
        .map(d => listFetchFullfilled(d))
        .takeUntil(action$.ofType(LIST_FETCH_CANCELLED))
        .catch(error => Observable.of({
          type: LIST_FETCH_REJECTED,
          payload: error,
          error: true
        }))
    )

export const listFetchReachedEndEpic = action$ =>
  action$.ofType(LIST_FETCH_REACHED_END)
    .mapTo({type:LIST_FETCH})
