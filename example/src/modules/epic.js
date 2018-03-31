/* @flow */
/* eslint no-unused-vars:0 */
import { combineEpics } from 'redux-observable'
import {loginEpic, loginSuccessEpic} from './Login/LoginEpic'
import {userEpic} from './User/UserEpic'
import {listFetchEpic, listFetchReachedEndEpic} from './Home/FlatListEpic'

export default combineEpics(
  loginEpic,
  loginSuccessEpic,
  userEpic,
  listFetchEpic,
  listFetchReachedEndEpic
);
