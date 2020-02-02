import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ClockTime, MedsRecord, printTime } from '../../store/types';

interface Props {
  name: string
  time: ClockTime
  save: (record: MedsRecord) => void
  delete?: () => void
  resetOnSave?: boolean
}

function MedsRecordInput(props: Props): JSX.Element {
  const [name, setName] = useState(props.name);
  const [time, setTime] = useState(props.time);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const updateTime = (_, val: Date) => {
    setShowTimePicker(false);
    if (val) {
      setTime(dateToCt(val));
    }
  }

  const save = () => {
    props.save({ name, time });

    if (props.resetOnSave) {
      setName(props.name);
      setTime(props.time);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <Button
        title={printTime(time)}
        onPress={() => setShowTimePicker(true)}
      />

      {showTimePicker ?
        <DateTimePicker
          mode="time"
          value={ctToDate(time)}
          onChange={updateTime}
        />
        : null
      }

      <Button
        title="Save"
        onPress={save}
      />

      {props.delete ?
        <Button
          title="Delete"
          onPress={props.delete}
        />
        : null
      }
    </View>
  );
}

function ctToDate(time: ClockTime) {
  const result = new Date();
  result.setHours(time.hours);
  result.setMinutes(time.minutes);

  return result;
}

function dateToCt(time: Date) {
  return new ClockTime(time.getHours(), time.getMinutes());
}

export default MedsRecordInput;
