const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

let changedFiles = 0;

files.forEach(file => {
    const filePath = path.join(componentsDir, file);
    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    content = content.replace(/text-black/g, 'text-red-700');
    content = content.replace(/bg-black/g, 'bg-red-700');
    content = content.replace(/border-black/g, 'border-red-700');
    content = content.replace(/shadow-black/g, 'shadow-red-700');
    content = content.replace(/decoration-black/g, 'decoration-red-700');
    content = content.replace(/color="#000000"/g, 'color="#b91c1c"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
        changedFiles++;
    }
});

console.log(`Total files updated: ${changedFiles}`);
