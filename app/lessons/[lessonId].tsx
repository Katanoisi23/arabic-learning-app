// app/lessons/[lessonId].tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
import { getMedinaLesson } from "../../data/books/medina/index";

// Наша фирменная палитра
const COLORS = {
  background: "#F5F0E8", // Светло-бежевый фон
  card: "#FFFFFF", // Белые карточки
  accent: "#8D7456", // Мокка (коричневый)
  textDark: "#1A1A1A", // Почти черный для текста
  textMuted: "#8D7456", // Цвет мокка для второстепенного текста
  divider: "#F0EAE1", // Очень светлый цвет для разделителей
};

export default function LessonScreen() {
  const router = useRouter();
  // Вытаскиваем lessonId
  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  // Запрашиваем данные урока у нашего "Реестра"
  const lesson = getMedinaLesson(Number(lessonId));

  // Защита: если урока нет в базе, показываем заглушку
  if (!lesson) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Урок #{lessonId} не найден</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
        >
          <Text style={styles.errorButtonText}>Вернуться назад</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Рендер одной фразы или реплики из диалога
  const renderDialogueLine = ({ item }: { item: any }) => (
    <View style={styles.dialogueCard}>
      {/* Имя говорящего (если это диалог, а не просто список слов) */}
      {item.speaker && (
        <View style={styles.speakerBadge}>
          <Text style={styles.speakerText}>{item.speaker}</Text>
        </View>
      )}

      {/* Арабский текст: Крупно, выровнено по правому краю (RTL) */}
      <Text style={styles.arabicText}>{item.ar}</Text>

      {/* Разделительная линия, если есть перевод */}
      {item.ru && <View style={styles.divider} />}

      {/* Русский перевод: мельче, выровнено по левому краю */}
      {item.ru && <Text style={styles.russianText}>{item.ru}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Хедер */}
      <View style={styles.header}>
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
          <Ionicons name="chevron-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{lesson?.title}</Text>
          {lesson?.subtitle && (
            <Text style={[styles.headerSubtitle, { marginTop: 4, color: COLORS.accent }]}>{lesson.subtitle}</Text>
          )}
        </View>

        {/* Пустая вьюшка для идеального центрирования заголовка */}
        <View style={styles.backButtonPlaceholder} />
      </View>

      {/* Список фраз/диалогов/упражнений */}
      <FlatList
        data={lesson?.dialogues || []}
        renderItem={renderDialogueLine}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Контент для этого урока еще не добавлен.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dialogueCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  speakerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F9F5F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  speakerText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.accent,
  },
  arabicText: {
    fontSize: 32, // Крупный шрифт для арабского
    lineHeight: 48,
    color: COLORS.textDark,
    textAlign: "right", // Арабский читается справа налево
    writingDirection: "rtl",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: 16,
  },
  russianText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textMuted,
    textAlign: "left",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    color: COLORS.card,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 16,
  },
});
