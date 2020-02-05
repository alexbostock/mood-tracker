import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ClockTime } from '../../store/types';

interface Props {
  show: boolean;
  time: ClockTime
  callback: (time: ClockTime) => void
}

function TimePicker(props: Props): JSX.Element {
  const update = (_, val: Date) => {
    const time = val ? dateToCt(val) : undefined;
    props.callback(time);
  }

  if (!props.show) {
    return null;
  }

  return (
    <DateTimePicker
      mode="time"
      value={ctToDate(props.time)}
      onChange={update}
    />
  );
}

function ctToDate(time: ClockTime) {
  const result = new Date();
  result.setHours(time.hours);
  result.setMinutes(time.minutes);

  return result;
}

function dateToCt(time: Date) {
  return new ClockTime(time.getHours(), time.getMinutes());
}

export default TimePicker;
