import { Notifications } from "expo";

import { RootState } from "../reducers";
import { NotificationRecord } from '../reducers/notifications';
import { ClockTime, Time } from "../store/types";

import {
  NotificationAction,
  setNotificationId,
  cancelNotification,
  SET_NOTIFICATION_TIME,
  TOGGLE_NOTIFICATION,
} from './notifications';

const morningContent = {
  title: 'How did you sleep?',
  body: 'Make a note of how you feel',
}

const nightContent = {
  title: 'What did you do today?',
  body: 'Make a note of how you feel',
}

function unsetNotification(
  notification: Time,
  config: NotificationRecord,
  dispatch: (action: NotificationAction) => void,
) {
  if (config.notificationId) {
    Notifications.cancelScheduledNotificationAsync(config.notificationId);
  }

  dispatch(cancelNotification(notification));
}

function setNotification(
  notification: Time,
  time: ClockTime,
  config: NotificationRecord,
  dispatch: (action: NotificationAction) => void,
) {
  unsetNotification(
    notification,
    config,
    dispatch,
  );

  const content = notification === Time.Morning ? morningContent : nightContent;

  const date = new Date();
  date.setHours(time.hours);
  date.setMinutes(time.minutes)

  // Make sure the time is in the future
  if (date < new Date()) {
    date.setDate(date.getDate() + 1);
  }

  const notificationTime = date.getTime();

  Notifications.scheduleLocalNotificationAsync(
    content,
    { time: notificationTime, repeat: 'day' },
  )
  .then((id: number) => dispatch(setNotificationId(notification, id)))
  .catch(console.warn);
}

export function setNotificationTime(notification: Time, time: ClockTime) {
  return (dispatch: (action: NotificationAction) => void, getState: () => RootState) => {
    const morning = notification === Time.Morning;
    setNotification(
      notification,
      time,
      morning ? getState().notifications.morning : getState().notifications.night,
      dispatch,
    );

    dispatch({
      type: SET_NOTIFICATION_TIME,
      notification,
      time,
    });
  }
}

export function toggleNotification(notification: Time) {
  return (dispatch: (action: NotificationAction) => void, getState: () => RootState) => {
    const state = getState().notifications;
    const config = notification === Time.Morning ? state.morning : state.night;

    if (config.enabled) {
      unsetNotification(
        notification,
        config,
        dispatch,
      );
    } else {
      setNotification(notification, config.time, config, dispatch);
    }

    dispatch({
      type: TOGGLE_NOTIFICATION,
      notification,
    });
  }
}
