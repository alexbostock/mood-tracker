import { ADD_ACTIVITY, REMOVE_ACTIVITY } from '../actions/activities';
import reducer from './knownActivities';

describe('known activities reducer', () => {
  const selector = state => new Set(state.keys());
  const date = new Date();
  it('stores known activities', () => {
    let state = reducer(undefined, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Exercise',
    });

    expect(selector(state).size).toBe(1);
    expect(selector(state).has('Exercise')).toBe(true);

    state = reducer(state, {
      type: ADD_ACTIVITY,
      date,
      activityType: 'Good meal',
    });

    expect(selector(state).size).toBe(2);
    expect(selector(state).has('Exercise')).toBe(true);
    expect(selector(state).has('Good meal')).toBe(true);
  });

  it('removes unused activities', () => {
    const activities = ['Work', 'Exercise', 'Work'];
    let state = undefined;
    for (const activity of activities) {
      state = reducer(state, {
        type: ADD_ACTIVITY,
        date,
        activityType: activity,
      });
    }

    state = reducer(state, {
      type: REMOVE_ACTIVITY,
      date,
      activityType: 'Work',
    });

    expect(selector(state).size).toBe(2);

    state = reducer(state, {
      type: REMOVE_ACTIVITY,
      date,
      activityType: 'Work',
    });

    expect(selector(state).size).toBe(1);
    expect(selector(state).has('Exercise')).toBe(true);

    state = reducer(state, {
      type: REMOVE_ACTIVITY,
      date,
      activityType: 'Exercise',
    });

    expect(selector(state).size).toBe(0);
  });
});
