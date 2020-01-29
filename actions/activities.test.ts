import { ADD_ACTIVITY, REMOVE_ACTIVITY } from './activities';
import { addActivity, removeActivity } from './activities';

describe('activities actions', () => {
  it('creates add activity actions', () => {
    const activityType = 'Exercise';
    const date = new Date();
    let action = addActivity(activityType);

    expect(action.type).toBe(ADD_ACTIVITY);
    expect(action.activityType).toBe(activityType);
    expect(action.date.toDateString()).toBe(date.toDateString());

    date.setMonth(10);
    action = addActivity(activityType, date);

    expect(action.type).toBe(ADD_ACTIVITY);
    expect(action.activityType).toBe(activityType);
    expect(action.date.toDateString()).toBe(date.toDateString());
  });

  it('creates remove activity actions', () => {
    const activityType = 'Sleep well';
    const date = new Date();
    const action = removeActivity(activityType, date);

    expect(action.type).toBe(REMOVE_ACTIVITY);
    expect(action.activityType).toBe(activityType);
    expect(action.date.toDateString()).toBe(date.toDateString());
  });
});
