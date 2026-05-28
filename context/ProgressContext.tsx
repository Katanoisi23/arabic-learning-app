import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { MEDINA_BOOK_1_CHAPTERS, MEDINA_BOOK_2_CHAPTERS } from "../data/books/medina/index";

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
      return next;
    });
  };

  // Determine newly completed chapters to show toast, without putting side-effects in state updaters
  const prevCompletedRef = useRef<number[]>([]);
  useEffect(() => {
    if (!isLoaded || completedLessons.length === 0) return;
    if (prevCompletedRef.current.length === 0) {
      prevCompletedRef.current = completedLessons;
      return;
    }

    const allChapters = [...(MEDINA_BOOK_1_CHAPTERS || []), ...(MEDINA_BOOK_2_CHAPTERS || [])];
    let justCompleted = false;

    for (const chapter of allChapters) {
      if (!chapter || !chapter.lessonIds || chapter.lessonIds.length === 0) continue;
      const allCompletedNow = chapter.lessonIds.every(id => completedLessons.includes(id));
      const allCompletedBefore = chapter.lessonIds.every(id => prevCompletedRef.current.includes(id));
      if (allCompletedNow && !allCompletedBefore) {
        justCompleted = true;
        break;
      }
    }

    if (justCompleted) {
      showToast("Словарь обновлен");
    }

    prevCompletedRef.current = completedLessons;
  }, [completedLessons, isLoaded]);

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
