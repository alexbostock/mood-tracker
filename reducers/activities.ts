import produce from 'immer';

import { ADD_ACTIVITY, ActivityAction } from '../actions/activities';

export type ActivitiesStore = {
  [date: string]: Set<string>
};

function activities(state: ActivitiesStore = {}, action: ActivityAction) {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_ACTIVITY:
        const date = action.date.toDateString();
        draft[date] = draft[date] || new Set();
        draft[date].add(action.activityType);
    }
  });
}

export default activities;