import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  return <View style={styles.container}></View>;
};

export default Message;
