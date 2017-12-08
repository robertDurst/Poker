import { combineReducers } from 'redux';

import rootReducer from './rootReducer';
import currentGameReducer from './currentGameReducer';
import socketReducer from './socketReducer';

const indexReducer = combineReducers({
  gameState: currentGameReducer,
  socket: socketReducer,
  rootReducer
});

export default indexReducer;
