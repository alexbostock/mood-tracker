import produce from 'immer';

import { SleepAction, SAVE_SLEEP_RATING } from '../actions/sleep';
import { Rating } from '../store/types';

// date -> sleep rating
// (where date is the day After the sleep)
export type SleepStore = Map<string, Rating>;

function sleep(state: SleepStore = new Map(), action: SleepAction) {
  return produce(state, draft => {
    switch(action.type) {
      case SAVE_SLEEP_RATING: {
        const date = action.date.toDateString();
        draft.set(date, action.rating);

        return draft;
      }
    }
  })
}

export default sleep;
