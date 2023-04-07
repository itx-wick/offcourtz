import {applyMiddleware, combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import activeTabReducer from '../../components/bottom-tab/activeTab/activeTab.reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [],
  // blacklist: [],
  // debug :true,
};

const rootReducer = combineReducers({
  activeTab: activeTabReducer,
});

export const reduxStore = configureStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk),
);

export const persistor = persistStore(reduxStore);
