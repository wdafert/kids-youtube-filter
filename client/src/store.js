import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as actionCreators from './actions/types'
const initialState = {

};

const middleware = [thunk];

// enabling trace for chrome redux dev tools
const composeEnhancers = composeWithDevTools({
    actionCreators,
    trace: true,
    traceLimit: 25,
})

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)));

export default store;

// thunk
/* Redux Thunk middleware allows you to write action creators that return
 a function instead of an action.
 The thunk can be used to delay the dispatch of an action,
 or to dispatch only if a certain condition is met.
 The inner function receives the store methods dispatch and
  getState as parameters.
  Example:
  */