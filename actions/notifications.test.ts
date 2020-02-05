import {
  SET_NOTIFICATION_TIME,
  TOGGLE_NOTIFICATION,
  setNotificationTime,
  toggleNotification,
} from './notifications';
import { ClockTime, Time } from '../store/types';

describe('notifications actions,', () => {
  it('creates set notification time actions', () => {
    const notification = Time.Morning;
    const time = new ClockTime(14, 30);

    const action = setNotificationTime(notification, time);
    const expectedAction = {
      type: SET_NOTIFICATION_TIME,
      notification,
      time,
    };

    expect(action).toStrictEqual(expectedAction);
  });

  it('creates toggle notification actions', () => {
    const notification = Time.Night;

    const action = toggleNotification(notification);
    const expectedAction = {
      type: TOGGLE_NOTIFICATION,
      notification,
    };

    expect(action).toStrictEqual(expectedAction);
  });
});
