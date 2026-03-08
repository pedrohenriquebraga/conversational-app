import ChatInput from '@/components/ChatInput';
import { ChatUserMessage } from '@/components/ChatUserMessage';
import { Message } from '@/types/chat';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { AIResponse } from '../../components/AgentComponents';

const ChatScreen = () => {
  const messages: Message[] = [
    {
      type: 'user',
      content: 'Olá, IA! Como você está hoje?',
      id: '1',
    },
    {
      type: 'ai',
      id: '2',
      content: [
        {
          type: 'TextH1',
          id: 'h1-1',
          props: {
            children: 'Como iniciar no desenvolvimento mobile?',
            style: {
              color: 'red',
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 20,
            },
          },
        },
        {
          type: 'TextParagraph',
          id: 'p-1',
          props: {
            children:
              'O desenvolvimento mobile é uma área em crescimento constante. Existem várias plataformas e linguagens que você pode aprender para iniciar sua carreira.',
            style: {
              fontSize: 15,
              lineHeight: 24,
              color: '#333333',
            },
          },
        },
      ],
    },
  ];

  const [promptText, setPromptText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  const handleSend = useCallback(() => {
    if (promptText.trim()) {
      // Dispatch action ao Redux
      // dispatch(sendPromptRequest(promptText));
      setPromptText('');
    }
  }, [promptText]);

  const renderMessage = useCallback(({ item }: { item: Message }) => {
  // Mensagem do usuário
  if (item.type === 'user') {
    return (
      <ChatUserMessage
        id={item.id}
        content={item.content}
      />
    );
  }

  // Mensagem da IA
  return (
    <AIResponse
      message={item.content}
      messageId={item.id}
      isStreaming={item.isStreaming}
      createdAt={item.createdAt}
    />
  );
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
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          <FlatList<Message>
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            scrollEnabled
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 8, justifyContent: 'flex-end' }}
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
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  aiMessageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flatListContent: {
    paddingTop: 8,
    paddingBottom: 8,
    flexGrow: 1,
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
