import { combineReducers } from 'redux';

import rootReducer from './rootReducer';
import currentGameReducer from './currentGameReducer';
import socketReducer from './socketReducer';

const indexReducer = combineReducers({
  currentGame: currentGameReducer,
  socket: socketReducer,
  rootReducer
});

export default indexReducer;
