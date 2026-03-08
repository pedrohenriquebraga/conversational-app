import { combineReducers } from '@reduxjs/toolkit';

import chat from './chat/slice';

const rootReducer = combineReducers({
  chat
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
