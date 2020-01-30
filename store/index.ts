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

const MapTransform = createTransform(
  inboundMapTransform(x => x),
  outboundMapTransform(x => x),
  { whitelist: ['knownActivities', 'sleep'] },
);

const MapOfSetTransform = createTransform(
  inboundMapTransform(inboundSetTranform(x => x)),
  outboundMapTransform(outboundSetTransform(x => x)),
  { whitelist: ['activities'] },
);

const MapOfMapTransform = createTransform(
  inboundMapTransform(inboundMapTransform(x => x)),
  outboundMapTransform(outboundMapTransform(x => x)),
  { whitelist: ['moods'] },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    MapTransform,
    MapOfSetTransform,
    MapOfMapTransform,
  ],
  whitelist: [
    'activities',
    'knownActivities',
    'moods',
    'sleep',
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
