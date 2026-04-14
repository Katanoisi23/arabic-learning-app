const fs = require('fs');
const path = require('path');

const filesToProcess = [
  "app/settings.tsx",
  "app/menu.tsx",
  "app/lessons.tsx",
  "app/index.tsx",
  "app/dictionary.tsx",
  "app/lessons/[lessonId].tsx",
  "app/chapters/[chapterId].tsx"
];

for (const relativePath of filesToProcess) {
  const filePath = path.join(__dirname, '..', relativePath);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if it imports SafeAreaView from react-native
  const rmMixRegex = /(import\s+\{.*)SafeAreaView,\s*(.*\s+from\s+['"]react-native['"];?)/s;
  const rmMixRegex2 = /(import\s+\{.*),\s*SafeAreaView(.*\s+from\s+['"]react-native['"];?)/s;
  const rmSingleRegex = /import\s+\{\s*SafeAreaView\s*\}\s+from\s+['"]react-native['"];?/;

  let hasReplaced = false;

  if (rmSingleRegex.test(content)) {
    content = content.replace(rmSingleRegex, '');
    hasReplaced = true;
  } else if (rmMixRegex.test(content)) {
    content = content.replace(rmMixRegex, '$1$2');
    hasReplaced = true;
  } else if (rmMixRegex2.test(content)) {
    content = content.replace(rmMixRegex2, '$1$2');
    hasReplaced = true;
  }

  if (hasReplaced) {
    // Also remove empty lines or fix weird spacing caused by removal if needed, but it's fine.
    content = content.replace(/import\s+\{\s*\}\s+from\s+['"]react-native['"];?/, '');

    // Add exactly after react-native import, or at the top
    const reactNativeImportMatch = content.match(/from\s+['"]react-native['"];?/);
    if (reactNativeImportMatch) {
      const idx = reactNativeImportMatch.index + reactNativeImportMatch[0].length;
      content = content.slice(0, idx) + '\nimport { SafeAreaView } from "react-native-safe-area-context";' + content.slice(idx);
    } else {
      content = 'import { SafeAreaView } from "react-native-safe-area-context";\n' + content;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${relativePath}`);
  }
}
