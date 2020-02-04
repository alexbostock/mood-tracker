import produce from 'immer';

import {
  NotificationAction,
  TOGGLE_NOTIFICATION,
  SET_NOTIFICATION_TIME,
  SET_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
} from '../actions/notifications';
import { Time } from '../store/types';

interface NotificationRecord {
  enabled: boolean
  time: number
  notificationId?: number
}

export interface NotificationsStore {
  morning: NotificationRecord
  night: NotificationRecord
}

const defaultTime = new Date();
defaultTime.setHours(8);
defaultTime.setMinutes(0);
defaultTime.setSeconds(0);
defaultTime.setMilliseconds(0);

const defaultState: NotificationsStore = {
  morning: { enabled: true, time: defaultTime.getTime() },
  night: { enabled: true, time: defaultTime.getTime() + 13 * 60 * 60 * 1000 }
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
