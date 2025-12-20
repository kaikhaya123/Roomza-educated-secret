// Optimize a single image file
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageFile = process.argv[2];
if (!imageFile) {
  console.error('Usage: node optimize-single.js <image-file>');
  process.exit(1);
}

const inputPath = path.join(__dirname, '../public/Images', imageFile);
const outputPath = path.join(__dirname, '../public/Images', imageFile.replace(/\.jpg$/, '-opt.jpg'));

if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const origStats = fs.statSync(inputPath);
const origSize = origStats.size / 1024;

console.log(`Optimizing ${imageFile}...`);

sharp(inputPath)
  .resize(1920, 1440, {
    fit: 'cover',
    position: 'center'
  })
  .jpeg({
    quality: 70,
    progressive: true,
    mozjpeg: true
  })
  .toFile(outputPath)
  .then(() => {
    const optStats = fs.statSync(outputPath);
    const optSize = optStats.size / 1024;
    const savings = ((origSize - optSize) / origSize * 100).toFixed(1);
    console.log(`✓ ${imageFile}`);
    console.log(`  ${origSize.toFixed(1)} KB → ${optSize.toFixed(1)} KB (${savings}% smaller)`);
  })
  .catch(err => {
    console.error(`✗ Error: ${err.message}`);
    process.exit(1);
  });
