import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import DatalistInput from './DatalistInput';

interface Props {
  activitiesSet: Set<string>
  knownActivities: Array<string>
  addActivity: (activity: string) => void
  removeActivity: (activity: string) => void
}

function Activities(props: Props): JSX.Element {
  const [newActivity, setNewActivity] = useState('');

  const saveActivity = () => {
    if (newActivity === '') {
      return;
    }

    props.addActivity(newActivity);
    setNewActivity('');
  }

  const activityItem = (activity: string): JSX.Element => (
    <View key={activity} style={{ flexDirection: 'row' }}>
      <Text>{activity}</Text>
      <Button
        title="Remove"
        onPress={() => props.removeActivity(activity)}
      />
    </View>
  );

  return (
    <>
      <View>
        {Array.from(props.activitiesSet || new Set()).map(activityItem)}
      </View>

      <View style={{ flexDirection: 'row' }}>
        <DatalistInput
          value={newActivity}
          updateValue={setNewActivity}
          label="New Activity Name"
          suggestedValues={props.knownActivities}
        />

        <Button
          title="Add"
          onPress={saveActivity}
        />
      </View>
    </>
  );
}

export default Activities;
