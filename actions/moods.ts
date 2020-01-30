import { Rating, Time } from '../store/types';

export const SAVE_MOOD = 'SAVE_MOOD';

interface SaveMoodAction {
  type: typeof SAVE_MOOD
  date: Date
  time: Time
  mood: Rating
}

export type MoodAction = SaveMoodAction;

export const saveMood = (
  mood: Rating,
  date: Date = new Date(),
  time: Time,
): MoodAction => ({
  type: SAVE_MOOD,
  date: new Date(date),
  time,
  mood,
});
