import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import updateQuota from './reducers/quotaReducer';
import settingPreferance from './reducers/SettingReducer';
import updateList from './reducers/updateListReducer';
import savedRecipes from './reducers/recipeReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const combinedReducer = combineReducers({
  updateQuota,
  settingPreferance,
  updateList,
  savedRecipes
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

//purgeStoredState(persistConfig); // a utiliser pour purger tt purger si le state devien n'importe quoi 

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);