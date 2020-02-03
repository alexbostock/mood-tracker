import produce from 'immer';

import { NotificationAction, TOGGLE_NOTIFICATION, SET_NOTIFICATION_TIME } from '../actions/notifications';
import { Time } from '../store/types';

export interface NotificationsStore {
  morning: {
    enabled: boolean
    time: number
  },
  night: {
    enabled: boolean
    time: number
  },
}

const defaultTime = new Date();
defaultTime.setHours(8);
defaultTime.setMinutes(0);
defaultTime.setSeconds(0);
defaultTime.setMilliseconds(0);

const defaultState: NotificationsStore = {
  morning: { enabled: false, time: defaultTime.getTime() },
  night: { enabled: false, time: defaultTime.getTime() + 13 * 60 * 60 * 1000 }
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
    }
  });
}

export default notifications;
