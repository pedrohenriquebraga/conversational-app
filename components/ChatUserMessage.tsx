import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export interface ChatUserMessageProps {
  message: string;
  timestamp?: Date;
  isLoading?: boolean;
}

export const ChatUserMessage = ({message}: ChatUserMessageProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{message}</Text>
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
    backgroundColor: '#9c9c9c',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    flex: 1,
  },
});
