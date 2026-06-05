import { MEDINA_BOOK_1_CHAPTERS } from "./chapters"
import { MEDINA_BOOK_2_CHAPTERS } from "./chapters_book2"
import { MEDINA_BOOK_3_CHAPTERS } from "./chapters_book3"
import { MEDINA_BOOK_4_CHAPTERS } from "./chapters_book4"
import { MEDINA_BOOK_1_LESSONS } from "./medina_book_1"
import { MEDINA_BOOK_2_LESSONS } from "./medina_book_2"
import { MEDINA_BOOK_3_LESSONS } from "./medina_book_3"
import { MEDINA_BOOK_4_LESSONS } from "./medina_book_4"

export function getMedinaLesson(id: number) {
  return (MEDINA_BOOK_1_LESSONS || []).find((lesson) => lesson.id === id) || 
         (MEDINA_BOOK_2_LESSONS || []).find((lesson) => lesson.id === id) || 
         (MEDINA_BOOK_3_LESSONS || []).find((lesson) => lesson.id === id) || 
         (MEDINA_BOOK_4_LESSONS || []).find((lesson) => lesson.id === id) || 
         null;
}

export { 
  MEDINA_BOOK_1_CHAPTERS, 
  MEDINA_BOOK_2_CHAPTERS, 
  MEDINA_BOOK_3_CHAPTERS,
  MEDINA_BOOK_4_CHAPTERS,
  MEDINA_BOOK_1_LESSONS, 
  MEDINA_BOOK_2_LESSONS,
  MEDINA_BOOK_3_LESSONS,
  MEDINA_BOOK_4_LESSONS
}

