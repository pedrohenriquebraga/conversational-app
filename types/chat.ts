import { TextStyle } from 'react-native';

export type AvailableAIComponents = 'TextH1' | 'TextParagraph' | 'TextList';

export interface ListItem {
  text: string;
  style?: TextStyle;
}

export interface AIComponentProps {
  children?: string;
  items?: ListItem[];
  style?: TextStyle;
}

export interface AIComponent {
  type: AvailableAIComponents;
  props: AIComponentProps;
  id: string;
}

export interface UserMessageType {
  type: 'user';
  id: string;
  content: string;
  createdAt?: Date;
  isStreaming?: false;
}

export interface AIMessageType {
  type: 'ai';
  id: string;
  content: AIComponent[];
  createdAt?: Date;
  isStreaming?: boolean;
}

export type Message = UserMessageType | AIMessageType;

export interface ChatState {
  selectedChat: {
    id: string;
    messages: Message[];
  };
  uiState: {
    isStreaming: boolean;
    error: string | null;
  };
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoadingResponse?: boolean;
}
