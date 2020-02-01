import React from 'react';
import { Text } from 'react-native';

import { Rating, Time } from '../../store/types';

import RatingSelector from './RatingSelector';
import { MoodRecord } from '../../reducers/moods';

interface Props {
  sleepRating: Rating
  moods: MoodRecord

  setSleepRating: (rating: Rating) => void
  setMood: (rating: Rating, time: Time) => void
}

function Mood(props: Props): JSX.Element {
  return (
    <>
      <Text>{props.sleepRating ? 'Sleep rating' : 'How did you sleep?'}</Text>
      <RatingSelector
      currentRating={props.sleepRating}
      setter={props.setSleepRating}
      />

      <Text>Morning mood</Text>
      <RatingSelector
      currentRating={props.moods ? props.moods.morning : null}
      setter={rating => props.setMood(rating, Time.Morning)}
      />

      <Text>Evening mood</Text>
      <RatingSelector
      currentRating={props.moods ? props.moods.night : null}
      setter={rating => props.setMood(rating, Time.Night)}
      />
    </>
  );
}

export default Mood;
