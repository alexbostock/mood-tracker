import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addActivity, removeActivity } from '../../actions/activities';
import { medsTaken, medsNotTaken } from '../../actions/meds';
import { saveMood } from '../../actions/moods';
import { saveSleepRating } from '../../actions/sleep';
import { RootState } from '../../reducers';
import { MoodRecord } from '../../reducers/moods';
import { MedsRecord, Rating, quantifyTime } from '../../store/types';

import DateNavigator, { TimeUnit } from '../DateNavigator';
import Mood from './Mood';
import Activities from './Activities';
import Meds from './Meds';

interface Props {
  date: Date
  setDate: (date: Date) => void
}

function DayView(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const sleepRating: Rating = useSelector(
    (state: RootState) => state.sleep.get(props.date.toDateString())
  );

  const moods: MoodRecord = useSelector(
    (state: RootState) => state.moods.get(props.date.toDateString())
  );

  const activities: Set<string> = useSelector(
    (state: RootState) => state.activities.get(props.date.toDateString())
  );

  const knownActivities: Array<string> = useSelector(
    (state: RootState) => Array.from(state.knownActivities.entries() || [])
      .map(([activity, _]) => activity)
      .sort()
  );

  const meds: Array<[MedsRecord, boolean]> = useSelector(
    (state: RootState) => Array.from(state.meds.entries())
      .sort(([_, a], [__, b]) => quantifyTime(a.conf.time) - quantifyTime(b.conf.time))
      .map(([_, val]) => [val.conf, val.taken.has(props.date.toDateString())])
  );

  return (
    <View style={styles.root}>
      <DateNavigator
        date={props.date}
        setDate={props.setDate}
        scrollOnly={false}
        scrollInterval={TimeUnit.Day}
      />

      <ScrollView contentContainerStyle={styles.container}>
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
            knownActivities={knownActivities}
            addActivity={a => dispatch(addActivity(a, props.date))}
            removeActivity={a => dispatch(removeActivity(a, props.date))}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 32,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DayView;
