#!/usr/bin/env node

/**
 * Build Script for Embedding Assets in HTML Templates
 * 
 * This script:
 * 1. Scans all HTML files in the health-report directory
 * 2. Finds all asset references (SVGs and PNGs)
 * 3. Inlines SVG content directly into HTML
 * 4. Converts PNG images to base64 data URLs
 * 5. Creates new embedded HTML files in an 'embedded' output directory
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_DIR = __dirname;
const ASSETS_DIR = path.join(BASE_DIR, '../assets');
const OUTPUT_DIR = path.join(BASE_DIR, 'embedded');
const STYLES_FILE = path.join(BASE_DIR, 'styles.css');
const MAX_SVG_SIZE = 5 * 1024; // 5KB limit for SVG inlining

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Ensure output directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (e) {
    return 0;
  }
}

// Format file size for display
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// Read and convert image to base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/png';
    
    if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.svg') mimeType = 'image/svg+xml';
    else if (ext === '.gif') mimeType = 'image/gif';
    else if (ext === '.webp') mimeType = 'image/webp';
    
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    log(`  ⚠️  Error converting ${imagePath} to base64: ${error.message}`, 'yellow');
    return null;
  }
}

// Read and clean SVG content for inlining
function readSvgContent(svgPath) {
  try {
    let svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Remove XML declaration if present
    svgContent = svgContent.replace(/<\?xml[^?]*\?>/g, '');
    
    // Remove comments
    svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, '');
    
    // Trim whitespace
    svgContent = svgContent.trim();
    
    return svgContent;
  } catch (error) {
    log(`  ⚠️  Error reading SVG ${svgPath}: ${error.message}`, 'yellow');
    return null;
  }
}

// Resolve asset path relative to HTML file
function resolveAssetPath(htmlFilePath, assetPath) {
  const htmlDir = path.dirname(htmlFilePath);
  const resolvedPath = path.resolve(htmlDir, assetPath);
  
  // Check if file exists
  if (fs.existsSync(resolvedPath)) {
    return resolvedPath;
  }
  
  return null;
}

// Read and inline CSS
function inlineCss() {
  try {
    const cssContent = fs.readFileSync(STYLES_FILE, 'utf8');
    return cssContent;
  } catch (error) {
    log(`  ⚠️  Error reading styles.css: ${error.message}`, 'yellow');
    return null;
  }
}

// Process a single HTML file
function processHtmlFile(htmlFilePath, outputPath) {
  log(`\n📄 Processing: ${path.relative(BASE_DIR, htmlFilePath)}`, 'cyan');
  
  let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  let modificationCount = 0;
  let stats = {
    svgsInlined: 0,
    pngsEncoded: 0,
    skipped: 0,
    errors: 0,
    cssInlined: false
  };
  
  // Inline CSS if external stylesheet is referenced
  const cssLinkRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']*styles\.css)["'][^>]*\s*\/?>/gi;
  const cssMatch = htmlContent.match(cssLinkRegex);
  
  if (cssMatch) {
    const cssContent = inlineCss();
    if (cssContent) {
      // Replace the link tag with inline style
      const inlineStyleTag = `<style>\n${cssContent}\n    </style>`;
      htmlContent = htmlContent.replace(cssLinkRegex, inlineStyleTag);
      log(`  ✓ Inlined CSS: styles.css (${formatFileSize(cssContent.length)})`, 'green');
      stats.cssInlined = true;
      modificationCount++;
    }
  }
  
  // Find all img src references
  const imgRegex = /<img\s+([^>]*\s)?src=["']([^"']+)["']([^>]*)>/gi;
  let match;
  
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const fullTag = match[0];
    const beforeSrc = match[1] || '';
    const assetPath = match[2];
    const afterSrc = match[3] || '';
    
    // Skip if already a data URL
    if (assetPath.startsWith('data:')) {
      continue;
    }
    
    // Skip external URLs
    if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
      continue;
    }
    
    const resolvedPath = resolveAssetPath(htmlFilePath, assetPath);
    
    if (!resolvedPath) {
      log(`  ⚠️  Asset not found: ${assetPath}`, 'yellow');
      stats.errors++;
      continue;
    }
    
    const ext = path.extname(resolvedPath).toLowerCase();
    const fileSize = getFileSize(resolvedPath);
    
    // Handle SVG files
    if (ext === '.svg') {
      if (fileSize <= MAX_SVG_SIZE) {
        const svgContent = readSvgContent(resolvedPath);
        
        if (svgContent) {
          // Replace img tag with inline SVG
          htmlContent = htmlContent.replace(fullTag, svgContent);
          log(`  ✓ Inlined SVG: ${path.basename(resolvedPath)} (${formatFileSize(fileSize)})`, 'green');
          stats.svgsInlined++;
          modificationCount++;
        } else {
          stats.errors++;
        }
      } else {
        // SVG too large, convert to base64
        const base64 = imageToBase64(resolvedPath);
        if (base64) {
          const newTag = `<img ${beforeSrc}src="${base64}"${afterSrc}>`;
          htmlContent = htmlContent.replace(fullTag, newTag);
          log(`  ✓ Base64 encoded SVG (>5KB): ${path.basename(resolvedPath)} (${formatFileSize(fileSize)})`, 'green');
          stats.pngsEncoded++;
          modificationCount++;
        } else {
          stats.errors++;
        }
      }
    }
    // Handle PNG and other image formats
    else if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      const base64 = imageToBase64(resolvedPath);
      
      if (base64) {
        const newTag = `<img ${beforeSrc}src="${base64}"${afterSrc}>`;
        htmlContent = htmlContent.replace(fullTag, newTag);
        log(`  ✓ Base64 encoded: ${path.basename(resolvedPath)} (${formatFileSize(fileSize)})`, 'green');
        stats.pngsEncoded++;
        modificationCount++;
      } else {
        stats.errors++;
      }
    } else {
      log(`  ⊝ Skipped (unsupported format): ${path.basename(resolvedPath)}`, 'yellow');
      stats.skipped++;
    }
  }
  
  // Write output file
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  
  const originalSize = fs.statSync(htmlFilePath).size;
  const newSize = fs.statSync(outputPath).size;
  const increase = ((newSize - originalSize) / originalSize * 100).toFixed(1);
  
  log(`\n  📊 Summary:`, 'bright');
  log(`     • CSS inlined: ${stats.cssInlined ? 'Yes' : 'No'}`);
  log(`     • SVGs inlined: ${stats.svgsInlined}`);
  log(`     • Images base64 encoded: ${stats.pngsEncoded}`);
  log(`     • Skipped: ${stats.skipped}`);
  if (stats.errors > 0) {
    log(`     • Errors: ${stats.errors}`, 'red');
  }
  log(`     • Original size: ${formatFileSize(originalSize)}`);
  log(`     • New size: ${formatFileSize(newSize)} (+${increase}%)`);
  
  return stats;
}

// Find all HTML files recursively
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip output directory
      if (filePath === OUTPUT_DIR) return;
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
function main() {
  log('\n╔═══════════════════════════════════════════════════════╗', 'bright');
  log('║   Asset Embedding Build Script                       ║', 'bright');
  log('║   Inline SVGs & Base64 Encode PNGs                   ║', 'bright');
  log('╚═══════════════════════════════════════════════════════╝\n', 'bright');
  
  const startTime = Date.now();
  
  // Find all HTML files
  const htmlFiles = findHtmlFiles(BASE_DIR);
  
  log(`Found ${htmlFiles.length} HTML file(s) to process\n`, 'blue');
  
  let totalStats = {
    cssInlined: 0,
    svgsInlined: 0,
    pngsEncoded: 0,
    skipped: 0,
    errors: 0
  };
  
  // Process each HTML file
  htmlFiles.forEach(htmlFile => {
    const relativePath = path.relative(BASE_DIR, htmlFile);
    const outputPath = path.join(OUTPUT_DIR, relativePath);
    
    const stats = processHtmlFile(htmlFile, outputPath);
    
    if (stats.cssInlined) totalStats.cssInlined++;
    totalStats.svgsInlined += stats.svgsInlined;
    totalStats.pngsEncoded += stats.pngsEncoded;
    totalStats.skipped += stats.skipped;
    totalStats.errors += stats.errors;
  });
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  log('\n╔═══════════════════════════════════════════════════════╗', 'bright');
  log('║   Build Complete!                                     ║', 'green');
  log('╚═══════════════════════════════════════════════════════╝\n', 'bright');
  
  log('📊 Total Statistics:', 'bright');
  log(`   • Files processed: ${htmlFiles.length}`);
  log(`   • CSS inlined: ${totalStats.cssInlined} files`);
  log(`   • SVGs inlined: ${totalStats.svgsInlined}`);
  log(`   • Images base64 encoded: ${totalStats.pngsEncoded}`);
  log(`   • Skipped: ${totalStats.skipped}`);
  if (totalStats.errors > 0) {
    log(`   • Errors: ${totalStats.errors}`, 'red');
  }
  log(`   • Time taken: ${duration}s`);
  log(`   • Output directory: ${path.relative(process.cwd(), OUTPUT_DIR)}\n`, 'cyan');
  
  if (totalStats.errors > 0) {
    log('⚠️  Some errors occurred during processing. Check the log above for details.\n', 'yellow');
    process.exit(1);
  }
}

// Run the script
main();
