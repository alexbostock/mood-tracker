import { combineReducers } from 'redux';

import activities from './activities';
import knownActivities from './knownActivities';
import meds from './meds';
import moods from './moods';
import notifications from './notifications';
import sleep from './sleep';

const rootReducer = combineReducers({
  activities,
  knownActivities,
  meds,
  moods,
  notifications,
  sleep,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
