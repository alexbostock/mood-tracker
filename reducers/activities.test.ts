import { ADD_ACTIVITY } from '../actions/activities';
import reducer from './activities';

describe('activities reducer', () => {
  it('saves activities', () => {
    const date = new Date();

    let state = reducer(undefined, {
      type: ADD_ACTIVITY,
      date: date,
      activityType: 'Exercise',
    });

    expect(state.size).toBe(1);

    let set = state.get(date.toDateString());
    expect(set.size).toBe(1);
    expect(set.has('Exercise')).toBe(true);

    state = reducer(state, {
      type: ADD_ACTIVITY,
      date: date,
      activityType: 'Good sleep',
    });

    expect(state.size).toBe(1);

    set = state.get(date.toDateString());
    expect(set.size).toBe(2);
    expect(set.has('Exercise')).toBe(true);
    expect(set.has('Good sleep')).toBe(true);
  });
});
