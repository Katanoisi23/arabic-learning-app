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
