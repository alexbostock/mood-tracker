import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';

import rootReducer from '../reducers';


const MapOfSetTransform = createTransform(
  (inboundState: Map<any, Set<any>>) => {
    return Array.from(inboundState.entries()).map(entry => {
      const [key, set] = entry;
      return [key, Array.from(set)];
    });
  },

  (outboundState: Array<[any, Array<any>]>) => {
    const map = new Map();
    for (const entry of outboundState) {
      const [key, set] = entry;
      map.set(key, new Set(set));
    }
    return map;
  },

  { whitelist: ['activities'] }
);

const MapOfMapTransform = createTransform(
  (inboundState: Map<any, Map<any, any>>) => {
    return Array.from(inboundState.entries()).map(entry => {
      const [key, map] = entry;
      return [key, Array.from(map.entries())];
    });
  },

  (outboundState: Array<[any, Array<[any, any]>]>) => {
    const map = new Map<any, Map<any, any>>();
    for (const entry of outboundState) {
      const [key, subMap] = entry;
      map.set(key, new Map());

      for (const subEntry of subMap) {
        const [subKey, val] = subEntry;
        map.get(key).set(subKey, val);
      };
    }
    return map;
  },

  { whitelist: ['moods'] }
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [
    MapOfSetTransform,
    MapOfMapTransform,
  ],
  whitelist: [
    'activities',
    'moods',
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
