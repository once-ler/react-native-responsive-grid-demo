/* @flow */
/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import reducer from './modules/reducer'
import rootEpic from './modules/epic'
import registerScreens from './screens'

export default function createStore(data = {}) {
  // redux related book keeping
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const middleware = [epicMiddleware]
  const finalReducer = combineReducers({ ...reducer })

  const finalCreateStore = applyMiddleware(...middleware)(_createStore)
  const store = finalCreateStore(finalReducer, data)

  // screen related book keeping
  registerScreens(store, Provider)

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
    module.hot.accept('./modules/epic', () => {
      epicMiddleware.replaceEpic(require('./modules/epic'))
    })    
  }

  return store;
}
