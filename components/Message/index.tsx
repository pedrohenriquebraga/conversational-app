import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

interface MessageProps {
  content: string;
  isRight?: boolean;
}

const Message: React.FC<MessageProps> = ({ content, isRight }) => {
  return (
    <View
      style={{
        ...styles.container,
        alignSelf: isRight ? "flex-end" : "flex-start",
        backgroundColor: isRight ? "#99999907" : undefined,
      }}
    >
      <Text
        style={{
          ...styles.message_text,
          color: isRight ? "#8E8E93" : undefined,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default Message;
