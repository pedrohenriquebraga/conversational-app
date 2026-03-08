import Message from "@/components/Message";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface IMessage {
  text: string;
  is_right: boolean;
}

const MessagesScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      text: "Teste Mensagem na direita",
      is_right: true,
    },
    {
      text: "Teste mensagem na esquerda",
      is_right: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.message_container}>
        {messages.map((msg, i) => (
          <Message key={i} content={msg.text} isRight={msg.is_right} />
        ))}
      </ScrollView>
      <View style={styles.input_container}>
        <TextInput
          style={styles.message_input}
          placeholderTextColor={"#8E8E93"}
          placeholder="Digite sua mensagem..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.button} disabled={!inputMessage.length}>
          <Feather
            name="send"
            size={20}
            color={"#8E8E93"}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message_container: {
    flex: 1,
    padding: 12,
  },
  input_container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 20,
  },
  message_input: {
    flex: 1,
  },
  button: {},
});

export default MessagesScreen;
