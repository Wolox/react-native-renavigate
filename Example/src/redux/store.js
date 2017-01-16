import { createStore, combineReducers } from 'redux';
import { reducer as navigation } from 'react-native-renavigate';

const reducers = combineReducers({
  navigation
});

export default createStore(reducers);
