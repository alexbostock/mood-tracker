import { Notifications } from "expo";

import { RootState } from "../reducers";
import { ClockTime, Time } from "../store/types";

export const SET_NOTIFICATION_TIME = 'SET_NOTIFICATION_TIME';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const SET_NOTIFICATION_ID = 'SET_NOTIFICATION_ID';
export const CANCEL_NOTIFICATION = 'CANCEL_NOTIFICATION';

interface SetNotificationTimeAction {
  type: typeof SET_NOTIFICATION_TIME
  notification: Time
  time: ClockTime
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

const morningContent = {
  title: 'How did you sleep?',
  body: 'Make a note of how you feel',
}

const nightContent = {
  title: 'What did you do today?',
  body: 'Make a note of how you feel',
}

function unsetNotification(notification: Time) {
  return (dispatch, getState: () => RootState) => {
    const morning = notification === Time.Morning;

    const state = getState().notifications;
    const config = morning ? state.morning : state.night;
    if (config.notificationId) {
      Notifications.cancelScheduledNotificationAsync(config.notificationId);
    }

    dispatch(cancelNotification(notification));
  }
}

function setNotification(notification: Time, time: ClockTime) {
  return (dispatch, getState: () => RootState) => {
    unsetNotification(notification)(dispatch, getState);
    
    const morning = notification === Time.Morning;
    const content = morning ? morningContent : nightContent;

    const date: Date = new Date();
    date.setHours(time.hours);
    date.setMinutes(time.minutes);
    if (date < new Date()) {
      date.setDate(date.getDate() + 1);
    }

    const notificationTime: number = date.getTime();

    Notifications.scheduleLocalNotificationAsync(
      content,
      { time: notificationTime, repeat: 'day' },
    )
    .then((id: number) => dispatch(setNotificationId(notification, id)));
  }
}

export function setNotificationTime(notification: Time, time: ClockTime) {
  return (dispatch, getState: () => RootState) => {
    setNotification(notification, time)(dispatch, getState);

    dispatch({
      type: SET_NOTIFICATION_TIME,
      notification,
      time,
    });
  }
}

export function toggleNotification(notification) {
  return (dispatch, getState: () => RootState) => {
    const state = getState().notifications;
    const config = notification === Time.Morning ? state.morning : state.night;

    if (config.enabled) {
      unsetNotification(notification)(dispatch, getState);
    } else {
      setNotification(notification, config.time)(dispatch, getState);
    }

    dispatch({
      type: TOGGLE_NOTIFICATION,
      notification,
    });
  }
}

const setNotificationId = (
  notification: Time,
  id: number,
): NotificationAction => ({
  type: SET_NOTIFICATION_ID,
  notification,
  id,
});

const cancelNotification = (
  notification: Time,
): NotificationAction => ({
  type: CANCEL_NOTIFICATION,
  notification,
});
