/* eslint no-undef: 0, flowtype/no-weak-types: 0, max-len: 0 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'
import reducer from './modules/reducer'
import rootEpic from './modules/epic'
import { createEpicMiddleware } from 'redux-observable'

export default function createStore(data = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const middleware = [createMiddleware(), epicMiddleware]
  const finalReducer = combineReducers({ ...reducer });

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(finalReducer, data);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
    module.hot.accept('./modules/epic', () => {
      epicMiddleware.replaceEpic(require('./modules/epic'));
    })    
  }

  return store;
}
