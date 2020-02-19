import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import updateQuota from './reducer/quotaReducer';
import settingPreferance from './reducer/SettingReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const combinedReducer = combineReducers({
  updateQuota,
  settingPreferance
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

purgeStoredState(persistConfig); // a utiliser pour purger tt purger si le state devien n'importe quoi 

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);