import React from 'react';

import { Rating } from '../store/types';
import { Button, View } from 'react-native';

const allRatings = [
  Rating.Bad,
  Rating.QuiteBad,
  Rating.Neutral,
  Rating.QuiteGood,
  Rating.Good,
];

interface Props {
  currentRating: Rating
  setter: (rating: Rating) => void
}

function RatingSelector(props: Props): JSX.Element {
  const button = (rating: Rating) => (
    <View key={rating} style={rating === props.currentRating ? highlightedStyle : {}}>
      <Button
        title={rating.toString()}
        onPress={() => props.setter(rating)}
      />
    </View>
  );
    
  return (
    <View style={{ flexDirection: 'row' }}>
      {allRatings.map(rating => button(rating))}
    </View>
  );
}

const highlightedStyle = {
  borderColor: 'red',
  borderWidth: 1,
};

export default RatingSelector;
