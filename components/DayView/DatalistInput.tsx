import React from 'react';
import { Text, TextInput, TouchableNativeFeedback, View } from 'react-native';

interface Props {
  value: string
  updateValue: (value: string) => void
  label: string
  suggestedValues: Array<string>
}

function DatalistInput(props: Props): JSX.Element {
  return (
    <View>
      <TextInput
        style={inputStyles}
        placeholder={props.label}
        value={props.value}
        onChangeText={props.updateValue}
        />
 
      {
        props.suggestedValues
        .filter(value => props.value !== '' &&
          value.toLowerCase().indexOf(props.value.toLowerCase()) >= 0
        )
        .map(value => (
          <TouchableNativeFeedback
            key={value}
            onPress={() => props.updateValue(value)}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View>
              <Text>{value}</Text>
            </View>
          </TouchableNativeFeedback>
        ))
      }
    </View>
  );
}

const inputStyles = {
  height: 40,
  width: 200,
  borderColor: 'grey',
  borderWidth: 1,

  marginRight: 16,
  padding: 8,
};

export default DatalistInput;
