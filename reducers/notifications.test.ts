import {
  SET_NOTIFICATION_TIME,
  TOGGLE_NOTIFICATION,
  SET_NOTIFICATION_ID,
  CANCEL_NOTIFICATION,
} from '../actions/notifications';
import { ClockTime, Time } from '../store/types';

import reducer from './notifications';

describe('notifications reducer', () => {
  it('toggles notifications', () => {
    let state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(false);

    state = reducer(state, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(true);

    state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(false);
  });

  it('updates notification times', () => {
    let time = new ClockTime(21, 0);

    let state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Night,
    });

    expect(state.night.time).toStrictEqual(time);

    time = new ClockTime(time.hours, time.minutes + 30);

    state = reducer(state, {
      type: SET_NOTIFICATION_TIME,
      notification: Time.Night,
      time,
    });

    expect(state.night.time).toBe(time);
  });

  it('sets notification IDs', () => {
    let state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Night,
    });

    expect(state.night.notificationId).toBe(undefined);

    state = reducer(state, {
      type: SET_NOTIFICATION_ID,
      notification: Time.Night,
      id: 25,
    });

    expect(state.night.notificationId).toBe(25);
  });

  it('removes notification IDs', () => {
    let state = reducer(undefined, {
      type: SET_NOTIFICATION_ID,
      notification: Time.Morning,
      id: 42,
    });

    state = reducer(state, {
      type: CANCEL_NOTIFICATION,
      notification: Time.Morning,
    });

    expect(state.morning.notificationId).toBe(undefined);
  })
});
