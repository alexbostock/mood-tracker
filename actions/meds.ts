import { ClockTime, MedsRecord, PartialMedsRecord } from '../store/types';

export const ADD_MEDS_REMINDER = 'ADD_MEDS_REMINDER';
export const EDIT_MEDS_REMINDER = 'EDIT_MEDS_REMINDER';
export const REMOVE_MEDS_REMINDER = 'REMOVE_MEDS_REMINDER';
export const UPDATE_MEDS_TAKEN = 'UPDATE_MEDS_TAKEN';

interface AddMedsAction {
  type: typeof ADD_MEDS_REMINDER
  record: MedsRecord
}

interface EditMedsAction {
  type: typeof EDIT_MEDS_REMINDER
  currentName: string
  changes: PartialMedsRecord
}

interface RemoveMedsAction {
  type: typeof REMOVE_MEDS_REMINDER
  name: string
}

interface UpdateMedsTakenAction {
  type: typeof UPDATE_MEDS_TAKEN
  name: string
  date: Date
  taken: boolean
}

export type MedsAction =
  | AddMedsAction
  | EditMedsAction
  | RemoveMedsAction
  | UpdateMedsTakenAction;

export const addMedsReminder = (
  name: string,
  time: ClockTime,
): MedsAction => ({
  type: ADD_MEDS_REMINDER,
  record: {
    name,
    time,
  },
});

export const editMedsReminder = (
  currentName: string,
  changes: PartialMedsRecord,
): MedsAction => ({
  type: EDIT_MEDS_REMINDER,
  currentName,
  changes,
});

export const removeMedsReminder = (
  name: string,
): MedsAction => ({
  type: REMOVE_MEDS_REMINDER,
  name,
});

export const medsTaken = (
  name: string,
  date: Date = new Date(),
): MedsAction => ({
  type: UPDATE_MEDS_TAKEN,
  name,
  date: new Date(date),
  taken: true,
});

export const medsNotTaken = (
  name: string,
  date: Date = new Date(),
): MedsAction => ({
  type: UPDATE_MEDS_TAKEN,
  name,
  date: new Date(date),
  taken: false,
});
