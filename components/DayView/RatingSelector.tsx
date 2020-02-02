import React from 'react';

import { Rating } from '../../store/types';
import { Button, Text, View } from 'react-native';

const allRatings = [
  Rating.Bad,
  Rating.QuiteBad,
  Rating.Neutral,
  Rating.QuiteGood,
  Rating.Good,
];

interface Props {
  title: string
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
    <>
      <Text style={{ marginBottom: 8 }}>{props.title}</Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>  
        {allRatings.map(rating => button(rating))}
      </View>
    </>
  );
}

const highlightedStyle = {
  borderColor: 'red',
  borderWidth: 1,
};

export default RatingSelector;
