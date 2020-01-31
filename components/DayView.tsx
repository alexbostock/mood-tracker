import React, { useState } from 'react';
import {
  Button,
  CheckBox,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../actions/activities';
import { medsTaken, medsNotTaken } from '../actions/meds';
import { saveMood } from '../actions/moods';
import { saveSleepRating } from '../actions/sleep';
import { RootState } from '../reducers';
import { MoodRecord } from '../reducers/moods';
import { MedsRecord, printTime, Rating, Screen, Time } from '../store/types';

import RatingSelector from './RatingSelector';

interface Props {
  changeScreen: (screenType: Screen) => void
  date: Date
  setDate: (date: Date) => void
}

function DayView(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newActivity, setNewActivity] = useState('');

  const setDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      props.setDate(date);
    }
  }

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

  const meds: Array<[MedsRecord, boolean]> = useSelector(
    (state: RootState) => Array.from(state.meds.entries())
      .map(([_, val]) => [val.conf, val.taken.has(props.date.toDateString())])
  );

  return (
    <View style={styles.root}>
      <View style={styles.nav}>
        <View style={styles.navButton}>
          <Button title="<" onPress={() => props.setDate(yesterday)} />
        </View>

        <View style={styles.date}>
          <Button title={props.date.toDateString()} onPress={() => setShowDatePicker(true)} />
        </View>

        <View style={styles.navButton}>
          <Button title=">" onPress={() => props.setDate(tomorrow)} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {showDatePicker ? <DateTimePicker value={props.date} onChange={setDate} /> : null}

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Mood</Text>

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
          <Text style={styles.sectionHeading}>Meds</Text>

          {meds.map(([conf, taken]) => (
          <View key={conf.name} style={{ flexDirection: 'row' }}>
              <Text>{conf.name}: {printTime(conf.time)}</Text>
              <CheckBox
                value={taken}
                onValueChange={val =>
                  dispatch(val ? medsTaken(conf.name) : medsNotTaken(conf.name))}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Activities</Text>

          <View>
            {Array.from(activities || new Set()).map(
              (activity: string) => <Text key={activity}>{activity}</Text>
            )}
          </View>

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  nav: {
    height: 68,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 32,
  },

  navButton: {
    margin: 16,
  },

  date: {
    textAlign: 'center',
    width: 200,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: {
    maxHeight: 400,
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
