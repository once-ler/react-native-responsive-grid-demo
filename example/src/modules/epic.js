/* eslint no-unused-vars:0 */
import { combineEpics } from 'redux-observable';
import {userEpic} from './App/UserEpic';

export default combineEpics(
  userEpic
);
