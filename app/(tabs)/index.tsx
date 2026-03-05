import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  type TextProps,
  View,
} from "react-native";

import principles from "@/data/cui-principles.json";

type Principle = {
  id: number;
  name: string;
  description: string;
  guideline: string;
  challengePrompt: string;
  withoutPrinciple: string;
  withPrinciple: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type AppTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle";
};

function ThemedView({ style, ...props }: React.ComponentProps<typeof View>) {
  return <View style={style} {...props} />;
}

function ThemedText({ type = "default", style, ...props }: AppTextProps) {
  return (
    <Text
      style={[
        textStyles.default,
        type === "title" && textStyles.title,
        type === "subtitle" && textStyles.subtitle,
        type === "defaultSemiBold" && textStyles.defaultSemiBold,
        style,
      ]}
      {...props}
    />
  );
}

const PRINCIPLES = principles as Principle[];

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState(PRINCIPLES[0]?.id ?? 1);
  const [usePrinciple, setUsePrinciple] = useState(true);
  const [userInput, setUserInput] = useState(
    PRINCIPLES[0]?.challengePrompt ?? "",
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [testedPrincipleIds, setTestedPrincipleIds] = useState<number[]>([]);
  const surface = "#FFFFFF";
  const textColor = "#0F172A";

  const selected =
    PRINCIPLES.find((principle) => principle.id === selectedId) ??
    PRINCIPLES[0] ??
    null;

  const progress = Math.round(
    (testedPrincipleIds.length / PRINCIPLES.length) * 100,
  );

  const handleSelectPrinciple = (id: number) => {
    const next = PRINCIPLES.find((principle) => principle.id === id);
    if (!next) {
      return;
    }

    setSelectedId(id);
    setUsePrinciple(true);
    setUserInput(next.challengePrompt);
    setMessages([]);
  };

  const handleSimulate = () => {
    if (!selected) {
      return;
    }

    const base = Date.now();
    const safeInput = userInput.trim() || selected.challengePrompt;
    const assistantReply = usePrinciple
      ? selected.withPrinciple
      : selected.withoutPrinciple;

    setMessages((current) => [
      ...current,
      { id: `${selected.id}-${base}-u`, role: "user", content: safeInput },
      {
        id: `${selected.id}-${base}-a`,
        role: "assistant",
        content: assistantReply,
      },
    ]);

    setTestedPrincipleIds((current) => {
      if (current.includes(selected.id)) {
        return current;
      }
      return [...current, selected.id];
    });
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <ThemedView style={[styles.hero, { backgroundColor: "#0C4A6E" }]}>
        <ThemedText type="title" style={styles.heroTitle}>
          10 Princípios de CUI
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Aprenda de forma prática como uma Conversational UI deve responder
          melhor em cenários reais.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.progressCard}>
        <ThemedText type="defaultSemiBold">Progresso de exploração</ThemedText>
        <ThemedText>
          Você já testou {testedPrincipleIds.length} de {PRINCIPLES.length}{" "}
          princípios ({progress}%).
        </ThemedText>
        <View style={[styles.progressTrack, { backgroundColor: "#D1D5DB" }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: "#0EA5E9" },
            ]}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Escolha um princípio</ThemedText>
        <View style={styles.chipsWrap}>
          {PRINCIPLES.map((principle) => {
            const isActive = principle.id === selectedId;
            const isVisited = testedPrincipleIds.includes(principle.id);
            return (
              <Pressable
                key={principle.id}
                onPress={() => handleSelectPrinciple(principle.id)}
                style={[
                  styles.chip,
                  { borderColor: isActive ? "#0284C7" : "#CBD5E1" },
                  isActive && styles.chipActive,
                ]}
              >
                <ThemedText
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {principle.id}. {principle.name}
                  {isVisited ? "  OK" : ""}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>

      {selected ? (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Princípio selecionado</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.selectedTitle}>
            {selected.name}
          </ThemedText>
          <ThemedText>{selected.description}</ThemedText>
          <ThemedView style={styles.tipCard}>
            <ThemedText type="defaultSemiBold">Regra prática</ThemedText>
            <ThemedText>{selected.guideline}</ThemedText>
          </ThemedView>
        </ThemedView>
      ) : null}

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Laboratório interativo</ThemedText>
        <ThemedText>
          Digite uma mensagem e compare a resposta sem e com o princípio.
        </ThemedText>

        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Digite a mensagem do usuário"
          placeholderTextColor="#94A3B8"
          style={[styles.input, { color: textColor, backgroundColor: surface }]}
          multiline
        />

        <ThemedView style={styles.switchRow}>
          <ThemedText type="defaultSemiBold">
            Aplicar princípio na resposta
          </ThemedText>
          <Switch value={usePrinciple} onValueChange={setUsePrinciple} />
        </ThemedView>

        <View style={styles.actionsRow}>
          <Pressable
            onPress={handleSimulate}
            style={[styles.button, styles.primaryButton]}
          >
            <ThemedText style={styles.primaryButtonText}>
              Simular resposta
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={handleResetChat}
            style={[styles.button, styles.ghostButton]}
          >
            <ThemedText type="defaultSemiBold">Limpar conversa</ThemedText>
          </Pressable>
        </View>

        <ThemedView style={styles.chatCard}>
          <ThemedText type="defaultSemiBold">Conversa simulada</ThemedText>
          {messages.length === 0 ? (
            <ThemedText style={styles.chatEmpty}>
              Nenhuma mensagem ainda. Execute a simulação para ver o princípio
              em ação.
            </ThemedText>
          ) : (
            messages.map((message) => {
              const isAssistant = message.role === "assistant";
              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    isAssistant ? styles.assistantBubble : styles.userBubble,
                  ]}
                >
                  <ThemedText type="defaultSemiBold">
                    {isAssistant ? "Assistente" : "Usuário"}
                  </ThemedText>
                  <ThemedText>{message.content}</ThemedText>
                </View>
              );
            })
          )}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 18,
    gap: 16,
    paddingBottom: 44,
  },
  hero: {
    borderRadius: 18,
    padding: 18,
    gap: 8,
  },
  heroTitle: {
    color: "#F8FAFC",
    lineHeight: 38,
  },
  heroSubtitle: {
    color: "#E2E8F0",
  },
  progressCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  section: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8FAFC",
  },
  chipActive: {
    backgroundColor: "#E0F2FE",
  },
  chipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  chipTextActive: {
    color: "#075985",
    fontWeight: "700",
  },
  selectedTitle: {
    fontSize: 18,
  },
  tipCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#0EA5E9",
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    minHeight: 90,
    padding: 10,
    textAlignVertical: "top",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: "#0284C7",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  ghostButton: {
    borderWidth: 1,
    borderColor: "#94A3B8",
    backgroundColor: "#FFFFFF",
  },
  chatCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  chatEmpty: {
    opacity: 0.75,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  userBubble: {
    backgroundColor: "#E2E8F0",
  },
  assistantBubble: {
    backgroundColor: "#DCFCE7",
  },
});

const textStyles = StyleSheet.create({
  default: {
    color: "#0F172A",
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    color: "#0F172A",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    color: "#0F172A",
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "700",
  },
  subtitle: {
    color: "#0F172A",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
  },
});
