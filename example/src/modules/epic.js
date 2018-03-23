/* @flow */
/* eslint no-unused-vars:0 */
import { combineEpics } from 'redux-observable';
import {loginEpic} from './Login/LoginEpic';
import {userEpic} from './User/UserEpic';

export default combineEpics(
  loginEpic,
  userEpic
);
