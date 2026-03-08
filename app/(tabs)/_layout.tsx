import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00A52C",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mensagens",
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-square" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configs"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
