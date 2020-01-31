import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';

import rootReducer from '../reducers';
import {
  inboundMapTransform,
  inboundSetTranform,
  outboundMapTransform,
  outboundSetTransform
} from './transforms';
import { MedsRecord } from './types';

const MapTransform = createTransform(
  inboundMapTransform(x => x),
  outboundMapTransform(x => x),
  { whitelist: ['knownActivities', 'moods', 'sleep'] },
);

const MapOfSetTransform = createTransform(
  inboundMapTransform(inboundSetTranform(x => x)),
  outboundMapTransform(outboundSetTransform(x => x)),
  { whitelist: ['activities'] },
);

const MapOfMedsDataTransform = createTransform(
  inboundMapTransform((val: { conf: MedsRecord, taken: Set<string> }) => ({
    conf: val.conf,
    taken: inboundSetTranform(x => x)(val.taken),
  })),
  outboundMapTransform((val: { conf: MedsRecord, taken: Array<string>}) => ({
    conf: val.conf,
    taken: outboundSetTransform(x => x)(val.taken),
  })),
  { whitelist: ['meds'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    MapTransform,
    MapOfSetTransform,
    MapOfMedsDataTransform,
  ],
  whitelist: [
    'activities',
    'knownActivities',
    'moods',
    'sleep',
    'meds',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
  ),
);

const persistor = persistStore(store);

export {
  store,
  persistor,
};
