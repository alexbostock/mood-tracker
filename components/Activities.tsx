import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

interface Props {
  activitiesSet: Set<string>
  addActivity: (activity: string) => void
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

  return (
    <>
      <View>
        {Array.from(props.activitiesSet || new Set()).map(
          (activity: string) => <Text key={activity}>{activity}</Text>
        )}
      </View>

      <TextInput
        style={inputStyles}
        placeholder="New Activity Name"
        value={newActivity}
        onChangeText={setNewActivity}
      />

      <Button
        title="Add Activity"
        onPress={saveActivity}
      />
    </>
  );
}

const inputStyles = {
  height: 40,
  width: 200,
  borderColor: 'grey',
  borderWidth: 1,
  padding: 8,
};

export default Activities;
