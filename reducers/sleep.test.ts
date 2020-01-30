import { SAVE_SLEEP_RATING } from '../actions/sleep';
import { Rating } from '../store/types';

import reducer from './sleep';

describe('sleep reducer', () => {
  it('saves sleep ratings', () => {
    const date = new Date();
    
    let state = reducer(undefined, {
      type: SAVE_SLEEP_RATING,
      date,
      rating: Rating.QuiteBad,
    });

    expect(state.get(date.toDateString())).toBe(Rating.QuiteBad);

    state = reducer(state, {
      type: SAVE_SLEEP_RATING,
      date,
      rating: Rating.QuiteGood,
    });

    expect(state.get(date.toDateString())).toBe(Rating.QuiteGood);
  });
})
