import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { ClockTime, MedsRecord, printTime } from '../../store/types';
import TimePicker from './TimePicker';

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

  const updateTime = (time: ClockTime) => {
    setShowTimePicker(false);
    if (time) {
      setTime(time);
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
    <View style={{ marginBottom: 16 }}>
      <TextInput
        style={{ borderColor: 'grey', borderWidth: 1, height: 40, marginBottom: 8 }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <View style={{ flexDirection: 'row' }}>
        <Button
          title={printTime(time)}
          onPress={() => setShowTimePicker(true)}
        />

        <TimePicker
          show={showTimePicker}
          time={time}
          callback={updateTime}
        />

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
    </View>
  );
}

export default MedsRecordInput;
