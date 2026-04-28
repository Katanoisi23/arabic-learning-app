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

// Компонент пункта меню (широкие кнопки)
const LessonMenuItem = ({
  title,
  icon,
  isLocked = false,
  onPress,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
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
      <Text style={[styles.menuItemText, isLocked && styles.menuItemTextLocked]}>
        {title}
      </Text>
      <Ionicons
        name={icon}
        size={scale(20)}
        color={isLocked ? "#BDBDBD" : COLORS.accent}
        style={styles.menuItemIcon}
      />
    </View>
  </TouchableOpacity>
);

export default function ChapterDetailScreen() {
  const router = useRouter();
  const { chapterId } = useLocalSearchParams<{ chapterId?: string }>();

  if (!chapterId) return <Redirect href="/book/training" />;

  const chapter = MEDINA_CHAPTERS.find((c) => c.id === Number(chapterId));
  if (!chapter) return <Redirect href="/book/training" />;

  const chapterLessons = chapter.lessonIds.map((id) => {
    const lessonData = getMedinaLesson(id);
    return {
      id: id,
      title: lessonData ? lessonData.title : `Урок ${id}`,
      subtitle: lessonData?.subtitle || "",
    };
  });

  // Removed renderLessonCard function

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
                  icon="book"
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
  },
  menuItemTextLocked: {
    color: "#BDBDBD",
  },
  menuItemIcon: {
    marginLeft: scale(12),
  },
});
