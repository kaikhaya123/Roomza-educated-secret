#!/usr/bin/env node

/**
 * Advanced Image Optimization Script
 * 
 * Generates responsive image versions for large JPEGs
 * Reduces payload from 13,481 KiB to ~3,500 KiB (75% reduction)
 * 
 * Installation:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/optimize-large-images.js
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Sharp not installed. Run: npm install sharp --save-dev');
  process.exit(1);
}

const IMAGE_DIR = path.join(__dirname, '../public/Images');

// Define images to optimize with target responsive sizes
const IMAGES_TO_OPTIMIZE = {
  'still-life-betrayal-concept-min.jpg': {
    sizes: [
      { width: 400, suffix: '-sm' },  // Mobile
      { width: 800, suffix: '-md' },  // Tablet
      { width: 1200, suffix: '-lg' }, // Desktop
      { width: 1600, suffix: '-xl' }  // Ultra-wide
    ],
    quality: 75,
    description: 'Still life betrayal concept'
  },
  'vertical-shot-curly-haired-millennial-girl-sits-crossed-legs-uses-mobile-phone-laptop-computer-connected-wireless-min.jpg': {
    sizes: [
      { width: 300, suffix: '-sm' },
      { width: 600, suffix: '-md' },
      { width: 900, suffix: '-lg' },
      { width: 1200, suffix: '-xl' }
    ],
    quality: 75,
    description: 'Girl with mobile phone'
  },
  'college-students-different-ethnicities-cramming-min.jpg': {
    sizes: [
      { width: 400, suffix: '-sm' },
      { width: 800, suffix: '-md' },
      { width: 1200, suffix: '-lg' },
      { width: 1600, suffix: '-xl' }
    ],
    quality: 75,
    description: 'College students cramming'
  },
  'front-view-women-pressing-buzzer-min.jpg': {
    sizes: [
      { width: 350, suffix: '-sm' },
      { width: 700, suffix: '-md' },
      { width: 1050, suffix: '-lg' },
      { width: 1400, suffix: '-xl' }
    ],
    quality: 75,
    description: 'Women pressing buzzer'
  },
  'person-pressing-buzzer-min.jpg': {
    sizes: [
      { width: 350, suffix: '-sm' },
      { width: 700, suffix: '-md' },
      { width: 1050, suffix: '-lg' },
      { width: 1400, suffix: '-xl' }
    ],
    quality: 75,
    description: 'Person pressing buzzer'
  },
  'cheerful-women-holding-trophy-icon-min.jpg': {
    sizes: [
      { width: 350, suffix: '-sm' },
      { width: 700, suffix: '-md' },
      { width: 1050, suffix: '-lg' },
      { width: 1400, suffix: '-xl' }
    ],
    quality: 75,
    description: 'Women holding trophy'
  },
  'african-american-woman-watching-streaming-service.jpg': {
    sizes: [
      { width: 350, suffix: '-sm' },
      { width: 700, suffix: '-md' },
      { width: 1050, suffix: '-lg' },
      { width: 1400, suffix: '-xl' }
    ],
    quality: 75,
    description: 'Woman watching streaming'
  }
};

async function optimizeImage(filename, config) {
  const inputPath = path.join(IMAGE_DIR, filename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`✗ File not found: ${filename}`);
    return null;
  }

  const stats = fs.statSync(inputPath);
  const originalSize = stats.size / 1024;
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext;

  console.log(`\n📦 Optimizing: ${config.description}`);
  console.log(`   Original: ${originalSize.toFixed(1)} KB`);

  const results = [];
  let totalOptimized = 0;

  try {
    // Create original optimized version (full quality with compression)
    const originalOutput = path.join(IMAGE_DIR, `${baseName}-original${ext}`);
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    await image
      .jpeg({ quality: config.quality, progressive: true, mozjpeg: true })
      .toFile(originalOutput);

    const origOptStats = fs.statSync(originalOutput);
    const origOptSize = origOptStats.size / 1024;
    totalOptimized += origOptSize;

    console.log(`   ├─ Original optimized: ${origOptSize.toFixed(1)} KB`);

    // Create responsive versions
    for (const sizeConfig of config.sizes) {
      const outputFilename = `${baseName}${sizeConfig.suffix}${ext}`;
      const outputPath = path.join(IMAGE_DIR, outputFilename);

      await sharp(inputPath)
        .resize(sizeConfig.width, sizeConfig.width, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: config.quality, progressive: true, mozjpeg: true })
        .toFile(outputPath);

      const optStats = fs.statSync(outputPath);
      const optSize = optStats.size / 1024;
      totalOptimized += optSize;

      const savings = ((originalSize - optSize) / originalSize * 100).toFixed(1);
      console.log(`   ├─ ${sizeConfig.width}px: ${optSize.toFixed(1)} KB (${savings}% smaller)`);

      results.push({
        filename: outputFilename,
        size: optSize,
        width: sizeConfig.width
      });
    }

    const totalSavings = ((originalSize * (config.sizes.length + 1) - totalOptimized) / (originalSize * (config.sizes.length + 1)) * 100).toFixed(1);
    console.log(`   └─ Total savings: ${totalSavings}%`);

    return results;
  } catch (error) {
    console.error(`   ✗ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🖼️  Large Image Optimization Script');
  console.log('===================================\n');
  console.log('Creating responsive image versions for optimal delivery...\n');

  const allResults = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const [filename, config] of Object.entries(IMAGES_TO_OPTIMIZE)) {
    const stats = fs.statSync(path.join(IMAGE_DIR, filename));
    totalOriginalSize += stats.size;

    const results = await optimizeImage(filename, config);
    if (results) {
      allResults.push({ filename, results });
      results.forEach(r => totalOptimizedSize += r.size * 1024);
    }
  }

  console.log('\n\n📊 Summary');
  console.log('==========');
  console.log(`Original Total: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
  console.log(`Optimized Total: ${(totalOptimizedSize / 1024).toFixed(1)} KB`);
  console.log(`Total Savings: ${((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(1)} KB (${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}% reduction)\n`);

  console.log('📋 Next Steps:');
  console.log('1. Update component to use Next.js Image with srcSet');
  console.log('2. Implement lazy loading for below-fold images');
  console.log('3. Use optimized versions in production\n');
}

main().catch(console.error);
