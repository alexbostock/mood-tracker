import { combineReducers } from 'redux';

import activities from './activities';
import knownActivities from './knownActivities';
import moods from './moods';

const rootReducer = combineReducers({
  activities,
  knownActivities,
  moods,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
