import { ADD_ACTIVITY, addActivity } from './activities';

describe('activities actions', () => {
  it('creates add activity actions', () => {
    const activityType = "Exercise";
    const action = addActivity(activityType);

    expect(action.type).toBe(ADD_ACTIVITY);
    expect(action.activityType).toBe(activityType);
    expect(action.date.toDateString()).toBe(new Date().toDateString());
  });
});
