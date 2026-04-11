// app/data/books/medina/chapters.ts

export type Chapter = {
  id: number
  title: string
  arabicTitle: string
  description: string
  lessonIds: number[]
}

export const MEDINA_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Указательные местоимения",
    arabicTitle: "الدَّرْسُ الأَوَّلُ",
    description: "Знакомство с هَذَا",
    lessonIds: [1],
  },
  {
    id: 2,
    title: "Вопросительная частица",
    arabicTitle: "مَا هَذَا؟",
    description: "Учимся задавать вопрос: Что это?",
    lessonIds: [2],
  },
  {
    id: 3,
    title: "Практика и закрепление",
    arabicTitle: "تَمْرِينٌ (١)",
    description: "Упражнение 1 по пройденным словам",
    lessonIds: [3],
  },
  {
    id: 4,
    title: "Ответы: Да / Нет",
    arabicTitle: "تَمْرِينٌ (٢)",
    description: "Вопрос أَهَذَا...؟ (Это...?)",
    lessonIds: [4],
  },
  {
    id: 5,
    title: "Одушевленные лица",
    arabicTitle: "مَنْ هَذَا ؟",
    description: "Кто это? (مَنْ). Чтение и письмо",
    lessonIds: [5],
  },
  {
    id: 6,
    title: "Животные",
    arabicTitle: "مَا هَذَا؟ / مَنْ هَذَا؟",
    description: "Новые слова: собака, кот, осел, лошадь, верблюд",
    lessonIds: [6],
  },
  {
    id: 7,
    title: "Итоговое упражнение",
    arabicTitle: "تَمْرِينٌ",
    description: "Новые слова: петух, платок, учитель и практика",
    lessonIds: [7],
  },
  {
    id: 8,
    title: "Что это (вдалеке)?",
    arabicTitle: "الدَّرْسُ الثَّانِي",
    description: "Второй урок: указательное местоимение ذَلِكَ (то/тот)",
    lessonIds: [8],
  },
]
