// app/lessons.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomTabs } from "../components/BottomTabs";
import { Header } from "../components/Header";
// Импортируем твои реальные данные
import { Chapter, MEDINA_CHAPTERS } from "../data/books/medina/chapters";

export default function LessonsScreen() {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтруем реальные главы по поиску
  const filteredChapters = MEDINA_CHAPTERS.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.arabicTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderChapter = ({ item }: { item: Chapter }) => (
    <TouchableOpacity
      style={styles.chapterCard}
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: "/chapters/[chapterId]",
          params: {
            chapterId: item.id,
            bookId: bookId || "1",
          },
        })
      }
    >
      {/* Номер главы - БОЛЬШОЙ как на макете */}
      <View style={styles.chapterNumber}>
        <Text style={styles.chapterNumberText}>{item.id}</Text>
      </View>

      {/* Информация о главе */}
      <View style={styles.chapterInfo}>
        <Text style={styles.chapterTitle}>{item.title}</Text>
        <Text style={styles.chapterDescription}>{item.description}</Text>
        <Text style={styles.chapterArabic}>{item.arabicTitle}</Text>
        {/* Динамически считаем количество уроков в массиве lessonIds */}
        <Text style={styles.lessonsCount}>{item.lessonIds.length} урока</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFE6DC" />

      {/* Хедер для страницы уроков */}
      <Header
        title={`Том ${bookId || "1"}`}
        showSearch={true}
        searchPlaceholder="Поиск"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Основной контент */}
      <View style={styles.contentContainer}>
        {/* Список глав */}
        <FlatList
          data={filteredChapters}
          renderItem={renderChapter}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Главы не найдены</Text>
            </View>
          }
        />
      </View>

      {/* Нижний таббар */}
      <BottomTabs />
    </SafeAreaView>
  );
}

// Стили остались без изменений
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFE6DC",
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  chapterCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F6EFE8",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  chapterNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E6DBD0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginTop: 4,
  },
  chapterNumberText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  chapterDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  chapterArabic: {
    fontSize: 16,
    color: "#B89B7D",
    marginBottom: 8,
    textAlign: "right",
    fontWeight: "500",
  },
  lessonsCount: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    marginTop: 16,
  },
});



