import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const ChatInput = ({
  value,
  onChangeText,
  placeholder,
  onSendPress,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSendPress?: () => void;
}) => {
  const inputRef = useRef<RNTextInput>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <RNTextInput
            ref={inputRef}
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || 'Escreva uma mensagem...'}
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={4096}
            editable
            scrollEnabled
          />
          {value.trim().length > 0 && (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                onSendPress?.();
                inputRef.current?.clear();
              }}
              activeOpacity={0.7}>
              <Ionicons name="send" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  inputWrapper: {
    marginVertical: 12,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    maxHeight: 100,
  },
  sendButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatInput;
