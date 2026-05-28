const fs = require('fs');

// 1. Restore from git to ensure clean state
const cp = require('child_process');
cp.execSync('git restore data/books/medina/medina_book_2.ts');

let mainContent = fs.readFileSync('data/books/medina/medina_book_2.ts', 'utf-8');

// The original file ends with:
//   }
// ];
// We need to replace `\n];` with our new content and then `\n];`

// Read batch 4
let batch4 = fs.readFileSync('data/books/medina/scratch_lessons_batch4.ts', 'utf-8');
// Extract the array contents
batch4 = batch4.replace(/[\s\S]*?export const lessonsBatch4: Lesson\[\] = \[\s*/, '');
batch4 = batch4.replace(/\s*\];\s*$/, '');

// Fix mappings in Batch 4
// id 316 -> Lesson 10
batch4 = batch4.replace(/id: 316,[\s\S]*?subtitle: ".*?",/g, 'id: 316,\n    title: "Урок 10",\n    subtitle: "الدَّرْسُ الْعَاشِرُ",');
// id 317 -> Lesson 11
batch4 = batch4.replace(/id: 317,[\s\S]*?subtitle: ".*?",/g, 'id: 317,\n    title: "Урок 11",\n    subtitle: "الدَّرْسُ الْحَادِيَ عَشَرَ",');
// id 320 -> Lesson 11 Ex
batch4 = batch4.replace(/id: 320,[\s\S]*?subtitle: ".*?",/g, 'id: 320,\n    title: "Упражнение (Урок 11)",\n    subtitle: "أَدْخِلْ (لَمَّا) عَلَى الْأَفْعَالِ الْآتِيَةِ:",');
// id 318 -> Lesson 15
batch4 = batch4.replace(/id: 318,[\s\S]*?subtitle: ".*?",/g, 'id: 318,\n    title: "Урок 15",\n    subtitle: "الدَّرْسُ الْخَامِسَ عَشَرَ",');
// id 321 -> Lesson 15 Ex
batch4 = batch4.replace(/id: 321,[\s\S]*?subtitle: ".*?",/g, 'id: 321,\n    title: "Упражнение (Урок 15)",\n    subtitle: "اسْتَخْرِجْ مِنَ الدَّرْسِ الأَفْعَالَ:",');
// id 319 -> Lesson 23 (Keep as is, but maybe fix subtitle if it was wrong, but it's fine)

// Read batch 5
let batch5 = fs.readFileSync('data/books/medina/scratch_lessons_batch5.ts', 'utf-8');
batch5 = batch5.replace(/[\s\S]*?export const lessonsBatch5: Lesson\[\] = \[\s*/, '');
batch5 = batch5.replace(/\s*\];\s*$/, '');

// Fix mappings in Batch 5
// id 323 -> Lesson 14
batch5 = batch5.replace(/id: 323,[\s\S]*?subtitle: ".*?",/g, 'id: 323,\n    title: "Урок 14",\n    subtitle: "الدَّرْسُ الرَّابِعَ عَشَرَ",');
// id 324 -> Lesson 14 Ex
batch5 = batch5.replace(/id: 324,[\s\S]*?subtitle: ".*?",/g, 'id: 324,\n    title: "Упражнение (Урок 14)",\n    subtitle: "تَأَمَّلِ الْأَمْثِلَةَ الْآتِيَةَ:",');
// id 325 -> Lesson 25 (Correct)
// id 326 -> Lesson 25 Ex (Correct)
// id 327 -> Lesson 13
batch5 = batch5.replace(/id: 327,[\s\S]*?subtitle: ".*?",/g, 'id: 327,\n    title: "Урок 13",\n    subtitle: "الدَّرْسُ الثَّالِثَ عَشَرَ",');
// id 328 -> Lesson 13 Ex
batch5 = batch5.replace(/id: 328,[\s\S]*?subtitle: ".*?",/g, 'id: 328,\n    title: "Упражнение (Урок 13)",\n    subtitle: "تَأَمَّلِ الْأَمْثِلَةَ الْآتِيَةَ:",');

// Append
const toAppend = '  ,\n  ' + batch4 + ',\n  ' + batch5 + '\n];\n';
mainContent = mainContent.replace(/\n\];\s*$/, toAppend);

fs.writeFileSync('data/books/medina/medina_book_2.ts', mainContent, 'utf-8');
console.log('Successfully appended Batch 4 and Batch 5 and fixed their titles.');
