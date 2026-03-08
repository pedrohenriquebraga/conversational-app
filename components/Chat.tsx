import React, { useCallback, useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import ChatInput from './ChatInput';
import { ChatUserMessage } from './ChatUserMessage';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoadingResponse?: boolean;
}
const Chat = ({
  messages,
  onSendMessage,
  isLoadingResponse = false,
}: ChatProps) => {
  const [inputValue, setInputValue] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  }, [inputValue, onSendMessage]);

  const renderMessage = useCallback(({item}: {item: Message}) => {
    if (item.type === 'user') {
      return (
        <ChatUserMessage
          message={item.content}
          timestamp={item.timestamp}
          isLoading={item.isLoading}
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.messagesContainer}>
          <FlatList<Message>
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            inverted
            scrollEnabled
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <View style={styles.emptyState}>
                  <View style={styles.emptyCircle} />
                </View>
              </View>
            }
          />
        </View>

        {/* Loading indicator quando aguardando resposta */}
        {/* {isLoadingResponse && !messages.some(m => m.type === 'ai' && m.isLoading) && (
          <IAResponse
            message=""
            isLoading={true}
            timestamp={new Date()}
          />
        )} */}

        <View style={styles.inputContainer}>
          <ChatInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Escreva uma mensagem..."
            onSendPress={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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

export default Chat;
