import { SAVE_MOOD } from '../actions/moods';
import { Rating, Time } from '../store/types';

import reducer from './moods';

describe('moods reducer', () => {
  it('saves mood ratings', () => {
    const date = new Date();
    
    let state = reducer(undefined, {
      type: SAVE_MOOD,
      date,
      time: Time.Night,
      mood: Rating.QuiteBad,
    });

    expect(state.get(date.toDateString()).night).toBe(Rating.QuiteBad);

    state = reducer(state, {
      type: SAVE_MOOD,
      date,
      time: Time.Night,
      mood: Rating.QuiteGood,
    });

    expect(state.get(date.toDateString()).morning).toBe(null);
    expect(state.get(date.toDateString()).night).toBe(Rating.QuiteGood);

    state = reducer(state, {
      type: SAVE_MOOD,
      date, time: Time.Morning,
      mood: Rating.Neutral,
    });

    expect(state.get(date.toDateString()).morning).toBe(Rating.Neutral);
    expect(state.get(date.toDateString()).night).toBe(Rating.QuiteGood);
  });
})
