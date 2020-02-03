import {
  SET_NOTIFICATION_TIME,
  TOGGLE_NOTIFICATION,
} from '../actions/notifications';
import { Time } from '../store/types';

import reducer from './notifications';

describe('notifications reducer', () => {
  it('toggles notifications', () => {
    let state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(true);

    state = reducer(state, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(false);

    state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Morning,
    });
    expect(state.morning.enabled).toBe(true);
  });

  it('updates notification times', () => {
    const time = new Date();
    time.setHours(21);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);

    let state = reducer(undefined, {
      type: TOGGLE_NOTIFICATION,
      notification: Time.Night,
    });

    expect(state.night.time).toBe(time.getTime());

    time.setMinutes(30);

    state = reducer(state, {
      type: SET_NOTIFICATION_TIME,
      notification: Time.Night,
      time: time.getTime(),
    });

    expect(state.night.time).toBe(time.getTime());
  });
})
