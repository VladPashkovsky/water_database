import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice.ts'
import waterReducer from './reducers/waterSlice.ts'
import { apiAuth, apiWater } from '../services/api.ts'
import { authMiddleware } from './middleware/authMiddleware.ts'
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  authReducer,
  waterReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiWater.reducerPath]: apiWater.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [apiAuth.reducerPath, apiWater.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiAuth.middleware, apiWater.middleware)
      .prepend(authMiddleware.middleware),
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;