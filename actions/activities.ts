export const ADD_ACTIVITY = 'ADD_ACTIVITY';

interface AddActivityAction {
  type: typeof ADD_ACTIVITY
  activityType: string
  date: Date
}

export type ActivityAction = AddActivityAction;

export const addActivity = (activityType: string): ActivityAction => ({
  type: ADD_ACTIVITY,
  activityType,
  date: new Date(),
});