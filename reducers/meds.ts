import produce from 'immer';

import { MedsAction, ADD_MEDS_REMINDER, EDIT_MEDS_REMINDER, REMOVE_MEDS_REMINDER, UPDATE_MEDS_TAKEN } from '../actions/meds';
import { MedsRecord } from '../store/types';

export type MedsStore = Map<string, {
  conf: MedsRecord
  // taken: set of dates (Date.toDateString) when these meds have been taken
  taken: Set<string>
}>

function meds(state: MedsStore = new Map(), action: MedsAction) {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_MEDS_REMINDER: {
        const conf = action.record;
        draft.set(conf.name, {
          conf,
          taken: new Set(),
        });

        return draft;
      }
      case EDIT_MEDS_REMINDER: {
        const data = draft.get(action.currentName);
        if (!data) {
          return draft;
        }

        data.conf.name = action.changes.name || data.conf.name;
        data.conf.time = action.changes.time || data.conf.time;

        draft.set(data.conf.name, data);
        if (action.currentName !== data.conf.name) {
          draft.delete(action.currentName);
        }

        return draft;
      }
      case REMOVE_MEDS_REMINDER: {
        draft.delete(action.name);

        return draft;
      }
      case UPDATE_MEDS_TAKEN: {
        const set = draft.get(action.name).taken;
        if (action.taken) {
          set.add(action.date.toDateString());
        } else {
          set.delete(action.date.toDateString());
        }

        return draft;
      }
    }
  });
}

export default meds;
