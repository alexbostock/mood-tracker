import { ClockTime } from '../store/types';

import { ADD_MEDS_REMINDER, EDIT_MEDS_REMINDER, REMOVE_MEDS_REMINDER, UPDATE_MEDS_TAKEN } from './meds';
import { addMedsReminder, editMedsReminder, removeMedsReminder, medsTaken, medsNotTaken } from './meds';

describe('meds actions', () => {
  it('creates add meds reminder actions', () => {
    const name = 'Vitamins';
    const time = new ClockTime(14, 30);
    const action = addMedsReminder(name, time);
    const expectedAction = {
      type: ADD_MEDS_REMINDER,
      record: {
        name,
        time,
      },
    };

    expect(action).toStrictEqual(expectedAction);
  });

  it('creates edit meds reminder actions', () => {
    const currentName = 'Witamins';
    const newName = 'Vitamins';
    const action = editMedsReminder(currentName, { name: newName });
    const expectedAction = {
      type: EDIT_MEDS_REMINDER,
      currentName,
      changes: {
        name: newName,
      }
    };

    expect(action).toStrictEqual(expectedAction);
  });

  it('creates remove meds reminder actions', () => {
    const name = 'Vitamins';
    const action = removeMedsReminder(name);
    const expectedAction = {
      type: REMOVE_MEDS_REMINDER,
      name,
    };

    expect(action).toStrictEqual(expectedAction);
  });

  it('creates update meds taken actions', () => {
    const name = 'Vitamins';
    const date = new Date();

    let action = medsTaken(name, date);
    let expectedAction = {
      type: UPDATE_MEDS_TAKEN,
      name,
      date,
      taken: true,
    };

    expect(action).toStrictEqual(expectedAction);

    action = medsNotTaken(name, date);
    expectedAction = {
      type: UPDATE_MEDS_TAKEN,
      name,
      date,
      taken: false,
    };

    expect(action).toStrictEqual(expectedAction);
  });
});
