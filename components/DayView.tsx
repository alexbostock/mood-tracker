import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../actions/activities';
import { RootState } from '../reducers';
import { Screen, Rating, Time } from '../store/types';

interface Props {
  changeScreen: (screenType: Screen) => void
  date: Date
  setDate: (date: Date) => void
}

function DayView(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [newActivity, setNewActivity] = useState('');

  const saveActivity = () => {
    if (newActivity === '') {
      return;
    }

    dispatch(addActivity(newActivity));
    setNewActivity('');
  }

  const yesterday = new Date(props.date);
  yesterday.setDate(props.date.getDate() - 1);
  const tomorrow = new Date(props.date);
  tomorrow.setDate(props.date.getDate() + 1);

  const sleepRating: Rating = useSelector(
    (state: RootState) => state.sleep.get(props.date.toDateString())
  );

  const moods: Map<Time, Rating> = useSelector(
    (state: RootState) => state.moods.get(props.date.toDateString())
  );

  const activities: Set<string> = useSelector(
    (state: RootState) => state.activities.get(props.date.toDateString())
  );

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.navButton}>
          <Button title="<" onPress={() => props.setDate(yesterday)} />
        </View>

        <Text>{props.date.toDateString()}</Text>

        <View style={styles.navButton}>
          <Button title=">" onPress={() => props.setDate(tomorrow)} />
        </View>

      </View>

      <View style={styles.section}>
        <Text>Sleep</Text>
        <Text>{sleepRating || 'No sleep data'}</Text>

        <Text>Morning mood</Text>
        <Text>{
          moods && moods.get(Time.Morning) ?
            moods.get(Time.Morning) : 'No moods recorded'
        }</Text>

        <Text>Evening mood</Text>
        <Text>{
          moods && moods.get(Time.Night) ?
            moods.get(Time.Night) : 'No moods recorded'
        }</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Activities</Text>
        
        <FlatList
          data={Array.from(activities || new Set())}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item: string) => item}
        />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    margin: 16,
  },

  nav: {
    flex: 0.2,
    flexDirection: 'row',

    alignItems: 'center',

    paddingTop: 32,
  },

  navButton: {
    margin: 16,
  },

  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',


    padding: 16,
  },

  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  input: {
    height: 40,
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 8,
  }
});

export default DayView;
