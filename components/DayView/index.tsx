import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity } from '../../actions/activities';
import { medsTaken, medsNotTaken } from '../../actions/meds';
import { saveMood } from '../../actions/moods';
import { saveSleepRating } from '../../actions/sleep';
import { RootState } from '../../reducers';
import { MoodRecord } from '../../reducers/moods';
import { MedsRecord, Rating, Screen } from '../../store/types';

import Mood from './Mood';
import Activities from './Activities';
import Meds from './Meds';

interface Props {
  date: Date
  setDate: (date: Date) => void
}

function DayView(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const setDate = (_, date: Date) => {
    setShowDatePicker(false);
    if (date) {
      props.setDate(date);
    }
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
        {
          showDatePicker ?
          <DateTimePicker value={props.date} onChange={setDate} />
          : null
        }

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Mood</Text>

          <Mood
            sleepRating={sleepRating}
            moods={moods}
            setSleepRating={rating =>
              dispatch(saveSleepRating(rating, props.date))}
            setMood={(rating, time) =>
              dispatch(saveMood(rating, props.date, time))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Meds</Text>

          <Meds
            meds={meds}
            medsTaken={name => dispatch(medsTaken(name))}
            medsNotTaken={name => dispatch(medsNotTaken(name))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Activities</Text>

          <Activities
            activitiesSet={activities}
            addActivity={activity => dispatch(addActivity(activity))}
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
});

export default DayView;
