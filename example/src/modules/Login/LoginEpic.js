import * as userActions from './LoginAction'

const {LOGIN_USER, LOGIN_USER_CANCELLED, LOGIN_USER_REJECTED, loginUserFulfilled} = userActions

export default action$ => {
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
