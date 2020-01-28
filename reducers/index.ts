import { combineReducers } from 'redux';

import activities from './activities';

const rootReducer = combineReducers({
  activities,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;