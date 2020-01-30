import { Rating } from '../store/types';

export const SAVE_SLEEP_RATING = 'SAVE_SLEEP_RATING';

// Represents rating of sleep the previous night.
// eg. any Date on 2020-01-30 => this is a rating of the night 29th / 30th
interface SaveSleepAction {
  type: typeof SAVE_SLEEP_RATING
  date: Date
  rating: Rating
}

export type SleepAction = SaveSleepAction;

export const saveSleepRating = (
  rating: Rating,
  date: Date = new Date(),
): SleepAction => ({
  type: SAVE_SLEEP_RATING,
  date,
  rating,
});
