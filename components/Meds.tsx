import React from 'react';
import { CheckBox, Text, View} from 'react-native';

import { MedsRecord, printTime } from '../store/types';

interface Props {
  meds: Array<[MedsRecord, boolean]>
  medsTaken: (name: string) => void
  medsNotTaken: (name: string) => void
}

function Meds(props: Props): JSX.Element {
  return (
    <>
      {props.meds.map(([conf, taken]) => (
        <View key={conf.name} style={{ flexDirection: 'row' }}>
          <Text>{conf.name}: {printTime(conf.time)}</Text>
          <CheckBox
            value={taken}
            onValueChange={taken =>
              (taken ? props.medsTaken : props.medsNotTaken)(conf.name)}
          />
        </View>
      ))}
    </>
  );
}

export default Meds;
