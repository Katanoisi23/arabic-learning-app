import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomTabs } from "../../components/BottomTabs";
import { useProgress } from "../../context/ProgressContext";
import { getMedinaLesson } from "../../data/books/medina/index";
import { scale } from "../../styles";


const COLORS = {
  background: "#F5F0E8",
  card: "#FFFFFF",
  accent: "#8D7456",
  textDark: "#1A1A1A",
  textMuted: "#8D7456",
  divider: "#F0EAE1",
};

export default function LessonScreen() {
  const router = useRouter();

  const { lessonId } = useLocalSearchParams<{
    lessonId: string;
  }>();

  const { setLastOpenedLessonId } = useProgress();

  useEffect(() => {
    if (lessonId) {
      setLastOpenedLessonId(Number(lessonId));
    }
  }, [lessonId]);

  const lesson = getMedinaLesson(Number(lessonId));

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

  const renderDialogueLine = ({ item }: { item: any }) => (
    <View style={styles.dialogueCard}>
      <Text style={styles.arabicText}>{item.ar}</Text>

      {item.ru && (
        <Text style={styles.russianText}>
          {item.speaker ? `${item.speaker}: ` : ""}{item.ru}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

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
            <Text style={styles.headerSubtitle}>{lesson.subtitle}</Text>
          )}
        </View>

        <View style={styles.backButtonPlaceholder} />
      </View>

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

      <BottomTabs />
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
    paddingHorizontal: scale(20),
    paddingTop: 50,
    paddingBottom: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: "#D9CFC4",
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
    paddingHorizontal: scale(10),
  },
  headerSubtitle: {
    fontSize: scale(12),
    color: "#8A6D53",
    marginTop: scale(2),
  },
  headerTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#3A2816",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(40),
  },
  dialogueCard: {
    backgroundColor: COLORS.card,
    borderRadius: scale(20),
    padding: scale(24),
    marginBottom: scale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.05,
    shadowRadius: scale(8),
    elevation: 3,
  },
  speakerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F9F5F0",
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(12),
    marginBottom: scale(16),
  },
  speakerText: {
    fontSize: scale(13),
    fontWeight: "600",
    color: COLORS.accent,
  },
  arabicText: {
    fontSize: scale(32),
    lineHeight: scale(48),
    color: COLORS.textDark,
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: "500",
  },
  divider: {
    height: scale(1),
    backgroundColor: COLORS.divider,
    marginVertical: scale(16),
  },
  russianText: {
    fontSize: scale(12),
    color: "#73624E",
    textAlign: "left",
    marginTop: scale(12),
    fontFamily: "Roboto Flex",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: scale(18),
    color: COLORS.textDark,
    marginBottom: scale(20),
  },
  errorButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(12),
  },
  errorButtonText: {
    color: COLORS.card,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: scale(40),
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: scale(16),
  },
});
