import produce from 'immer';

import {ActivityAction, ADD_ACTIVITY, REMOVE_ACTIVITY } from '../actions/activities';

// We want to suggest activities, especially ones previously used by the user.
// Each activity has a reference count, so that no longer used activities are
// no longer suggested (removed when reference count reaches 0).


// activity -> reference count
export type KnownActivitiesStore = Map<string, number>;

function knownActivities(state: KnownActivitiesStore = new Map(), action: ActivityAction) {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_ACTIVITY: {
        const count = (draft.get(action.activityType) || 0) + 1;
        draft.set(action.activityType, count);
        
        return draft;
      }
      case REMOVE_ACTIVITY: {
        const count = draft.get(action.activityType) - 1;
        if (count === 0) {
          draft.delete(action.activityType);
        } else {
          draft.set(action.activityType, count);
        }

        return draft;
      }
    }
  });
}

export default knownActivities;
