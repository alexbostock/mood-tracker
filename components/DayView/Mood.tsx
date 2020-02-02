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
      <RatingSelector
        title={props.sleepRating ? 'Sleep rating' : 'How did you sleep?'}
        currentRating={props.sleepRating}
        setter={props.setSleepRating}
      />

      <RatingSelector
        title={'Morning mood'}
        currentRating={props.moods ? props.moods.morning : null}
        setter={rating => props.setMood(rating, Time.Morning)}
      />

      <RatingSelector
        title={'Evening mood'}
        currentRating={props.moods ? props.moods.night : null}
        setter={rating => props.setMood(rating, Time.Night)}
      />
    </>
  );
}

export default Mood;
