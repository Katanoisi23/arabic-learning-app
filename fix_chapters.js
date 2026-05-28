const fs = require('fs');
let content = fs.readFileSync('data/books/medina/chapters_book2.ts', 'utf-8');

// The array inside MEDINA_BOOK_2_CHAPTERS has objects with `id`, `title`, etc.
// We need to replace `lessonIds: [...]` for each of the impacted chapters.

function updateChapter(id, newIds) {
    const regex = new RegExp(`(id: ${id},[\\s\\S]*?lessonIds: \\[[\\s\\S]*?\\])`);
    content = content.replace(regex, (match) => {
        return match.replace(/lessonIds: \[[^\]]*\]/, `lessonIds: [${newIds.join(', ')}]`);
    });
}

updateChapter(10, [316]);
updateChapter(11, [317, 320]);
updateChapter(13, [309, 327, 328]);
updateChapter(14, [310, 323, 324]);
updateChapter(15, [311, 318, 321]);

// Reset incorrectly assigned ones
updateChapter(20, []);
updateChapter(21, []);
updateChapter(22, []); // 318, 321 were here (which were Lesson 15)
updateChapter(24, []); // 323, 324 were here (which were Lesson 14)
updateChapter(26, []); // 327, 328 were here (which were Lesson 13)

fs.writeFileSync('data/books/medina/chapters_book2.ts', content, 'utf-8');
console.log('Fixed chapters_book2.ts mappings.');
