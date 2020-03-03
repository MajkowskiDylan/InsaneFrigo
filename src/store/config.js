import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import updateQuota from './reducers/quotaReducer';
import settingPreferance from './reducers/SettingReducer';
import updateIngredients from './reducers/updateListReducer';
import savedRecipes from './reducers/recipeReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

const combinedReducer = combineReducers({
  updateQuota,
  settingPreferance,
  updateIngredients,
  savedRecipes
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

//purgeStoredState(persistConfig); // A utiliser state fait n'imp pour le purger

export const store = createStore(persistedReducer);
export let persistor = persistStore(store);