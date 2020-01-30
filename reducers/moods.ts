import produce from 'immer';

import { MoodAction, SAVE_MOOD } from '../actions/moods';
import { Rating, Time } from '../store/types';

// date -> morning / night -> mood rating (1 - 5)
export type MoodsStore = Map<string, Map<Time, Rating>>;

function moods(state: MoodsStore = new Map(), action: MoodAction) {
  return produce(state, draft => {
    switch (action.type) {
      case SAVE_MOOD: {
        const date = action.date.toDateString();
        const map = draft.get(date) || new Map();
        draft.set(date, map);

        map.set(action.time, action.mood);

        return draft;
      }
    }
  });
}

export default moods;
