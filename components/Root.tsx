import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../actions/activities';
import { RootState } from '../reducers';

function Root(): JSX.Element {
  const dispatch = useDispatch();

  const [newActivity, setNewActivity] = useState('');

  const saveActivity = () => {
    if (newActivity === '') {
      return;
    }

    dispatch(addActivity(newActivity));
    setNewActivity('');
  }
  
  const activities: Array<JSX.Element> = useSelector(
    (state: RootState) => Array.from(state.activities.entries())
    .map((entry) => {
      const [date, set] = entry;
      return (
        <View key={date}>
          <Text>{date}</Text>
          {Array.from(set).map((activity, i) => <Text key={i}>{activity}</Text>)}
        </View>
      )
    })
  );

  return (
    <View style={styles.container}>
      {activities.length > 0 ? activities : <Text>No activities stored</Text>}

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
