import { SAVE_MOOD, saveMood } from './moods';
import { Rating, Time } from '../store/types';

describe('moods actions', () => {
  it('creates save mood actions', () => {
    const date = new Date();
    const time = Time.Morning;
    const mood = Rating.Good;

    const action = saveMood(mood, date, time);
    const expectedAction = {
      type: SAVE_MOOD,
      date,
      time,
      mood,
    };

    expect(action).toStrictEqual(expectedAction);
  });
});
