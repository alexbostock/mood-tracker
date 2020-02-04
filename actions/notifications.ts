import { Time } from "../store/types";
import notifications from "../reducers/notifications";

export const SET_NOTIFICATION_TIME = 'SET_NOTIFICATION_TIME';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const SET_NOTIFICATION_ID = 'SET_NOTIFICATION_ID';
export const CANCEL_NOTIFICATION = 'CANCEL_NOTIFICATION';

interface SetNotificationTimeAction {
  type: typeof SET_NOTIFICATION_TIME
  notification: Time
  time: number
}

interface ToggleNotificationAction {
  type: typeof TOGGLE_NOTIFICATION
  notification: Time
}

interface SetIdAction {
  type: typeof SET_NOTIFICATION_ID
  notification: Time
  id: number
}

interface CancelNotificationAction {
  type: typeof CANCEL_NOTIFICATION
  notification: Time
}

export type NotificationAction =
  | SetNotificationTimeAction
  | ToggleNotificationAction
  | SetIdAction
  | CancelNotificationAction;

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

export const setNotificationId = (
  notification: Time,
  id: number,
): NotificationAction => ({
  type: SET_NOTIFICATION_ID,
  notification,
  id,
});

export const cancelNotification = (
  notification: Time,
): NotificationAction => ({
  type: CANCEL_NOTIFICATION,
  notification,
});
