// app/index.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomTabs } from "../components/BottomTabs";
import { Header } from "../components/Header";
import { ProgressCircle } from "../components/ProgressCircle";
import { MEDINA_CHAPTERS, MEDINA_BOOK_1_LESSONS } from "../data/books/medina";
import { Ionicons } from "@expo/vector-icons";
import { useProgress } from "../context/ProgressContext";
import { styles } from "../styles";

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
  const { completedLessons, lastOpenedLessonId } = useProgress();

  const totalChapters = MEDINA_CHAPTERS.length;
  
  // Находим самый дальний урок, который когда-либо открывал пользователь
  const maxLessonId = completedLessons.length > 0 ? Math.max(...completedLessons) : 1;

  // Высчитываем прогресс на основе того, в какой главе находится этот самый дальний урок.
  // Все предыдущие главы считаются пройденными.
  const currentChapterIndex = MEDINA_CHAPTERS.findIndex((c) =>
    c.lessonIds.includes(maxLessonId)
  );
  const completedChaptersCount = currentChapterIndex >= 0 ? currentChapterIndex : 0;

  const progressPercent =
    totalChapters > 0 ? Math.round((completedChaptersCount / totalChapters) * 100) : 0;

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
          {searchQuery.trim().length > 0 ? (
            <View style={{ gap: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#3A2816", marginBottom: 8 }}>
                Результаты поиска
              </Text>
              
              {/* Результаты по Главам */}
              {MEDINA_CHAPTERS.filter(
                (c) =>
                  c.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                  c.arabicTitle.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                  c.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
              ).map((chapter) => (
                <TouchableOpacity
                  key={`chapter-${chapter.id}`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#EAE1D6",
                  }}
                  onPress={() => router.push(`/chapters/${chapter.id}` as any)}
                >
                  <Text style={{ fontSize: 12, color: "#8A6D53", marginBottom: 4 }}>Глава {chapter.id}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#3A2816" }}>{chapter.title}</Text>
                  <Text style={{ fontSize: 14, color: "#8A6D53", marginTop: 4 }} numberOfLines={2}>
                    {chapter.description}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Результаты по Урокам */}
              {MEDINA_BOOK_1_LESSONS.filter(
                (l) =>
                  l.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                  (l.subtitle && l.subtitle.toLowerCase().includes(searchQuery.trim().toLowerCase()))
              ).map((lesson) => (
                <TouchableOpacity
                  key={`lesson-${lesson.id}`}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F2EAE0",
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                  }}
                  onPress={() => router.push(`/lessons/${lesson.id}` as any)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#423325" }}>
                      {lesson.title}
                    </Text>
                    {!!lesson.subtitle && (
                      <Text style={{ fontSize: 14, color: "#8A6D53", marginTop: 2 }}>
                        {lesson.subtitle}
                      </Text>
                    )}
                  </View>
                  <Ionicons name="book" size={20} color="#8D7456" style={{ marginLeft: 12 }} />
                </TouchableOpacity>
              ))}

              {MEDINA_CHAPTERS.filter((c) => c.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) || c.arabicTitle.toLowerCase().includes(searchQuery.trim().toLowerCase()) || c.description.toLowerCase().includes(searchQuery.trim().toLowerCase())).length === 0 &&
               MEDINA_BOOK_1_LESSONS.filter((l) => l.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) || (l.subtitle && l.subtitle.toLowerCase().includes(searchQuery.trim().toLowerCase()))).length === 0 && (
                <Text style={{ color: "#8A6D53", textAlign: "center", marginTop: 20 }}>
                  Ничего не найдено
                </Text>
              )}
            </View>
          ) : (
            <>
              {/* Карточка текущей книги */}
              <View style={styles.currentCard}>
                <View style={styles.currentLeft}>
                  <Text style={styles.currentTitle}>Первая книга</Text>
                  <Text style={styles.currentSubtitle}>
                    {completedChaptersCount}/{totalChapters} глав пройдено
                  </Text>

                  <TouchableOpacity
                    style={styles.currentButton}
                    onPress={() => router.push(`/lessons/${lastOpenedLessonId}` as any)}
                  >
                    <Text style={styles.currentButtonText}>Продолжить</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.currentRight}>
                  <ProgressCircle percent={progressPercent} />
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
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

      <BottomTabs />
    </SafeAreaView>
  );
}
