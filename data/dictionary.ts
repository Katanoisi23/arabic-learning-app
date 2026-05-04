export type DictionaryWord = {
  id: string;
  lessonId: number;
  meaning: string;
  singular: string;
  plural: string;
};

export const DICT_PAIRS: DictionaryWord[] = [
  { id: "1", lessonId: 1, meaning: "это, этот", singular: "هَذَا", plural: "-" },
  { id: "2", lessonId: 1, meaning: "дом", singular: "بَيْتٌ", plural: "بُيُوتٌ" },
  { id: "3", lessonId: 1, meaning: "школа", singular: "مَدْرَسَةٌ", plural: "مَدَارِسُ" },
  { id: "4", lessonId: 1, meaning: "дверь", singular: "بَابٌ", plural: "أَبْوَابٌ" },
  { id: "5", lessonId: 1, meaning: "книга", singular: "كِتَابٌ", plural: "كُتُبٌ" },
  { id: "6", lessonId: 1, meaning: "ручка", singular: "قَلَمٌ", plural: "أَقْلَامٌ" },
  { id: "7", lessonId: 1, meaning: "ключ", singular: "مِفْتَاحٌ", plural: "مَفَاتِيحُ" },
  { id: "8", lessonId: 1, meaning: "парта", singular: "مَكْتَبٌ", plural: "مَكَاتِبُ" },
  { id: "9", lessonId: 1, meaning: "кровать", singular: "سَرِيرٌ", plural: "سُرُرٌ" },
  { id: "10", lessonId: 1, meaning: "стул", singular: "كُرْسِيٌّ", plural: "كَرَاسِيُ" },
  { id: "11", lessonId: 1, meaning: "Что?", singular: "مَا؟", plural: "-" },
  { id: "12", lessonId: 1, meaning: "Вопрос", singular: "أَ؟", plural: "-" },
  { id: "13", lessonId: 1, meaning: "да", singular: "نَعَمْ", plural: "-" },
  { id: "14", lessonId: 1, meaning: "нет", singular: "لَا", plural: "-" },
  { id: "15", lessonId: 1, meaning: "рубашка", singular: "قَمِيصٌ", plural: "قُمْصَانٌ" },
  { id: "16", lessonId: 1, meaning: "звезда", singular: "نَجْمٌ", plural: "نُجُومٌ" },
  { id: "17", lessonId: 1, meaning: "мечеть", singular: "مَسْجِدٌ", plural: "مَسَاجِدُ" },
  { id: "18", lessonId: 2, meaning: "Кто?", singular: "مَنْ؟", plural: "-" },
  { id: "19", lessonId: 2, meaning: "врач", singular: "طَبِيبٌ", plural: "أَطِبَّاءُ" },
  { id: "20", lessonId: 2, meaning: "ребенок", singular: "وَلَدٌ", plural: "أَوْلَادٌ" },
  { id: "21", lessonId: 2, meaning: "студент", singular: "طَالِبٌ", plural: "طُلَّابٌ" },
  { id: "22", lessonId: 2, meaning: "мужчина", singular: "رَجُلٌ", plural: "رِجَالٌ" },
  { id: "23", lessonId: 2, meaning: "торговец", singular: "تَاجِرٌ", plural: "تُجَّارٌ" },
  { id: "24", lessonId: 2, meaning: "собака", singular: "كَلْبٌ", plural: "كِلَابٌ" },
  { id: "25", lessonId: 2, meaning: "кошка", singular: "قِطٌّ", plural: "قِطَطٌ" },
  { id: "26", lessonId: 2, meaning: "осел", singular: "حِمَارٌ", plural: "حُمُرٌ" },
  { id: "27", lessonId: 2, meaning: "конь", singular: "حِصَانٌ", plural: "حُصُنٌ" },
  { id: "28", lessonId: 2, meaning: "верблюд", singular: "جَمَلٌ", plural: "جِمَالٌ" },
  { id: "29", lessonId: 2, meaning: "петух", singular: "دِيكٌ", plural: "دِيَكَةٌ" },
  { id: "30", lessonId: 2, meaning: "учитель", singular: "مُدَرِّسٌ", plural: "مُدَرِّسُونَ" },
  { id: "31", lessonId: 2, meaning: "салфетка", singular: "مِنْدِيلٌ", plural: "مَنَادِيلُ" },
];
