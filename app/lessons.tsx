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
import { Chapter, MEDINA_CHAPTERS } from "../data/books/medina/chapters";
import { scale } from "../styles";

export default function LessonsScreen() {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const [searchQuery, setSearchQuery] = useState("");

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
      <View style={styles.chapterNumber}>
        <Text style={styles.chapterNumberText}>{item.id}</Text>
      </View>

      <View style={styles.chapterInfo}>
        <View style={styles.chapterInfoLeft}>
          <Text style={styles.chapterTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.chapterDescription} numberOfLines={1}>{item.description}</Text>
        </View>
        <View style={styles.chapterInfoRight}>
          <Text style={styles.chapterArabic}>{item.arabicTitle}</Text>
          <Text style={styles.lessonsCount}>{item.lessonIds.length} урока</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFE6DC" />

      <Header
        title={`Том ${bookId || "1"}`}
        showSearch={true}
        searchPlaceholder="Поиск"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <View style={styles.contentContainer}>
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

      <BottomTabs />
    </SafeAreaView>
  );
}

// Стили остались без изменений
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F0E8",
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: scale(14),
    paddingHorizontal: scale(20),
    paddingBottom: scale(30),
  },
  chapterCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(12),
  },
  chapterNumber: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(12),
    backgroundColor: "#EBE2D8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(16),
  },
  chapterNumberText: {
    fontSize: scale(24),
    fontWeight: "700",
    color: "#3A2816",
  },
  chapterInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterInfoLeft: {
    flex: 1,
    paddingRight: scale(10),
  },
  chapterInfoRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  chapterTitle: {
    fontSize: scale(14),
    color: "#3A2816",
    fontFamily: "Roboto Flex",
    marginBottom: scale(6),
  },
  chapterDescription: {
    fontSize: scale(12),
    color: "#9E8B7A",
    fontFamily: "Roboto Flex",
    lineHeight: scale(18),
  },
  chapterArabic: {
    fontSize: scale(16),
    color: "#000000ff",
    marginBottom: scale(4),
    textAlign: "right",
    fontWeight: "500",
  },
  lessonsCount: {
    fontSize: scale(9),
    color: "#9E8B7A",
    fontFamily: "Roboto Flex",
    textAlign: "right",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(60),
  },
  emptyText: {
    fontSize: scale(18),
    color: "#9E8B7A",
    marginTop: scale(16),
  },
});





