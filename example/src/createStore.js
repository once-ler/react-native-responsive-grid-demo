/* @flow */
/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import reducer from './modules/reducer'
import rootEpic from './modules/epic'
import {registerScreens} from './screens'

export default function createStore(data = {}) {
  // redux related book keeping
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const middleware = [createMiddleware(), epicMiddleware]
  const finalReducer = combineReducers({ ...reducer })

  const finalCreateStore = applyMiddleware(...middleware)(_createStore)
  const store = finalCreateStore(finalReducer, data)

  // screen related book keeping
  registerScreens(store, Provider)

  return store;
}
