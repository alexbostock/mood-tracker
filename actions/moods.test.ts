import { SAVE_MOOD, saveMood, Mood, Time } from './moods';

describe('moods actions', () => {
  it('creates save mood actions', () => {
    const date = new Date();
    const time = Time.Morning;
    const mood = Mood.Good;

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
