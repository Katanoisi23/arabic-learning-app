import { MEDINA_CHAPTERS } from "./chapters"
import { MEDINA_BOOK_1_LESSONS } from "./medina_book_1"

export function getMedinaLesson(id: number) {
  return MEDINA_BOOK_1_LESSONS.find((lesson) => lesson.id === id) || null;
}

export { MEDINA_CHAPTERS }
