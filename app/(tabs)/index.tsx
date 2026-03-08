import Message from "@/components/Message";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MessagesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.message_container}>
        <Message content="Teste mensagem ao lado direito" isRight />
        <Message content="Teste mensagem ao lado esquerdo" />
      </ScrollView>
      <View style={styles.input_container}>
        <TextInput
          style={styles.message_input}
          placeholderTextColor={"#8E8E93"}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={styles.button}>
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
