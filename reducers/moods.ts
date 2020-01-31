import produce from 'immer';

import { MoodAction, SAVE_MOOD } from '../actions/moods';
import { Rating, Time } from '../store/types';

export interface MoodRecord {
  morning: Rating,
  night: Rating,
}

// date -> MoodRecord
export type MoodsStore = Map<string, MoodRecord>;

function moods(state: MoodsStore = new Map(), action: MoodAction) {
  return produce(state, draft => {
    switch (action.type) {
      case SAVE_MOOD: {
        const date = action.date.toDateString();
        const record = draft.get(date) || { morning: null, night: null };

        if (action.time === Time.Morning) {
          record.morning = action.mood;
        } else {
          record.night = action.mood;
        }

        draft.set(date, record);

        return draft;
      }
    }
  });
}

export default moods;
