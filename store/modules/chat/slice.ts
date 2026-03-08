import { AIComponent, AIMessageType, Message, UserMessageType } from '@/types/chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SendPromptPayload {
  prompt: string;
  callbackFunction?: (
    status: 'success' | 'error',
    message: string,
    data?: any
  ) => void;
}

export interface IInitialStateDTO {
  selectedChat: {
    id: string;
    messages: Message[];
  };
  isStreaming: boolean;
}

const initialState: IInitialStateDTO = {
  selectedChat: {
    id: 'chat-1',
    messages: [],
  },
  isStreaming: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    /**
     * Ação: usuário envia mensagem
     */
    sendPromptRequest(
      state,
      action: PayloadAction<SendPromptPayload>,
    ) {
      const { prompt } = action.payload;
      state.isStreaming = true;

      // Adiciona mensagem do usuário
      const userMessage: UserMessageType = {
        type: 'user',
        id: `msg-${Date.now()}`,
        content: prompt,
        createdAt: new Date(),
      };
      state.selectedChat.messages.push(userMessage);
    },

    /**
     * Ação: recebe resposta completa do stream
     */
    receiveStreamChunk(
      state,
      action: PayloadAction<{
        messageId: string;
        content: AIComponent[];
      }>,
    ) {
      const message = state.selectedChat.messages.find(
        (m) => m.id === action.payload.messageId,
      );

      if(!message) {
        state.selectedChat.messages.push({
          id: action.payload.messageId,
          type: 'ai',
          content: action.payload.content,
          createdAt: new Date(),
        } as any);
      }else if (message) {
        const aiMessage = message as AIMessageType;
        aiMessage.content = action.payload.content;
      }
    },

    /**
     * Ação: stream finaliza com sucesso
     */
    sendPromptSuccess(state) {
      state.isStreaming = false;
    },

    /**
     * Ação: usuário clica stop
     */
    stopStreamRequest(state) {
      state.isStreaming = false;
    },

    /**
     * Ação: erro na request
     */
    sendPromptFailure(state) {
      state.isStreaming = false;
    }

  },
});

export const {
  sendPromptRequest,
  receiveStreamChunk,
  sendPromptSuccess,
  stopStreamRequest,
  sendPromptFailure
} = chatSlice.actions;

export default chatSlice.reducer;
