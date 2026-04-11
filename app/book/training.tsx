// app/book/training.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

// 🔤 Временно жёстко заданные слова — позже можно передавать пропсы или грузить из хранилища
const WORDS = [
  { id: "1", arabic: "هَذَا", meaning: "это, этот" },
  { id: "2", arabic: "بَيْتٌ", meaning: "дом" },
  { id: "3", arabic: "كِتَابٌ", meaning: "книга" },
];

export default function TrainingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);

  const current = WORDS[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % WORDS.length);
    setFlipped(false);
  };

  const handleKnow = () => {
    setKnown((k) => k + 1);
    next();
  };

  const handleLearning = () => {
    setLearning((l) => l + 1);
    next();
  };

  return (
    <View style={styles.container}>
      {/* Навигация */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Тренировка</Text>
        <View style={{ width: scale(24) }} />
      </View>

      {/* Статистика */}
      <View style={styles.statsRow}>
        <Text style={styles.stat}>Знаю: {known}</Text>
        <Text style={styles.stat}>Ещё изучаю: {learning}</Text>
      </View>

      {/* Карточка */}
      <TouchableOpacity style={styles.card} onPress={() => setFlipped((f) => !f)}>
        <Text style={styles.cardText}>
          {flipped ? current.meaning : current.arabic}
        </Text>
        {!flipped && <Text style={styles.flipHint}>Нажмите чтобы перевернуть</Text>}
      </TouchableOpacity>

      {/* Кнопки */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnLight} onPress={handleLearning}>
          <Text style={styles.btnTextDark}>Ещё изучаю</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDark} onPress={handleKnow}>
          <Text style={styles.btnTextLight}>Знаю</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F1",
    paddingTop: scale(40),
    paddingHorizontal: scale(16),
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(10),
  },
  backBtn: {
    fontSize: scale(22),
    color: "#7B5E3F",
  },
  title: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#3A2816",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: scale(8),
  },
  stat: {
    fontSize: scale(16),
    color: "#3A2816",
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
    padding: scale(24),
    marginVertical: scale(16),
  },
  cardText: {
    fontSize: scale(32),
    color: "#4B3621",
    textAlign: "center",
  },
  flipHint: {
    marginTop: scale(12),
    fontSize: scale(14),
    color: "#998675",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: scale(24),
  },
  btnLight: {
    backgroundColor: "#F0E6DD",
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
  },
  btnDark: {
    backgroundColor: "#7B5E3F",
    paddingVertical: scale(12),
    paddingHorizontal: scale(24),
    borderRadius: scale(8),
  },
  btnTextDark: {
    color: "#3A2816",
    fontSize: scale(16),
  },
  btnTextLight: {
    color: "#FFFFFF",
    fontSize: scale(16),
  },
});
