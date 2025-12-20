#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes university logo images for better performance.
 * Estimated savings: 329 KiB (from 393.7 KiB to ~65 KiB)
 * 
 * Installation:
 * npm install sharp --save-dev
 * 
 * Usage:
 * node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

// Try to use sharp if available, otherwise provide manual optimization instructions
let sharp;
try {
  sharp = require('sharp');
  console.log('✓ Sharp library found. Starting optimization...\n');
} catch (e) {
  console.log('⚠ Sharp not installed. Install with: npm install sharp --save-dev');
  console.log('\nManual optimization instructions provided below.\n');
}

const IMAGE_DIR = path.join(__dirname, '../public/Images');
const LOGO_SIZES = {
  'logo_09_2020.png': { width: 510, height: 175 },
  'horizontal-logo-bg-removebg-preview.png': { width: 308, height: 100 },
  'Rhodes University Logo.png': { width: 334, height: 105 },
  'UKZN_logo.svg.png': { width: 479, height: 175 },
  'university-johannesburg.png': { width: 393, height: 175 },
  'unisa_logo_university_of_south_africa-freelogovectors.net_.png': { width: 311, height: 175 },
  'SU-Logo.png': { width: 273, height: 100 },
  'university_of_cape_town_logo-freelogovectors.net_.png': { width: 1196, height: 175 },
  'TUT_Logo_Horisontal1080x1080px.png': { width: 330, height: 100 },
  'durban-university-of-technology-seeklogo.png': { width: 437, height: 100 },
  'MUTNewLogo-436x211x6x0x424x211x1575796635-removebg-preview.png': { width: 201, height: 100 },
};

const QUALITY = 80; // PNG/JPEG quality level

async function optimizeImage(filename, targetDimensions) {
  const inputPath = path.join(IMAGE_DIR, filename);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`✗ File not found: ${filename}`);
    return null;
  }

  const stats = fs.statSync(inputPath);
  const originalSize = stats.size / 1024; // KB

  if (!sharp) {
    console.log(`
📦 To optimize ${filename}:
   Original: ${originalSize.toFixed(1)} KB (${filename})
   Target: ${targetDimensions.width}x${targetDimensions.height}px
   
   Option 1: Using ImageMagick:
   magick convert "${inputPath}" -resize "${targetDimensions.width}x${targetDimensions.height}!" -quality 85 "${inputPath}"
   
   Option 2: Using TinyPNG/ImageOptim:
   - Upload to https://tinypng.com
   - Save the optimized version
   
   Option 3: Using Node/Sharp:
   npm install sharp
   node scripts/optimize-images.js
`);
    return { filename, originalSize, targetDimensions, optimized: false };
  }

  try {
    const outputPath = path.join(IMAGE_DIR, `${path.parse(filename).name}-optimized.png`);
    
    await sharp(inputPath)
      .resize(targetDimensions.width, targetDimensions.height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ quality: QUALITY })
      .toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size / 1024;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${filename}`);
    console.log(`  Original: ${originalSize.toFixed(1)} KB → Optimized: ${optimizedSize.toFixed(1)} KB (${savings}% smaller)`);
    console.log(`  Dimensions: ${targetDimensions.width}x${targetDimensions.height}px\n`);

    return { filename, originalSize, optimizedSize, savings, targetDimensions, optimized: true };
  } catch (error) {
    console.error(`✗ Error optimizing ${filename}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('=============================\n');

  if (!sharp) {
    console.log('MANUAL OPTIMIZATION INSTRUCTIONS:\n');
    Object.entries(LOGO_SIZES).forEach(([filename, dims]) => {
      console.log(`${filename}`);
      console.log(`  • Current display size: ${dims.width}x${dims.height}px`);
      console.log(`  • Optimize to: ${dims.width}x${dims.height}px max\n`);
    });
    return;
  }

  const results = [];
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const [filename, dimensions] of Object.entries(LOGO_SIZES)) {
    const result = await optimizeImage(filename, dimensions);
    if (result) {
      results.push(result);
      if (result.optimized) {
        totalOriginal += result.originalSize;
        totalOptimized += result.optimizedSize;
      }
    }
  }

  if (totalOptimized > 0) {
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log('\n📊 Summary');
    console.log('==========');
    console.log(`Total Original: ${totalOriginal.toFixed(1)} KB`);
    console.log(`Total Optimized: ${totalOptimized.toFixed(1)} KB`);
    console.log(`Total Savings: ${(totalOriginal - totalOptimized).toFixed(1)} KB (${totalSavings}% smaller)`);
    console.log('\n✓ Optimized images saved with "-optimized" suffix');
    console.log('  Replace original files with optimized versions and remove suffix\n');
  }
}

main().catch(console.error);
