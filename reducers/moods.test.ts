import { SAVE_MOOD } from '../actions/moods';
import { Rating, Time } from '../store/types';

import reducer from './moods';

describe('moods reducer', () => {
  it('saves mood ratings', () => {
    const date = new Date();
    const time = Time.Night;
    
    let state = reducer(undefined, {
      type: SAVE_MOOD,
      date,
      time,
      mood: Rating.QuiteBad,
    });

    expect(state.get(date.toDateString()).get(time)).toBe(Rating.QuiteBad);

    state = reducer(state, {
      type: SAVE_MOOD,
      date,
      time,
      mood: Rating.QuiteGood,
    });

    expect(state.get(date.toDateString()).get(time)).toBe(Rating.QuiteGood);
  });
})
