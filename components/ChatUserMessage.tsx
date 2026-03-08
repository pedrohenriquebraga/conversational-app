import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export interface ChatUserMessageProps {
  content: string;
  id: string;
}

export const ChatUserMessage = ({content, id}: ChatUserMessageProps) => {
  return (
    <View key={id} style={[styles.container]}>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 12,
  },
  messageBubble: {
    marginLeft: 12,
    maxWidth: '80%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageText: {
    color: '#000000',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    flex: 1,
  },
});
