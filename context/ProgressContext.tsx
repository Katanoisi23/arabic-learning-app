import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

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
          setCompletedLessons(JSON.parse(completedData));
        } catch (e) { }
      }
      setIsLoaded(true);
    }).catch(() => {
      setIsLoaded(true); // Fallback if SecureStore fails
    });
  }, []);

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

  return (
    <ProgressContext.Provider value={{ lastOpenedLessonId, setLastOpenedLessonId, completedLessons }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
