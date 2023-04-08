import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import ActiveTab from '../reducers/activeTabSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducerToPersist = combineReducers({
  ActiveTab,
});
const persistedReducer = persistReducer(persistConfig, reducerToPersist);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);
export {store, persistor};
