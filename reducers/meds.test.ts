import { ADD_MEDS_REMINDER, EDIT_MEDS_REMINDER, REMOVE_MEDS_REMINDER, UPDATE_MEDS_TAKEN } from '../actions/meds';
import { ClockTime } from '../store/types';
import reducer from './meds';

describe('meds reducer', () => {
  const record = {
    name: 'Vitamins',
    time: new ClockTime(13, 30),
  };

  const record2 = {
    name: 'Insulin',
    time: new ClockTime(9, 0),
  };

  it('save details of medicines', () => {
    let state = reducer(undefined, {
      type: ADD_MEDS_REMINDER,
      record: record,
    });

    expect(state.get('Vitamins').conf).toStrictEqual(record);

    expect(state.get('Vitamins').taken).toStrictEqual(new Set());

    state = reducer(state, {
      type: ADD_MEDS_REMINDER,
      record: record2,
    });

    expect(state.size).toBe(2);
    expect(state.get('Vitamins').conf).toStrictEqual(record);
    expect(state.get('Insulin').conf).toStrictEqual(record2);
  });

  it('updates details of medicines', () => {
    let state = reducer(undefined, {
      type: ADD_MEDS_REMINDER,
      record,
    });

    state = reducer(state, {
      type: EDIT_MEDS_REMINDER,
      currentName: 'Vitamins',
      changes: { time: new ClockTime(14, 30) },
    });

    expect(state.get('Vitamins').conf).toStrictEqual({
      name: 'Vitamins',
      time: new ClockTime(14, 30),
    });
  });

  it('deletes medicine records', () => {
    let state = reducer(undefined, {
      type: REMOVE_MEDS_REMINDER,
      name: 'Vitamins',
    });

    expect(state.size).toBe(0);

    state = reducer(state, {
      type: ADD_MEDS_REMINDER,
      record,
    });

    state = reducer(state, {
      type: ADD_MEDS_REMINDER,
      record: record2,
    });

    expect(state.size).toBe(2);

    state = reducer(state, {
      type: REMOVE_MEDS_REMINDER,
      name: record2.name,
    });

    expect(state.size).toBe(1);
    expect(state.get(record.name).conf).toStrictEqual(record);

    state = reducer(state, {
      type: REMOVE_MEDS_REMINDER,
      name: record.name,
    });

    expect(state.size).toBe(0);
  });


  it('records whether meds have been taken', () => {
    const date = new Date();

    let state = reducer(undefined, {
      type: ADD_MEDS_REMINDER,
      record,
    });

    expect(state.get(record.name).taken).toStrictEqual(new Set());

    state = reducer(state, {
      type: UPDATE_MEDS_TAKEN,
      name: record.name,
      date,
      taken: true,
    });

    expect(state.get(record.name).taken)
      .toStrictEqual(new Set([date.toDateString()]));

    state = reducer(state, {
      type: UPDATE_MEDS_TAKEN,
      name: record.name,
      date,
      taken: false,
    });

    expect(state.get(record.name).taken.size).toBe(0);
  });
});
