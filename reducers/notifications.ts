import produce from 'immer';

import {
  NotificationAction,
  TOGGLE_NOTIFICATION,
  SET_NOTIFICATION_TIME,
  SET_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
} from '../actions/notifications';
import { ClockTime, Time } from '../store/types';

interface NotificationRecord {
  enabled: boolean
  time: ClockTime
  notificationId?: number
}

export interface NotificationsStore {
  morning: NotificationRecord
  night: NotificationRecord
}

const defaultState: NotificationsStore = {
  morning: { enabled: true, time: new ClockTime(8, 0) },
  night: { enabled: true, time: new ClockTime(21, 0) }
}

function notifications(
  state: NotificationsStore = defaultState,
  action: NotificationAction,
): NotificationsStore {
  return produce(state, draft => {
    switch (action.type) {
      case SET_NOTIFICATION_TIME: {
        if (action.notification === Time.Morning) {
          draft.morning.time = action.time;
        } else {
          draft.night.time = action.time;
        }
        
        return draft;
      }
      case TOGGLE_NOTIFICATION: {
        if (action.notification === Time.Morning) {
          draft.morning.enabled = !draft.morning.enabled;
        } else {
          draft.night.enabled = !draft.night.enabled;
        }

        return draft;
      }
      case SET_NOTIFICATION_ID: {
        if (action.notification === Time.Morning) {
          draft.morning.notificationId = action.id;
        } else {
          draft.night.notificationId = action.id;
        }

        return draft;
      }
      case CANCEL_NOTIFICATION: {
        if (action.notification === Time.Morning) {
          draft.morning.notificationId = undefined;
        } else {
          draft.night.notificationId = undefined;
        }

        return draft;
      }
    }
  });
}

export default notifications;
