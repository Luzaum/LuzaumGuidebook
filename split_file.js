const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/apps/Antigravity.exe');
const outputDir = path.join(__dirname, 'public/apps');
const CHUNK_SIZE = 49 * 1024 * 1024; // 49MB to be safe under 100MB and 50MB limits

if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

const fileBuffer = fs.readFileSync(filePath);
const totalChunks = Math.ceil(fileBuffer.length / CHUNK_SIZE);

console.log(`Splitting ${filePath} (${fileBuffer.length} bytes) into ${totalChunks} chunks...`);

for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, fileBuffer.length);
    const chunk = fileBuffer.slice(start, end);
    const outputName = `Antigravity.exe.${String(i + 1).padStart(3, '0')}`;
    const outputPath = path.join(outputDir, outputName);

    fs.writeFileSync(outputPath, chunk);
    console.log(`Written ${outputName} (${chunk.length} bytes)`);
}

console.log('Done.');
