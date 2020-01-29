import { ADD_ACTIVITY, REMOVE_ACTIVITY } from '../actions/activities';
import reducer from './activities';

describe('activities reducer', () => {
  it('saves activities', () => {
    const date = new Date();

    let state = reducer(undefined, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Exercise',
    });

    expect(state.size).toBe(1);

    let set = state.get(date.toDateString());
    expect(set.size).toBe(1);
    expect(set.has('Exercise')).toBe(true);

    state = reducer(state, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Good sleep',
    });

    expect(state.size).toBe(1);

    set = state.get(date.toDateString());
    expect(set.size).toBe(2);
    expect(set.has('Exercise')).toBe(true);
    expect(set.has('Good sleep')).toBe(true);

    const newDate = new Date(date);
    newDate.setDate(date.getDate() === 1 ? 30 : date.getDate() - 1);

    const newState = reducer(state, {
      type: ADD_ACTIVITY,
      date: newDate,
      activityType: 'Pet doge',
    });

    expect(newState.get(date.toDateString())).toBe(set);
    expect(state.get(newDate.toDateString())).toBe(undefined);

    set = newState.get(newDate.toDateString());
    expect(set.size).toBe(1);
    expect(set.has('Pet doge')).toBe(true);
  });

  it('removes activities', () => {
    const date = new Date();

    let state = reducer(undefined, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Exercise',
    });

    state = reducer(state, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Good sleep',
    });

    state = reducer(state, {
      type: REMOVE_ACTIVITY,
      date,
      activityType: 'Non-existent activity',
    })

    let set = state.get(date.toDateString());
    expect(set.size).toBe(2);
    expect(set.has('Exercise')).toBe(true);
    expect(set.has('Good sleep')).toBe(true);

    state = reducer(state, {
      type: REMOVE_ACTIVITY,
      date,
      activityType: 'Good sleep',
    });

    set = state.get(date.toDateString());
    expect(set.size).toBe(1);
    expect(set.has('Exercise')).toBe(true);
  });
});
