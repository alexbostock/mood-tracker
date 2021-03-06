export enum Rating {
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

export class ClockTime {
  hours: number;
  minutes: number;

  constructor(hours: number, minutes: number) {
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new RangeError();
    }

    this.hours = hours;
    this.minutes = minutes;

    Object.freeze(this);
  }
}

export function quantifyTime(time: ClockTime) {
  return time.hours * 100 + time.minutes;
}

export function printTime(time: ClockTime) {
  return leftPad(time.hours) + ':' + leftPad(time.minutes);
}

function leftPad(num) {
  return num < 10 ? '0' + num : num;
}

export interface MedsRecord {
  name: string,
  time: ClockTime,
}

export interface PartialMedsRecord {
  name?: string
  time?: ClockTime
}

export enum Screen {
  DayView,
  Insights,
  Preferences,
}
