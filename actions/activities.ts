export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

interface AddActivityAction {
  type: typeof ADD_ACTIVITY
  activityType: string
  date: Date
}

interface RemoveActivityAction {
  type: typeof REMOVE_ACTIVITY
  activityType: string
  date: Date
}

export type ActivityAction = AddActivityAction | RemoveActivityAction;

export const addActivity = (
  activityType: string,
  date: Date = new Date(),
): ActivityAction => ({
  type: ADD_ACTIVITY,
  activityType,
  date: new Date(date),
});

export const removeActivity = (
  activityType: string,
  date: Date,
): ActivityAction => ({
  type: REMOVE_ACTIVITY,
  activityType,
  date: new Date(date),
});
