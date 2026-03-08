import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSagas from './modules/rootSaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.EXPO_PUBLIC_ENV !== 'prd',
});

sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;

export { store };

