import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import Auth from '../reducers/authSlice';
import ActiveTab from '../reducers/activeTabSlice';
import Common from '../reducers/commonSlice';
import Favourites from '../reducers/favouriteSlice';
import Community from '../reducers/communitySlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducerToPersist = combineReducers({
  Auth,
  ActiveTab,
  Common,
  Community,
  Favourites,
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
