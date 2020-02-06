import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { setNotificationTime } from '../../actions/notifications';
import { RootState } from '../../reducers';
import { NotificationsStore } from '../../reducers/notifications';
import { ClockTime, Time } from '../../store/types';

import NotificationPreference from './NotificationPreference';

function NotificationsPreferences(): JSX.Element {
  const dispatch = useDispatch();

  const [notificationsAvailable, setNotificationsAvailable] = useState(false);

  useEffect(() => {
    askNotificationPermission()
    .then(setNotificationsAvailable)
    .catch(console.warn);

    const listener = Notifications.addListener(handleNotification);

    return () => listener.remove();
  }, []);

  const notificationsConfig: NotificationsStore = useSelector(
    (state: RootState) => state.notifications
  );

  if (!notificationsAvailable) {
    return <Text>Notifications unavailable (check permissions</Text>;
  }

  return (
    <View>
      <NotificationPreference
        notification={Time.Morning}
        enabled={notificationsConfig.morning.enabled}
        time={notificationsConfig.morning.time}
      />

      <NotificationPreference
        notification={Time.Night}
        enabled={notificationsConfig.night.enabled}
        time={notificationsConfig.night.time}
      />
    </View>
  );
}

const askNotificationPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status === 'granted';
};

const handleNotification = () => {
  // Feature for later: add an in-app message until user action
};

export default NotificationsPreferences;
