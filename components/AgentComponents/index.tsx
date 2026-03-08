import { AIMessageType } from '@/types/chat';
import { renderAIComponents } from '@/utils/componentRenderer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AgentComponentRenderer } from './AgentComponentRenderer';

interface AIResponseProps {
  message: AIMessageType['content'];
  messageId: string;
  isStreaming?: boolean;
  createdAt?: Date;
}

export const AIResponse: React.FC<AIResponseProps> = ({
  message,
  messageId,
  isStreaming,
  createdAt,
}) => {
  const renderedComponents = renderAIComponents(message);

  return (
    <View style={styles.container}>
      <AgentComponentRenderer
        id={messageId}
        components={renderedComponents}
      />
      {isStreaming && (
        <View style={styles.streamingIndicator}>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  streamingIndicator: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
  },
});
