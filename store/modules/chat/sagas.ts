// Libs
import { END, eventChannel, EventChannel } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';

// Store
import { receiveStreamChunk, sendPromptFailure, sendPromptRequest, sendPromptSuccess } from './slice';

// API
import { SendPromptResponseDTO, sendPromptWithStreaming } from '@/api/chat';
import { CallbackStoreFunction } from '@/types/store';

function createStreamingChannel(prompt: string, signal?: AbortSignal): EventChannel<SendPromptResponseDTO> {
  return eventChannel((emit) => {
    sendPromptWithStreaming({
      prompt,
      signal,
      onChunk: (chunk) => {
        emit(chunk);
      },
    })
      .then(() => emit(END))
      .catch((err) => emit(END));

    return () => {};
  });
}

export function* sendPrompt({
  payload,
}: {
  payload: {
    prompt: string;
    callbackFunction?: CallbackStoreFunction;
  };
}) {
  const { prompt, callbackFunction } = payload;

  const channel: EventChannel<SendPromptResponseDTO> = yield call(
    createStreamingChannel,
    prompt,
  );

  try {
    while (true) {
      const chunk: SendPromptResponseDTO = yield take(channel);
      yield put(receiveStreamChunk(chunk));
    }
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || 'An error occurred while sending prompt.';

    console.error('error:', JSON.stringify(errorMessage));

    yield callbackFunction?.('error', errorMessage);
    yield put(sendPromptFailure());
    return;
  } finally {
    channel.close();
    yield callbackFunction?.('success', '');
    yield put(sendPromptSuccess());
  }
}

export default all([takeLatest(sendPromptRequest, sendPrompt)]);
