import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers';
import { Rating } from '../../store/types';

interface DateRecord {
  date: string
  moods: { morning: Rating, night: Rating }
  sleep: Rating
  activities: Set<string>
}

function Insights(): JSX.Element {
  const dates: Array<DateRecord> = useSelector(
    (state: RootState) => allDatesThisMonth()
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

  console.log(weeks.map(week => week.map(data => data.date)));

  return (
    <View style={{ flex: 1, margin: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <View key={i} style={{ flex: 1 }}>
            <Text style={{ padding: 8, textAlign: 'center' }}>{day}</Text>
          </View>
        ))}
      </View>

      {weeks.map((week, index) => (
        <View key={index} style={{ flexDirection: 'row' }}>
          {week.map((data, index) => (
            <View
              key={index}
              style={{ backgroundColor: [5, 6].includes(index) ? 'grey' : 'lightgrey' }}
            >
              <Text style={{ padding: 8 }}>{data.date.split(' ')[2]}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function allDatesThisMonth(): Array<Date> {
  const date = new Date();
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

export default Insights;
