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
    lessonIds: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 2,
    title: "Что это (вдалеке)?",
    arabicTitle: "الدَّرْسُ الثَّانِي",
    description: "Второй урок: указательное местоимение ذَلِكَ (то/тот)",
    lessonIds: [8, 9],
  },
]
