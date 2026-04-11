// app/dictionary.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BottomTabs } from "../components/BottomTabs";
import { Header } from "../components/Header";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

// ====== данные словаря (Урок 1) ======
const DICT_PAIRS = [
  { id: "1", meaning: "это, этот", arabic: "هَذَا" },
  { id: "2", meaning: "дом", arabic: "بَيْتٌ (بُيُوتٌ)" },
  { id: "3", meaning: "школа", arabic: "مَدْرَسَةٌ (مَدَارِسُ)" },
  { id: "4", meaning: "дверь", arabic: "بَابٌ (أَبْوَابٌ)" },
  { id: "5", meaning: "книга", arabic: "كِتَابٌ (كُتُبٌ)" },
  { id: "6", meaning: "ручка", arabic: "قَلَمٌ (أَقْلَامٌ)" },
  { id: "7", meaning: "ключ", arabic: "مِفْتَاحٌ (مَفَاتِيحُ)" },
  { id: "8", meaning: "парта", arabic: "مَكْتَبٌ (مَكَاتِبُ)" },
  { id: "9", meaning: "кровать", arabic: "سَرِيرٌ (سُرُرٌ)" },
  { id: "10", meaning: "стул", arabic: "كُرْسِيٌّ (كَرَاسِيُ)" },
  { id: "11", meaning: "Что?", arabic: "مَا؟" },
  { id: "12", meaning: "Вопрос, предлог", arabic: "أَ؟" },
  { id: "13", meaning: "да", arabic: "نَعَمْ" },
  { id: "14", meaning: "нет", arabic: "لَا" },
  { id: "15", meaning: "рубашка", arabic: "قَمِيصٌ (قُمْصَانٌ)" },
  { id: "16", meaning: "звезда", arabic: "نَجْمٌ (نُجُومٌ)" },
  { id: "17", meaning: "мечеть", arabic: "مَسْجِدٌ (مَسَاجِدُ)" },
  { id: "18", meaning: "Кто?", arabic: "مَنْ؟" },
  { id: "19", meaning: "врач", arabic: "طَبِيبٌ (أَطِبَّاءُ)" },
  { id: "20", meaning: "ребенок", arabic: "وَلَدٌ (أَوْلَادٌ)" },
  { id: "21", meaning: "студент", arabic: "طَالِبٌ (طُلَّابٌ)" },
  { id: "22", meaning: "мужчина", arabic: "رَجُلٌ (رِجَالٌ)" },
  { id: "23", meaning: "торговец", arabic: "تَاجِرٌ (تُجَّارٌ)" },
  { id: "24", meaning: "собака", arabic: "كَلْبٌ (كِلَابٌ)" },
  { id: "25", meaning: "кошка", arabic: "قِطٌّ (قِطَطٌ)" },
  { id: "26", meaning: "осел", arabic: "حِمَارٌ (حُمُرٌ)" },
  { id: "27", meaning: "конь", arabic: "حِصَانٌ (حُصُنٌ)" },
  { id: "28", meaning: "верблюд", arabic: "جَمَلٌ (جِمَالٌ)" },
  { id: "29", meaning: "петух", arabic: "دِيكٌ (دِيَكَةٌ)" },
  { id: "30", meaning: "учитель", arabic: "مُدَرِّسٌ (مُدَرِّسُونَ)" },
  { id: "31", meaning: "салфетка", arabic: "مِنْدِيلٌ (مَنَادِيلُ)" },
];

export default function DictionaryScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = DICT_PAIRS.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.meaning.toLowerCase().includes(q) ||
      item.arabic.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Шапка */}
      <Header
        title="Словарь"
        showSearch={true}
        searchPlaceholder="Поиск"
        searchValue={query}
        onSearchChange={setQuery}
      />

      {/* Подзаголовок "Все слова из урока" */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.headerSubtitle}>Все слова из урока</Text>
      </View>

      {/* Контент */}
      <View style={styles.root}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.arabic}>{item.arabic}</Text>
              <Text style={styles.meaning}>{item.meaning}</Text>
            </View>
          ))}

          <View style={{ height: scale(16) }} />
        </ScrollView>
      </View>

      {/* Кнопка "На тренировку" */}
      <TouchableOpacity
        style={styles.trainingButton}
        onPress={() => router.push("../book/./training")}
      >
        <Text style={styles.trainingButtonText}>На тренировку</Text>
      </TouchableOpacity>

      <BottomTabs />
    </SafeAreaView>
  );
}

// ====== Стили ======
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBF8",
  },
  subtitleContainer: {
    alignItems: "center",
    paddingTop: scale(4),
    paddingBottom: scale(6),
  },
  headerSubtitle: {
    fontSize: scale(12),
    color: "#3A2816",
  },
  root: {
    flex: 1,
    backgroundColor: "#F5E9DC",
    paddingHorizontal: scale(16),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: scale(8),
    paddingBottom: scale(16),
  },
  card: {
    backgroundColor: "#FFFBF8",
    borderRadius: scale(12),
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    marginBottom: scale(10),
  },
  arabic: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#3A2816",
    textAlign: "right",
  },
  meaning: {
    fontSize: scale(13),
    color: "#73624E",
    marginTop: scale(4),
  },
  trainingButton: {
    backgroundColor: "#7B5E3F",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    alignItems: "center",
  },
  trainingButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "600",
  },
});
