import ChatInput from '@/components/ChatInput';
import { ChatUserMessage } from '@/components/ChatUserMessage';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoadingResponse?: boolean;
}
const ChatScreen = () => {
  const messages: Message[] = [{
    type: 'user',
    content: 'Olá, IA! Como você está hoje?',
    id: '1',
  }]; // TODO redux Store
  const [promptText, setPromptText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  const handleSend = useCallback(() => {
    if (promptText.trim()) {
      setPromptText('');
    }
  }, [promptText]);

  const renderMessage = useCallback(({item}: {item: Message}) => {
    if (item.type === 'user') {
      return (
        <ChatUserMessage
        id={item.id}
          content={item.content}
        />
      );
    } else {
      return (
        // <IAResponse
        //   message={item.content}
        //   timestamp={item.timestamp}
        //   isLoading={item.isLoading}
        // />
        <></>
      );
    }
  }, []);

  const keyExtractor = useCallback((item: Message) => item.id, []);

  React.useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }, 100);
    }
  }, [messages.length]);

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <FlatList<Message>
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            inverted
            scrollEnabled
            contentContainerStyle={{flexGrow: 1, paddingVertical: 8}}
          />
        </View>

        <View style={styles.inputContainer}>
          <ChatInput
            value={promptText}
            onChangeText={setPromptText}
            placeholder="Escreva uma mensagem..."
            onSendPress={handleSend}
            isLoading={false}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({

  flatListContent: {
    paddingTop: 8,
    paddingBottom: 8,
    flexGrow: 1,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    gap: 16,
  },
  emptyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
  },
});

export default ChatScreen;
