import { AIMessageType } from "../../types/chat";



export interface SendPromptRequestDTO {
  prompt: string;
}

export interface SendPromptResponseDTO {
  type: 'message';
  messageId: string;
  content: AIMessageType['content'];
}
