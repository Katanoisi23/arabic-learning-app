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
} from "react-native";
import { MEDINA_CHAPTERS } from "../../data/books/medina/chapters";
import { getMedinaLesson } from "../../data/books/medina/index";

// Цветовая палитра из промпта
const COLORS = {
  background: "#F5F0E8", // Light beige
  card: "#FFFFFF", // White containers
  accent: "#8D7456", // Muted mocha brown
  menuItemBg: "#FDFBF7", // Very light beige for menu items
  textDark: "#000000", // Bold black
  textMuted: "#666666",
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
    style={[styles.menuItem, isLocked && styles.menuItemLocked]}
    activeOpacity={isLocked ? 1 : 0.7}
    onPress={isLocked ? undefined : onPress}
  >
    <Text style={styles.menuItemText}>{title}</Text>
    <Ionicons
      name={isLocked ? "lock-closed" : icon}
      size={20}
      color={isLocked ? "#BDBDBD" : COLORS.accent}
    />
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

  const renderLessonCard = ({ item }: { item: any }) => (
    <View style={styles.cardContainer}>
      {/* Кружок с номером урока */}
      <View style={styles.lessonNumberCircle}>
        <Text style={styles.lessonNumberText}>{item.id}</Text>
      </View>

      {/* Заголовки урока */}
      <Text style={[styles.cardArabicTitle, item.title.includes('Урок') ? { fontSize: 24, textAlign: 'left' } : {}]}>
        {item.title}
      </Text>
      {!!item.subtitle && (
        <Text style={[styles.cardSubtitle, { textAlign: item.title.includes('Урок') ? 'left' : 'right', fontSize: 18, color: COLORS.accent, fontWeight: '700' }]}>
          {item.subtitle}
        </Text>
      )}

      {/* Вертикальный список пунктов меню */}
      <View style={styles.menuContainer}>
        <LessonMenuItem
          title="Текст урока"
          icon="book"
          onPress={() =>
            router.push(`/lessons/${item.id}?section=dialogues` as any)
          }
        />
        <LessonMenuItem
          title="Словарь"
          icon="text"
          onPress={() =>
            router.push(`/lessons/${item.id}?section=vocabulary` as any)
          }
        />
        <LessonMenuItem title="Упражнения" icon="trophy" isLocked={true} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Navigation & Center Text */}
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
            <Ionicons name="chevron-back" size={20} color={COLORS.textDark} />
          </TouchableOpacity>

          {/* Текст по центру */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Глава {chapter.id}</Text>
            <Text style={styles.headerArabic}>{chapter.arabicTitle}</Text>
            <Text style={styles.headerSubtitle}>{chapter.description}</Text>
          </View>
        </View>

        {/* Content Cards */}
        <FlatList
          data={chapterLessons}
          renderItem={renderLessonCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <View style={styles.bottomNavIcons}>
          <TouchableOpacity>
            <Ionicons name="book" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="albums" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {/* White home indicator line */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    position: "relative",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textDark,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  headerArabic: {
    fontSize: 36,
    color: COLORS.accent,
    fontWeight: "600",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    position: "relative",
  },
  lessonNumberCircle: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.accent,
  },
  cardArabicTitle: {
    fontSize: 28,
    color: COLORS.textDark,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "right", // Арабский читается справа налево
  },
  cardSubtitle: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 24,
    fontWeight: "500",
    textAlign: "right",
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.menuItemBg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  menuItemLocked: {
    backgroundColor: "#F2EFEA",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  bottomNavBar: {
    backgroundColor: COLORS.accent,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 8, // Место под индикатор
    paddingHorizontal: 40,
  },
  bottomNavIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 8,
  },
});
