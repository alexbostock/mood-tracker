import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../actions/activities';
import { RootState } from '../reducers';

function Root() {
  const dispatch = useDispatch();

  const [newActivity, setNewActivity] = useState('');

  const saveActivity = () => {
    dispatch(addActivity(newActivity))
  }
  
  const activities = useSelector((state: RootState) => Object.entries(state.activities));

  return (
    <View style={styles.container}>
      {activities.length > 0 ? renderActivities(activities) : <Text>No activities stored</Text>}

      <TextInput
        style={styles.input}
        placeholder="New Activity Name"
        value={newActivity}
        onChangeText={setNewActivity}
      />

      <Button
        title="Add Activity"
        onPress={saveActivity}
      />
    </View>
  );
}

function renderActivities(activities: Array<[string, Set<string>]>) {
  return activities
    .map(entry => {
      const [date, entries] = entry;

      return (
        <View key={date}>
          <Text >{date}</Text>
          {Array.from(entries).map((activity, i) => <Text key={i}>{activity}</Text>)}
        </View>
      );
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 8,
  }
});

export default Root;