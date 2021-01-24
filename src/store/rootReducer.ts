import { combineReducers } from 'redux';
import reducer from './reducer';
import optReducer from './optReducer';

const rootReducer = combineReducers({
  main: reducer,
  opt: optReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;