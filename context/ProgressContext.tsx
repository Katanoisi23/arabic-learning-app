import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { MEDINA_CHAPTERS } from "../data/books/medina/index";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

type ProgressContextType = {
  lastOpenedLessonId: number;
  setLastOpenedLessonId: (id: number) => void;
  completedLessons: number[];
};

const ProgressContext = createContext<ProgressContextType>({
  lastOpenedLessonId: 1,
  setLastOpenedLessonId: () => { },
  completedLessons: [],
});

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastOpenedLessonId, setLastOpenedLessonIdState] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Promise.all([
      SecureStore.getItemAsync("lastOpenedLessonId"),
      SecureStore.getItemAsync("completedLessons")
    ]).then(([lastId, completedData]) => {
      if (lastId) {
        try {
          setLastOpenedLessonIdState(Number(lastId));
        } catch (e) { }
      }
      if (completedData) {
        try {
          const parsed = JSON.parse(completedData);
          if (Array.isArray(parsed)) {
            setCompletedLessons(parsed.map(Number));
          }
        } catch (e) { }
      }
      setIsLoaded(true);
    }).catch(() => {
      setIsLoaded(true); // Fallback if SecureStore fails
    });
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setToastMessage(null));
      }, 5000);
    });
  };

  const setLastOpenedLessonId = (id: number) => {
    setLastOpenedLessonIdState(id);
    SecureStore.setItemAsync("lastOpenedLessonId", id.toString()).catch(() => { });

    setCompletedLessons((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      SecureStore.setItemAsync("completedLessons", JSON.stringify(next)).catch(() => { });

      const completedChapter = MEDINA_CHAPTERS.find((chapter) => {
        if (!chapter.lessonIds.includes(id)) return false;
        const allCompleted = chapter.lessonIds.every(lessonId => next.includes(lessonId));
        const wasAlreadyCompleted = chapter.lessonIds.every(lessonId => prev.includes(lessonId));
        return allCompleted && !wasAlreadyCompleted;
      });

      if (completedChapter) {
        showToast("Словарь обновлен");
      }

      return next;
    });
  };

  return (
    <ProgressContext.Provider value={{ lastOpenedLessonId, setLastOpenedLessonId, completedLessons }}>
      {children}
      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: scale(60),
    alignSelf: "center",
    backgroundColor: "#3A2816",
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(24),
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(8),
    elevation: 5,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "600",
  },
});
