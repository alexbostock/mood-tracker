export enum Mood {
  Bad,
  QuiteBad,
  Neutral,
  QuiteGood,
  Good,
}

export enum Time {
  Morning = 'MORNING',
  Night = 'NIGHT',
}

export const SAVE_MOOD = 'SAVE_MOOD';

interface SaveMoodAction {
  type: typeof SAVE_MOOD
  date: Date
  time: Time
  mood: Mood
}

export type MoodAction = SaveMoodAction;

export const saveMood = (
  mood: Mood,
  date: Date = new Date(),
  time: Time,
): MoodAction => ({
  type: SAVE_MOOD,
  date: new Date(date),
  time,
  mood,
});
