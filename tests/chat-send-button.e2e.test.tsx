import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import ChatInput from "../components/ChatInput";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({
    testID,
    name,
    color,
  }: {
    testID?: string;
    name: string;
    color: string;
  }) => {
    const React = require("react");
    const { Text } = require("react-native");
    return React.createElement(Text, { testID, color }, `${name}:${color}`);
  },
}));

describe("ChatInput E2E - send button", () => {
  it("deve iniciar com botao desabilitado e icone send cinza quando input estiver vazio", () => {
    const { getByTestId } = render(
      <ChatInput
        value=""
        onChangeText={() => undefined}
        isLoading={false}
        onSendPress={() => undefined}
      />,
    );

    expect(
      getByTestId("chat-send-button").props.accessibilityState.disabled,
    ).toBe(true);
    expect(getByTestId("chat-send-icon").props.color).toBe("#9CA3AF");
  });

  it("deve habilitar envio e manter icone send azul quando houver texto", () => {
    const { getByTestId } = render(
      <ChatInput
        value="mensagem"
        onChangeText={() => undefined}
        isLoading={false}
        onSendPress={() => undefined}
      />,
    );

    expect(
      getByTestId("chat-send-button").props.accessibilityState.disabled,
    ).toBe(false);
    expect(getByTestId("chat-send-icon").props.color).toBe("#3B82F6");
  });

  it("deve mudar para estado de streaming e exibir icone stop vermelho ao clicar em enviar", async () => {
    const Harness = () => {
      const [value, setValue] = React.useState("");
      const [isLoading, setIsLoading] = React.useState(false);

      return (
        <View>
          <ChatInput
            value={value}
            onChangeText={setValue}
            isLoading={isLoading}
            onSendPress={() => setIsLoading(true)}
            onStopPress={() => setIsLoading(false)}
          />
        </View>
      );
    };

    const { getByTestId, queryByTestId } = render(<Harness />);

    fireEvent.changeText(getByTestId("chat-input-field"), "ola");
    fireEvent.press(getByTestId("chat-send-button"));

    await waitFor(() => {
      expect(queryByTestId("chat-send-icon")).toBeNull();
      expect(getByTestId("chat-stop-icon")).toBeTruthy();
      expect(getByTestId("chat-stop-icon").props.color).toBe("#fa4949");
    });
  });

  it("deve voltar de stop para send ao clicar no botao durante loading", async () => {
    const Harness = () => {
      const [value, setValue] = React.useState("ola");
      const [isLoading, setIsLoading] = React.useState(false);

      return (
        <View>
          <ChatInput
            value={value}
            onChangeText={setValue}
            isLoading={isLoading}
            onSendPress={() => setIsLoading(true)}
            onStopPress={() => setIsLoading(false)}
          />
        </View>
      );
    };

    const { getByTestId, queryByTestId } = render(<Harness />);

    fireEvent.press(getByTestId("chat-send-button"));
    await waitFor(() => {
      expect(getByTestId("chat-stop-icon")).toBeTruthy();
    });

    fireEvent.press(getByTestId("chat-send-button"));
    await waitFor(() => {
      expect(queryByTestId("chat-stop-icon")).toBeNull();
      expect(getByTestId("chat-send-icon")).toBeTruthy();
    });
  });
});
