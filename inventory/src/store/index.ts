import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from 'store/auth';
import invetoriesReducer from 'store/inventories';
import drawerReducer from 'store/drawer';
import catalogReducer from 'store/catalog';
import reminderReducer from 'store/reminder';
import themeReducer from 'store/theme';
import langReducer from 'store/lang';
import { listenerMiddleware } from 'store/middelware';

const reducers = combineReducers({
  authReducer,
  invetoriesReducer,
  drawerReducer,
  catalogReducer,
  reminderReducer,
  themeReducer,
  langReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
