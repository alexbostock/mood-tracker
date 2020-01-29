import { SAVE_MOOD, Time, Mood } from '../actions/moods';
import reducer from './moods';

describe('moods reducer', () => {
  it('saves mood ratings', () => {
    const date = new Date();
    const time = Time.Night;
    
    let state = reducer(undefined, {
      type: SAVE_MOOD,
      date,
      time,
      mood: Mood.QuiteBad,
    });

    expect(state.get(date.toDateString()).get(time)).toBe(Mood.QuiteBad);

    state = reducer(state, {
      type: SAVE_MOOD,
      date,
      time,
      mood: Mood.QuiteGood,
    });

    expect(state.get(date.toDateString()).get(time)).toBe(Mood.QuiteGood);
  });
})
