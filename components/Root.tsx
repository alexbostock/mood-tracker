import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import DayView from './DayView';
import Preferences from './Preferences';

import { Screen } from '../store/types';

function Root(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState(Screen.DayView);
  const [dateDisplayed, setDateDisplayed] = useState(new Date());

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DayView:
        return (
          <DayView
            date={dateDisplayed}
            setDate={setDateDisplayed}
          />
        );
      case Screen.Preferences:
        return (
          <Preferences />
        );
      default:
        console.error('Unknown Screen', currentScreen);
        return <Text>Something went wrong</Text>;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}

      <View style={{ flexDirection: 'row' }}>
        <Button
          title="Main"
          onPress={() => setCurrentScreen(Screen.DayView)}
        />

        <Button
          title="Settings"
          onPress={() => setCurrentScreen(Screen.Preferences)}
        />
      </View>
    </View>
  );
  // TODO: navigation
}

export default Root;
