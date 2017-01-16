import { createStore, combineReducers } from 'redux';

import navigation from '../src/reducer';

const reducers = combineReducers({
  navigation
});

export default createStore(reducers);
