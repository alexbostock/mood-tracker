import produce from 'immer';

import { ActivityAction, ADD_ACTIVITY, REMOVE_ACTIVITY } from '../actions/activities';

export type ActivitiesStore = Map<string, Set<string>>;

function activities(state: ActivitiesStore = new Map(), action: ActivityAction) {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_ACTIVITY: {
        const date = action.date.toDateString();
        const set = draft.get(date) || new Set();
        set.add(action.activityType);
        draft.set(date, set);
        return draft;
      }
      case REMOVE_ACTIVITY: {
        const date = action.date.toDateString();
        const set = draft.get(date);
        if (set) {
          set.delete(action.activityType);
        }
        return draft;
      }
    }
  });
}

export default activities;
