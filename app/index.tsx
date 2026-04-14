// app/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomTabs } from "../components/BottomTabs";
import { Header } from "../components/Header";
import { ProgressCircle } from "../components/ProgressCircle";

// массив книг
export const BOOKS = [
  {
    id: "1",
    title: "Уроки арабского языка",
    volumeLabel: "Том 1",
    arabicTitle: "عنوان الفصل",
    course: "Мединский курс",
    cover: require("../assets/images/img/firstTom.png"),
    route: "/lessons?bookId=1",
  },
  {
    id: "2",
    title: "Уроки арабского языка",
    volumeLabel: "Том 2",
    arabicTitle: "عنوان الفصل",
    course: "Мединский курс",
    cover: require("../assets/images/img/secondTom.png"),
    route: "/lessons?bookId=2",
  },
  {
    id: "3",
    title: "Уроки арабского языка",
    volumeLabel: "Том 3",
    arabicTitle: "عنوان الفصل",
    course: "Мединский курс",
    cover: require("../assets/images/img/thirdTom.png"),
    route: "/lessons?bookId=3",
  },
  {
    id: "4",
    title: "Уроки арабского языка",
    volumeLabel: "Том 4",
    arabicTitle: "عنوان الفصل",
    course: "Мединский курс",
    cover: require("../assets/images/img/thirdTom.png"),
    route: "/lessons?bookId=4",
  },
] as const;

export default function BooksScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Новый Header компонент */}
      <Header
        title="Книги"
        showSearch={true}
        searchPlaceholder="Поиск"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <View style={styles.root}>
        {/* Контент со скроллом */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Карточка текущей книги */}
          <View style={styles.currentCard}>
            <View style={styles.currentLeft}>
              <Text style={styles.currentTitle}>Первая книга</Text>
              <Text style={styles.currentSubtitle}>19/23 глав пройдено</Text>

              <TouchableOpacity style={styles.currentButton}>
                <Text style={styles.currentButtonText}>Продолжить</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.currentRight}>
              <ProgressCircle percent={80} />
            </View>
          </View>

          {/* Список книг */}
          {BOOKS.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              activeOpacity={0.7}
              onPress={() => router.push(book.route as any)}
            >
              <Image source={book.cover} style={styles.bookCover} />

              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>

                <View style={styles.volumeBadge}>
                  <Text style={styles.volumeBadgeText}>{book.volumeLabel}</Text>
                </View>

                <Text style={styles.bookArabic}>{book.arabicTitle}</Text>
                <Text style={styles.bookCourse}>{book.course}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5E9DC",
  },
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  currentCard: {
    backgroundColor: "#7B5E3F",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  currentLeft: {
    flex: 1,
    marginRight: 16,
  },
  currentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  currentSubtitle: {
    fontSize: 12,
    color: "#E2D3C4",
    marginBottom: 12,
  },
  currentButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  currentButtonText: {
    color: "#7B5E3F",
    fontSize: 12,
    fontWeight: "bold",
  },
  currentRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  bookCard: {
    backgroundColor: "#FFFBF8",
    borderRadius: 16,
    flexDirection: "row",
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3A2816",
    marginBottom: 4,
  },
  volumeBadge: {
    backgroundColor: "#F5E9DC",
    alignSelf: "flex-start",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 4,
  },
  volumeBadgeText: {
    fontSize: 10,
    color: "#7B5E3F",
    fontWeight: "bold",
  },
  bookArabic: {
    fontSize: 14,
    color: "#8B4513",
    marginBottom: 2,
  },
  bookCourse: {
    fontSize: 12,
    color: "#A09384",
  },
});
