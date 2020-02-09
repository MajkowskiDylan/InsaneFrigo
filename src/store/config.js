import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import updateQuota from './reducer/quotaReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const persistedReducer = persistReducer(persistConfig, updateQuota);

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);