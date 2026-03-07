const fs = require('fs');
const path = require('path');

const directory = 'c:\\PROJETOS VET\\Vetius\\modules\\receituario-vet';

const replacements = {
    // New found strings
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â': '—',
    'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡Ãƒâ€šÃ‚Â': '⚠',
    'ÃƒÆ’Ã‚Â¯Ãƒâ€šÃ‚Â¸Ãƒâ€šÃ‚Â\x8F': '', // strip variant selector
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ã…â€œ': '“',
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ã‚Â ': '”',
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ã‚Â¦': '…',
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ã¢â€žÂ¢': "'",

    // From before (some of them could be missed if it matched partially)
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡': 'á',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢': 'â',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£': 'ã',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£': 'çã',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµ': 'çõ',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§': 'ç',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©': 'é',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âª': 'ê',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­': 'í',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³': 'ó',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´': 'ô',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµ': 'õ',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âº': 'ú',
    'ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡': 'Ú',
    'ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“': 'Ó',
    'ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â°': 'É',
    'ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ': 'Í',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â ': 'Á',
    'ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â‡': 'Ç',
};

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const [bad, good] of Object.entries(replacements)) {
        content = content.split(bad).join(good);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
    }
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') walk(fullPath);
        } else {
            if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.json') || fullPath.endsWith('.md')) {
                fixFile(fullPath);
            }
        }
    }
}

walk(directory);
console.log('Done');
