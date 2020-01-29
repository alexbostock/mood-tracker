import { combineReducers } from 'redux';

import activities from './activities';
import moods from './moods';

const rootReducer = combineReducers({
  activities,
  moods
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
