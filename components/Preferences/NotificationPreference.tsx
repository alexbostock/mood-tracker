import React, { useState } from 'react';
import { Button, Switch, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import TimePicker from './TimePicker';
import {
  setNotificationTime,
  toggleNotification,
} from '../../actions/notificationThunks';
import { Time, ClockTime, printTime } from '../../store/types';

interface Props {
  notification: Time
  enabled: boolean
  time: ClockTime
}

function NotificationPreference(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [showTimePicker, setShowTimePicker] = useState(false);

  const updateTime = (time: ClockTime) => {
    setShowTimePicker(false);
    if (time) {
      dispatch(setNotificationTime(props.notification, time));
    }
  }

  const morning = props.notification === Time.Morning;

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{flex: 2}}>{morning ? 'Morning' : 'Evening'}</Text>
        <Switch
          style={{flex: 1}}
          value={props.enabled}
          onValueChange={() => dispatch(toggleNotification(props.notification))}
        />
      </View>

      <View style={{ width: 64 }}>
        <Button
          title={printTime(props.time)}
          onPress={() => setShowTimePicker(true)}
        />
      </View>

      <TimePicker
        show={showTimePicker}
        time={props.time}
        callback={updateTime}
      />
    </View>
  );
}

export default NotificationPreference;
