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
      {isLocked && <Ionicons name="lock-closed-outline" size={20} color="#BDBDBD" />}
    </View>
    <View style={styles.menuItemRight}>
      <Text style={[styles.menuItemText, isLocked && styles.menuItemTextLocked]}>
        {title}
      </Text>
      <Ionicons
        name={icon}
        size={20}
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
      <SafeAreaView style={styles.headerSafeArea}>
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
            <Ionicons name="chevron-back" size={24} color="#8A6D53" />
          </TouchableOpacity>

          {/* Текст по центру */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Глава {chapter.id}</Text>
            <Text style={styles.headerArabic}>{chapter.arabicTitle}</Text>
            <Text style={styles.headerSubtitle}>{chapter.description}</Text>
          </View>
        </View>
      </SafeAreaView>

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
    borderBottomWidth: 1,
    borderBottomColor: "#D9CFC4",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 16,
    position: "relative",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAE1D6",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#3A2816",
    marginBottom: 2,
  },
  headerArabic: {
    fontSize: 34,
    color: "#3A2816",
    fontWeight: "500",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8A6D53",
  },
  listContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    position: "relative",
  },
  lessonNumberCircle: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBE2D8",
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#3A2816",
  },
  cardHeaderArea: {
    paddingRight: 60,
    alignItems: "flex-end", // All text in header aligns to right
    marginBottom: 24,
  },
  cardArabicTitle: {
    fontSize: 32,
    color: "#3A2816",
    fontWeight: "600",
    textAlign: "right",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#8A6D53",
    fontWeight: "600",
    textAlign: "right",
    marginTop: 4,
  },
  menuContainer: {
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2EAE0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  menuItemLeft: {
    width: 30,
    alignItems: "flex-start",
  },
  menuItemRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#423325",
  },
  menuItemTextLocked: {
    color: "#BDBDBD",
  },
  menuItemIcon: {
    marginLeft: 12,
  },

});
