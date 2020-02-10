import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { Rating } from '../../store/types';

import DateNavigator, { TimeUnit } from '../DateNavigator';

interface DateRecord {
  date: string
  moods: { morning: Rating, night: Rating }
  sleep: Rating
  activities: Set<string>
}

interface Props {
  date: Date
}

function Insights(props: Props): JSX.Element {
  const [date, setDate] = useState(new Date(props.date));

  const dates: Array<DateRecord> = useSelector(
    (state: RootState) => allDatesInMonth(date)
      .map(date => date.toDateString())
      .map(date => ({
        date,
        moods: state.moods.get(date),
        sleep: state.sleep.get(date),
        activities: state.activities.get(date),
      }))
  );

  const weeks: Array<Array<DateRecord>> = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <View style={{ flex: 1, margin: 32 }}>
      <DateNavigator
        date={date}
        setDate={setDate}
        scrollOnly={true}
        scrollInterval={TimeUnit.Month}
      />
      <View style={styles.table}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <Text key={i} style={styles.tableCell}>{day}</Text>
          ))}
        </View>

        {weeks.map(dailyMoods)}
      </View>

      <View style={{ flex: 1 }}>
        <Text>morning mood / night mood</Text>
        <Text>In the absence of more insightful insights, have a quote instead.</Text>
        <Text>"Never put off until tomorrow what you can do the day after tomorrow" - Mark Twain</Text>
      </View>
    </View>
  );
}

function allDatesInMonth(date: Date): Array<Date> {
  date = new Date(date);

  date.setDate(1);

  const daysBeforeMonthStart = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const currentMonth = date.getMonth();

  const answer = [];

  while (date.getMonth() === currentMonth) {
    answer.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  while (date.getDay() !== 1) {
    answer.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  date.setMonth(date.getMonth() - 1);
  date.setDate(1);

  for (let i = 0; i < daysBeforeMonthStart; i++) {
    date.setDate(date.getDate() - 1);
    answer.unshift(new Date(date));
  }

  return answer;
}

function dailyMoods(week: Array<DateRecord>, index: number): JSX.Element {
  return (
    <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
      {week.map((record: DateRecord, i: number) => (
        <Text style={styles.tableCell} key={i}>{dailyMood(record)}</Text>
      ))}
    </View>
  );
}

function dailyMood(record: DateRecord): string {
  if (!record.moods) {
    return '-/-';
  }

  const morn = record.moods.morning == null ? '-' : record.moods.morning;
  const night = record.moods.night == null ? '-' : record.moods.night;

  return morn + '/' + night;
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
  },

  tableCell: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black',

    textAlign: 'center',
  },
});

export default Insights;
