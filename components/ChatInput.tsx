import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const ChatInput = ({
  value,
  onChangeText,
  placeholder,
  onSendPress,
  onStopPress,
  isLoading,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSendPress?: () => void;
  onStopPress?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <RNTextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || "Escreva uma mensagem..."}
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={4096}
            editable={!isLoading}
            scrollEnabled
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: isLoading ? "#ff9f9fb0" : "transparent" },
            ]}
            disabled={!isLoading && value.trim() === ""}
            onPress={() => {
              if (isLoading) {
                onStopPress?.();
                return;
              }

              onSendPress?.();
            }}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <Ionicons name="stop" size={12} color="#fa4949" />
            ) : (
              <Ionicons
                name="send"
                size={20}
                color={value.trim() === "" ? "#9CA3AF" : "#3B82F6"}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  inputWrapper: {
    marginVertical: 12,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    maxHeight: 100,
  },
  sendButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});

export default ChatInput;
