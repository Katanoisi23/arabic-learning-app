const fs = require('fs');
let content = fs.readFileSync('data/books/medina/medina_book_2.ts', 'utf-8');

// Fix 316 -> Lesson 10
content = content.replace(/id: 316,[\s\S]*?subtitle: ".*?",/g, 'id: 316,\n    title: "Урок 10",\n    subtitle: "الدَّرْسُ الْعَاشِرُ",');

// Fix 317 -> Lesson 11
content = content.replace(/id: 317,[\s\S]*?subtitle: ".*?",/g, 'id: 317,\n    title: "Урок 11",\n    subtitle: "الدَّرْسُ الْحَادِيَ عَشَرَ",');

// Fix 320 -> Lesson 11 Ex
content = content.replace(/id: 320,[\s\S]*?subtitle: ".*?",/g, 'id: 320,\n    title: "Упражнение (Урок 11)",\n    subtitle: "أَدْخِلْ (لَمَّا) عَلَى الْأَفْعَالِ الْآتِيَةِ:",');

// Fix 327 -> Lesson 13
content = content.replace(/id: 327,[\s\S]*?subtitle: ".*?",/g, 'id: 327,\n    title: "Урок 13",\n    subtitle: "الدَّرْسُ الثَّالِثَ عَشَرَ",');

// Fix 328 -> Lesson 13 Ex
content = content.replace(/id: 328,[\s\S]*?subtitle: ".*?",/g, 'id: 328,\n    title: "Упражнение (Урок 13)",\n    subtitle: "تَأَمَّلِ الْأَمْثِلَةَ الْآتِيَةَ:",');

// Fix 323 -> Lesson 14
content = content.replace(/id: 323,[\s\S]*?subtitle: ".*?",/g, 'id: 323,\n    title: "Урок 14",\n    subtitle: "الدَّرْسُ الرَّابِعَ عَشَرَ",');

// Fix 324 -> Lesson 14 Ex
content = content.replace(/id: 324,[\s\S]*?subtitle: ".*?",/g, 'id: 324,\n    title: "Упражнение (Урок 14)",\n    subtitle: "تَأَمَّلِ الْأَمْثِلَةَ الْآتِيَةَ:",');

// Fix 318 -> Lesson 15
content = content.replace(/id: 318,[\s\S]*?subtitle: ".*?",/g, 'id: 318,\n    title: "Урок 15",\n    subtitle: "الدَّرْسُ الْخَامِسَ عَشَرَ",');

// Fix 321 -> Lesson 15 Ex
content = content.replace(/id: 321,[\s\S]*?subtitle: ".*?",/g, 'id: 321,\n    title: "Упражнение (Урок 15)",\n    subtitle: "اسْتَخْرِجْ مِنَ الدَّرْسِ الأَفْعَالَ:",');

fs.writeFileSync('data/books/medina/medina_book_2.ts', content, 'utf-8');
console.log('Fixed medina_book_2.ts titles and subtitles.');
