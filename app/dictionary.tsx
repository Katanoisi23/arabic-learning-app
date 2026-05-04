import { Ionicons } from "@expo/vector-icons";
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
import { DICT_PAIRS } from "../data/dictionary";
import { useProgress } from "../context/ProgressContext";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

export default function DictionaryScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { completedLessons } = useProgress();

  const availableWords = DICT_PAIRS.filter(word => completedLessons.map(Number).includes(Number(word.lessonId)));

  const filtered = availableWords.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.meaning.toLowerCase().includes(q) ||
      item.singular.toLowerCase().includes(q) ||
      item.plural.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Словарь"
        showSearch={completedLessons.length > 0}
        searchPlaceholder="Поиск"
        searchValue={query}
        onSearchChange={setQuery}
      />

      {completedLessons.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Сначала пройдите хотя бы одну главу</Text>
        </View>
      ) : (
        <>
          <View style={styles.subtitleContainer}>
            <Text style={styles.headerSubtitle}>Все слова из пройденных уроков</Text>
          </View>

          <View style={styles.root}>
            {/* Заголовок таблицы */}
            <View style={styles.tableHeader}>
              <View style={[styles.headerCell, { flex: 1.2 }]}>
                <Text style={styles.headerText}>Слово</Text>
              </View>
              <View style={[styles.headerCell, { flex: 1.5 }]}>
                <Text style={styles.headerText}>Мн.число</Text>
              </View>
              <View style={[styles.headerCell, { flex: 1.5 }]}>
                <Text style={styles.headerText}>Ед.число</Text>
              </View>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {filtered.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={[styles.dataCell, { flex: 1.2 }]}>
                    <Text style={styles.dataTextRu}>{item.meaning}</Text>
                  </View>
                  <View style={[styles.dataCell, { flex: 1.5 }]}>
                    <Text style={styles.dataTextAr}>{item.plural}</Text>
                  </View>
                  <View style={[styles.dataCell, { flex: 1.5 }]}>
                    <Text style={styles.dataTextAr}>{item.singular}</Text>
                  </View>
                </View>
              ))}

              <View style={{ height: scale(16) }} />
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.trainingButton}
            onPress={() => router.push("../book/./training")}
          >
            <Ionicons name="stopwatch" size={scale(20)} color="#FFFFFF" style={{ marginRight: scale(8) }} />
            <Text style={styles.trainingButtonText}>На тренировку</Text>
          </TouchableOpacity>
        </>
      )}

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F0E8",
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
    backgroundColor: "#F5F0E8",
    paddingHorizontal: scale(16),
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: scale(4), // to align with inner cells of the white container
    marginBottom: scale(8),
    gap: scale(4),
  },
  headerCell: {
    backgroundColor: "#8D7456",
    paddingVertical: scale(10),
    paddingHorizontal: scale(4),
    borderRadius: scale(6),
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: scale(12),
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(16),
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(8),
    padding: scale(4),
    marginBottom: scale(8),
    gap: scale(4),
  },
  dataCell: {
    backgroundColor: "#F2EAE0",
    borderRadius: scale(6),
    paddingVertical: scale(14),
    paddingHorizontal: scale(4),
    justifyContent: "center",
    alignItems: "center",
  },
  dataTextRu: {
    color: "#3A2816",
    fontSize: scale(12),
    fontWeight: "600",
    textAlign: "center",
  },
  dataTextAr: {
    color: "#3A2816",
    fontSize: scale(16),
    fontWeight: "500",
    textAlign: "center",
  },
  trainingButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8D7456",
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    marginTop: scale(16),
  },
  trainingButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(32),
  },
  emptyText: {
    fontSize: scale(16),
    color: "#8A6D53",
    textAlign: "center",
    lineHeight: scale(24),
  },
});
