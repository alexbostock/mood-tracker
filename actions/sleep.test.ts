import { SAVE_SLEEP_RATING, saveSleepRating } from './sleep';
import { Rating } from '../store/types';

describe('sleep actions', () => {
  it('creates save mood actions', () => {
    const date = new Date();
    const rating = Rating.QuiteGood;

    const action = saveSleepRating(rating, date);
    const expectedAction = {
      type: SAVE_SLEEP_RATING,
      date,
      rating,
    }

    expect(action).toStrictEqual(expectedAction);
  });
});
