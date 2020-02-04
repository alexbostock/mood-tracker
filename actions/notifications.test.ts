import {
  SET_NOTIFICATION_TIME,
  TOGGLE_NOTIFICATION,
  SET_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
  setNotificationTime,
  toggleNotification,
  setNotificationId,
  cancelNotification
} from './notifications';
import { Time } from '../store/types';

describe('notifications actions,', () => {
  it('creates set notification time actions', () => {
    const notification = Time.Morning;
    const time = new Date().getTime();

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

  it('creates set notification id actions', () => {
    const notification = Time.Morning;
    const id = 15;

    const action = setNotificationId(notification, id);
    const expectedAction = {
      type: SET_NOTIFICATION_ID,
      notification,
      id,
    };

    expect(action).toStrictEqual(expectedAction);
  });

  it('creates cancel notification actions', () => {
    const notification = Time.Night;

    const action = cancelNotification(notification);
    const expectedAction = {
      type: CANCEL_NOTIFICATION,
      notification,
    };

    expect(action).toStrictEqual(expectedAction);
  });
});
