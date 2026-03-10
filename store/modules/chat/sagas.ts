// Libs
import { END, eventChannel, EventChannel } from "redux-saga";
import { all, call, put, race, take, takeLatest } from "redux-saga/effects";

// Store
import {
  receiveStreamChunk,
  sendPromptFailure,
  sendPromptRequest,
  sendPromptSuccess,
  stopStreamRequest,
} from "./slice";

// API
import { SendPromptResponseDTO, sendPromptWithStreaming } from "@/api/chat";
import { CallbackStoreFunction } from "@/types/store";

function createStreamingChannel(
  prompt: string,
  signal?: AbortSignal,
): EventChannel<SendPromptResponseDTO> {
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
  const abortController = new AbortController();
  let wasStopped = false;

  const channel: EventChannel<SendPromptResponseDTO> = yield call(
    createStreamingChannel,
    prompt,
    abortController.signal,
  );

  try {
    while (true) {
      const { chunk, stop }: { chunk?: SendPromptResponseDTO; stop?: unknown } =
        yield race({
          chunk: take(channel),
          stop: take(stopStreamRequest.type),
        });

      if (stop) {
        wasStopped = true;
        abortController.abort();
        break;
      }

      if (chunk) {
        yield put(receiveStreamChunk(chunk));
      }
    }
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || "An error occurred while sending prompt.";

    console.error("error:", JSON.stringify(errorMessage));

    yield callbackFunction?.("error", errorMessage);
    yield put(sendPromptFailure());
    return;
  } finally {
    channel.close();
    if (wasStopped) {
      yield callbackFunction?.("success", "Stream stopped by user.");
    } else {
      yield callbackFunction?.("success", "");
    }
    yield put(sendPromptSuccess());
  }
}

export default all([takeLatest(sendPromptRequest, sendPrompt)]);
