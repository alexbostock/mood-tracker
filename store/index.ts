import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';

import rootReducer from '../reducers';


const MapOfSetTransform = createTransform(
  (inboundState: Map<string, Set<string>>) => {
    return Array.from(inboundState.entries()).map(entry => {
      const [key, set] = entry;
      return [key, Array.from(set)];
    });
  },

  (outboundState: Array<[string, Array<string>]>) => {
    const map = new Map();
    for (const entry of outboundState) {
      const [key, set] = entry;
      map.set(key, new Set(set));
    }
    return map;
  },

  { whitelist: ['activities'] }
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    MapOfSetTransform,
  ],
  whitelist: [
    'activities',
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
