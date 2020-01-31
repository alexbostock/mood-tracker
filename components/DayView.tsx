import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../actions/activities';
import { saveMood } from '../actions/moods';
import { saveSleepRating } from '../actions/sleep';
import { RootState } from '../reducers';
import { MoodRecord } from '../reducers/moods';
import { Screen, Rating, Time } from '../store/types';

import RatingSelector from './RatingSelector';

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

  const moods: MoodRecord = useSelector(
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

        <Text style={styles.date}>{props.date.toDateString()}</Text>

        <View style={styles.navButton}>
          <Button title=">" onPress={() => props.setDate(tomorrow)} />
        </View>

      </View>

      <View style={styles.section}>
        <Text>{sleepRating ? 'Sleep rating' : 'How did you sleep?'}</Text>
        <RatingSelector
          currentRating={sleepRating}
          setter={rating => dispatch(saveSleepRating(rating, props.date))}
        />

        <Text>Morning mood</Text>
        <RatingSelector
          currentRating={moods ? moods.morning : null}
          setter={rating => dispatch(saveMood(rating, props.date, Time.Morning))}
        />

        <Text>Evening mood</Text>
        <RatingSelector
          currentRating={moods ? moods.night : null}
          setter={rating => dispatch(saveMood(rating, props.date, Time.Night))}
        />
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

  date: {
    textAlign: 'center',
    width: 200,
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
