const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx')).map(f => path.join(componentsDir, f));

let changedFiles = 0;

files.forEach(filePath => {
    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    content = content.replace(/text-red-700/g, 'text-black');
    content = content.replace(/bg-red-700/g, 'bg-black');
    content = content.replace(/border-red-700/g, 'border-black');
    content = content.replace(/shadow-red-700/g, 'shadow-black');
    content = content.replace(/decoration-red-700/g, 'decoration-black');
    content = content.replace(/color="#b91c1c"/g, 'color="#000000"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
        changedFiles++;
    }
});

console.log(`Total files updated: ${changedFiles}`);
