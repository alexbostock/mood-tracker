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
}
