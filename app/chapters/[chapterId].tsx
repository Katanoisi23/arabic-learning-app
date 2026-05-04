import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { BottomTabs } from "../../components/BottomTabs";
import { MEDINA_CHAPTERS } from "../../data/books/medina/chapters";
import { getMedinaLesson } from "../../data/books/medina/index";
import { scale } from "../../styles";

// Цветовая палитра из промпта
const COLORS = {
  background: "#F5F0E8", // Light beige
  card: "#FFFFFF", // White containers
  accent: "#8D7456", // Mocha brown
  menuItemBg: "#F2EAE0", // Beige for menu items
  textDark: "#3A2816", // Dark brown/black
  textMuted: "#9E8B7A",
};

import Svg, { Path } from "react-native-svg";

// Компонент кастомной иконки книги (из book2.svg)
const CustomBookIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z" fill={color}/>
    <Path d="M10.7122 4.70969C8.88219 3.71969 6.11219 2.83969 4.23219 2.67969H4.16219C2.96219 2.67969 1.99219 3.64969 1.99219 4.84969V16.7397C1.99219 17.7097 2.78219 18.5997 3.75219 18.7197L4.06219 18.7597C5.70219 18.9797 8.01219 19.6597 9.87219 20.4397C10.5222 20.7097 11.2422 20.2197 11.2422 19.5097V5.59969C11.2422 5.21969 11.0422 4.88969 10.7122 4.70969ZM5.00219 7.73969H7.25219C7.66219 7.73969 8.00219 8.07969 8.00219 8.48969C8.00219 8.90969 7.66219 9.23969 7.25219 9.23969H5.00219C4.59219 9.23969 4.25219 8.90969 4.25219 8.48969C4.25219 8.07969 4.59219 7.73969 5.00219 7.73969ZM8.00219 12.2397H5.00219C4.59219 12.2397 4.25219 11.9097 4.25219 11.4897C4.25219 11.0797 4.59219 10.7397 5.00219 10.7397H8.00219C8.41219 10.7397 8.75219 11.0797 8.75219 11.4897C8.75219 11.9097 8.41219 12.2397 8.00219 12.2397Z" fill={color}/>
  </Svg>
);

// Компонент пункта меню (широкие кнопки)
const LessonMenuItem = ({
  title,
  icon,
  isLocked = false,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap | "book-custom";
  isLocked?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    activeOpacity={isLocked ? 1 : 0.7}
    onPress={isLocked ? undefined : onPress}
  >
    <View style={styles.menuItemLeft}>
      {isLocked && <Ionicons name="lock-closed-outline" size={scale(20)} color="#BDBDBD" />}
    </View>
    <View style={styles.menuItemRight}>
      <Text 
        style={[styles.menuItemText, isLocked && styles.menuItemTextLocked]}
        numberOfLines={1}
      >
        {title}
      </Text>
      {icon === "book-custom" ? (
        <View style={styles.menuItemIcon}>
          <CustomBookIcon size={scale(20)} color={isLocked ? "#BDBDBD" : COLORS.accent} />
        </View>
      ) : (
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={scale(20)}
          color={isLocked ? "#BDBDBD" : COLORS.accent}
          style={styles.menuItemIcon}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default function ChapterDetailScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams<{ chapterId?: string }>();

  if (!chapterId) return <Redirect href="/book/training" />;

  const chapter = MEDINA_CHAPTERS.find((c) => c.id === Number(chapterId));
  if (!chapter) return <Redirect href="/book/training" />;

  const chapterLessons = chapter.lessonIds.map((id, index) => {
    const lessonData = getMedinaLesson(id);
    return {
      id: id,
      title: `Урок ${index + 1}`,
      subtitle: lessonData?.subtitle || "",
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFBF8" />

      {/* Top Navigation & Center Text */}
      <View style={styles.headerSafeArea}>
        <View style={styles.header}>
          {/* Маленькая круглая кнопка назад слева */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
          >
            <Ionicons name="chevron-back" size={scale(24)} color="#8A6D53" />
          </TouchableOpacity>

          {/* Текст по центру */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Глава {chapter.id}</Text>
            <Text style={styles.headerArabic}>{chapter.arabicTitle}</Text>
            <Text style={styles.headerSubtitle}>{chapter.description}</Text>
          </View>

          {/* Пустышка для центрирования */}
          <View style={styles.backButtonPlaceholder} />
        </View>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Content Cards */}
        <ScrollView 
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            {/* Кружок с номером главы */}
            <View style={styles.lessonNumberCircle}>
              <Text style={styles.lessonNumberText}>{chapter.id}</Text>
            </View>

            {/* Заголовки урока с отступом справа, чтобы не перекрывать кружок */}
            <View style={styles.cardHeaderArea}>
              <Text style={styles.cardArabicTitle}>
                {chapter.arabicTitle}
              </Text>
              {!!chapter.title && (
                <Text style={styles.cardSubtitle}>
                  {chapter.title}
                </Text>
              )}
            </View>

            {/* Вертикальный список пунктов меню */}
            <View style={styles.menuContainer}>
              {chapterLessons.map((lesson) => (
                <LessonMenuItem
                  key={lesson.id}
                  title={`${lesson.title} - ${lesson.subtitle}`}
                  icon="book-custom"
                  onPress={() => router.push(`/lessons/${lesson.id}` as any)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSafeArea: {
    backgroundColor: "#FFFBF8",
    borderBottomWidth: scale(1),
    borderBottomColor: "#D9CFC4",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20),
    paddingTop: 50,
    paddingBottom: scale(16),
  },
  backButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "#EAE1D6",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: scale(44),
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "#3A2816",
    marginBottom: scale(2),
  },
  headerArabic: {
    fontSize: scale(34),
    color: "#3A2816",
    fontWeight: "500",
    marginBottom: scale(4),
  },
  headerSubtitle: {
    fontSize: scale(12),
    color: "#8A6D53",
  },
  listContent: {
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: scale(24),
    padding: scale(20),
    marginBottom: scale(20),
    position: "relative",
  },
  lessonNumberCircle: {
    position: "absolute",
    top: scale(24),
    right: scale(24),
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#EBE2D8",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#3A2816",
  },
  cardHeaderArea: {
    paddingRight: scale(60),
    alignItems: "flex-end", // All text in header aligns to right
    marginBottom: scale(14),
  },
  cardArabicTitle: {
    fontSize: scale(32),
    color: "#3A2816",
    fontWeight: "600",
    textAlign: "right",
  },
  cardSubtitle: {
    fontSize: scale(14),
    color: "#8A6D53",
    fontWeight: "600",
    textAlign: "right",
    marginTop: scale(4),
  },
  menuContainer: {
    gap: scale(8),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2EAE0",
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    borderRadius: scale(12),
  },
  menuItemLeft: {
    width: scale(30),
    alignItems: "flex-start",
  },
  menuItemRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuItemText: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#423325",
    flexShrink: 1,
  },
  menuItemTextLocked: {
    color: "#BDBDBD",
  },
  menuItemIcon: {
    marginLeft: scale(12),
  },
});
