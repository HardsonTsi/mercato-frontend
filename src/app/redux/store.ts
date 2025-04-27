import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import { authApi } from '@/app/redux/api/authApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { fileApi } from '@/app/redux/api/fileApi.ts';
import { clubApi } from '@/app/redux/api/clubApi.ts';

const persistAuthStoreConfig = (key: string) => ({
  key,
  version: 1,
  storage,
});

const authPersisteReducer = persistReducer(
  persistAuthStoreConfig('auth'),
  authReducer,
);

const rootReducer = combineReducers({
  auth: authPersisteReducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [clubApi.reducerPath]: clubApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      fileApi.middleware,
      clubApi.middleware,
    ),
  devTools: true,
});

export const persistStoreData = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

setupListeners(store.dispatch);
