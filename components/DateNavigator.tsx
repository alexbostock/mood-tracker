import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export enum TimeUnit {
  Day,
  Month,
}

interface Props {
  date: Date
  setDate: (date: Date) => void
  scrollOnly: boolean
  scrollInterval: TimeUnit
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function DateNavigator(props: Props): JSX.Element {
  const [showPicker, setShowPicker] = useState(false);

  const setDate = (_, date: Date) => {
    setShowPicker(false);
    if (date) {
      props.setDate(date);
    }
  }

  const [previous, next] = adjacentDates(props.date, props.scrollInterval);

  const dateText = printDate(props.date, props.scrollInterval);

  let date: JSX.Element;
  if (props.scrollOnly) {
    date = (
      <Text style={{ textAlign: 'center' }}>
        {dateText}
      </Text>
    );
  } else {
    date = (
      <Button
        title={dateText}
        onPress={() => setShowPicker(true)}
      />
    );
  }

  return (
    <View style={styles.nav}>
      <View style={styles.navButton}>
        <Button
          title="<"
          onPress={() => props.setDate(previous)}
        />
      </View>

      <View style={styles.date}>
        {date}
      </View>

      <View style={styles.navButton}>
        <Button
          title=">"
          onPress={() => props.setDate(next)}
        />
      </View>

      {
        showPicker ?
        <DateTimePicker value={props.date} onChange={setDate} />
        : null
      }
    </View>
  );
}

function adjacentDates(date: Date, difference: TimeUnit): [Date, Date] {
  const before = new Date(date);
  before.setDate(1);
  const after = new Date(date);
  after.setDate(1);

  switch (difference) {
    case TimeUnit.Day:
      before.setDate(date.getDate() - 1);
      after.setDate(date.getDate() + 1);
      break;
    case TimeUnit.Month:
      before.setMonth(date.getMonth() - 1);
      after.setMonth(date.getMonth() + 1);
      break;
  }

  return [before, after];
}

function printDate(date: Date, precision: TimeUnit): string {
  switch (precision) {
    case TimeUnit.Day:
      return date.toDateString().toUpperCase();
    case TimeUnit.Month:
      return months[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();
  }
}

const styles = StyleSheet.create({
  nav: {
    height: 68,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
  },

  navButton: {
    margin: 16,
  },

  date: {
    width: 200,
  }
});

export default DateNavigator;
