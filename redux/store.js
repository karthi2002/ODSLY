import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { profileApi } from './apis/profileApi';
import { postsApi } from './apis/postsApi';
import sessionReducer from './session/sessionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action) => action?.error?.status === 401,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(postsApi.util.resetApiState());
    listenerApi.dispatch(profileApi.util.resetApiState());
  },
});

const rootReducer = combineReducers({
  [profileApi.reducerPath]: profileApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  session: sessionReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [profileApi.reducerPath, postsApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(profileApi.middleware, postsApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);