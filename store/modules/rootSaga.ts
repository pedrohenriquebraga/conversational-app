import { all } from 'typed-redux-saga';

import chat from './chat/sagas';

export default function* rootSaga() {
  return yield* all([
    chat
  ]);
}
