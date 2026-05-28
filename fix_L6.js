const fs = require('fs');
let content = fs.readFileSync('data/books/medina/medina_book_2.ts', 'utf-8');

// 1. Extract B2_L6_1 through B2_L6_35 into a new object with id: 245
const l6DialoguesRegex = /,\s*\{\s*id:\s*"B2_L6_1"[\s\S]*?id:\s*"B2_L6_35"[^\n]*\n/;
const match = content.match(l6DialoguesRegex);
if (match) {
    let dialogues = match[0].replace(/^,\s*/, ''); // remove leading comma
    // Remove these dialogues from wherever they are
    content = content.replace(l6DialoguesRegex, '\n');
    
    // Insert id: 245 after id: 242
    const obj245 = '  {\n    id: 245,\n    title: "Урок 6",\n    subtitle: "الدَّرْسُ السَّادِسُ",\n    dialogues: [\n      ' + dialogues + '    ]\n  },\n';
    
    content = content.replace(/(id:\s*242,[\s\S]*?\]\n\s*\},)\n/m, '$1\n' + obj245);
}

// 2. Fix the extra brackets around line 914
// Looking for something like:
//   }
//     ]
//   },
//   {
//     id: 258,
content = content.replace(/  \}\n    \]\n  \},\n  \{\n    id: 258,/g, '  }\n    ]\n  },\n  {\n    id: 258,');
// Wait, the syntax error is `} ] }, { id: 258`.
// Let's just fix it by replacing the bad part. 
// If there are multiple `]` or `}` we can just use string replace.
const badSyntax = `  }
    ]
  },
  {
    id: 258,`;
const goodSyntax = `  }
    ]
  },
  {
    id: 258,`; // wait, what's wrong with that?
// The problem was:
// 912:     ]
// 913:   }
// 914:     ]
// 915:   },
// 916:   {
const badSyntax2 = `    ]
  }
    ]
  },
  {
    id: 258,`;
const goodSyntax2 = `    ]
  },
  {
    id: 258,`;

content = content.replace(badSyntax2, goodSyntax2);

fs.writeFileSync('data/books/medina/medina_book_2.ts', content, 'utf-8');
console.log('Fixed B2_L6_1 and extra brackets.');
