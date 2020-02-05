import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addMedsReminder, editMedsReminder, removeMedsReminder } from '../../actions/meds';
import { RootState } from '../../reducers';
import { MedsRecord, ClockTime } from '../../store/types';

import MedsRecordInput from './MedsRecordInput';
import NotificationsPreferences from './NotificationsPreferences';

function Preferences(): JSX.Element {
  const dispatch = useDispatch();

  const meds: Map<string, MedsRecord> = useSelector(
    (state: RootState) => {
      const result = new Map();
      for (const [name, { conf }] of Array.from(state.meds.entries())) {
        result.set(name, conf);
      }
      return result;
    }
  );

  const addRecord = (record: MedsRecord) => {
    if (record.name === '' || meds.get(record.name)) {
      return;
    }

    dispatch(addMedsReminder(record.name, record.time));
  }

  const updateRecord = (currentName: string, record: MedsRecord) => {
    if (record.name === '' || !meds.get(currentName)) {
      return;
    }

    dispatch(editMedsReminder(currentName, record));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <NotificationsPreferences />

      {Array.from(meds.entries()).map(([_, conf]) =>
        <MedsRecordInput
          key={conf.name}
          name={conf.name}
          time={conf.time}
          save={record => updateRecord(conf.name, record)}
          delete={() => dispatch(removeMedsReminder(conf.name))}
        />
      )}

      <MedsRecordInput
        name=""
        time={new ClockTime(12, 0)}
        save={addRecord}
        resetOnSave={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  }
})

export default Preferences;
