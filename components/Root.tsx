import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import DayView from './DayView';
import Insights from './Insights';
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
      case Screen.Insights:
        return (
          <Insights />
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
    <View style={styles.nav}>
      {renderScreen()}

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.navButton}>
          <Button
            title="Main"
            onPress={() => setCurrentScreen(Screen.DayView)}
          />
        </View>

        <View style={styles.navButton}>
          <Button
            title="Insights"
            onPress={() => setCurrentScreen(Screen.Insights)}
          />
        </View>

        <View style={styles.navButton}>
          <Button
            title="Settings"
            onPress={() => setCurrentScreen(Screen.Preferences)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,

    alignItems: 'center',
  },

  navButton: {
    margin: 12,
    width: 92,
  }
});

export default Root;
