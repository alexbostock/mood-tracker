import { Time } from "../store/types";

export const SET_NOTIFICATION_TIME = 'SET_NOTIFICATION_TIME';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';

interface SetNotificationTimeAction {
  type: typeof SET_NOTIFICATION_TIME
  notification: Time
  time: number
}

interface ToggleNotificationAction {
  type: typeof TOGGLE_NOTIFICATION
  notification: Time
}

export type NotificationAction =
  | SetNotificationTimeAction
  | ToggleNotificationAction;

const action: NotificationAction = {
  type: TOGGLE_NOTIFICATION,
  notification: Time.Morning,
}

export const setNotificationTime = (
  notification: Time,
  time: number,
): NotificationAction => ({
  type: SET_NOTIFICATION_TIME,
  notification,
  time,
});

export const toggleNotification = (
  notification: Time,
): NotificationAction => ({
  type: TOGGLE_NOTIFICATION,
  notification,
});
