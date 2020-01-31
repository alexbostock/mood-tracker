import React, { useState } from 'react';

import DayView from './DayView';

import { Screen } from '../store/types';

function Root(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState(Screen.DayView);
  const [dateDisplayed, setDateDisplayed] = useState(new Date());

  switch (currentScreen) {
    case Screen.DayView:
      return (
        <DayView
          changeScreen={setCurrentScreen}
          date={dateDisplayed}
          setDate={setDateDisplayed}
        />
      );
    default:
      console.error('Unknown Screen', currentScreen);
      return null;
  }
}

export default Root;
