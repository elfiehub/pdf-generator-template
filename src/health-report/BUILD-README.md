# Asset Embedding Build Script

This build script automatically embeds all assets (SVGs and PNGs) directly into HTML templates, making them completely self-contained and backend-friendly for PDF generation.

## 🎯 What It Does

1. **Inlines Small SVGs** (<5KB) - Replaces `<img>` tags with inline SVG code
2. **Base64 Encodes Images** - Converts PNG, JPG, and large SVGs to data URLs
3. **Preserves Structure** - Maintains the same directory structure in the output
4. **Detailed Reporting** - Shows exactly what was processed and file size changes

## 🚀 Quick Start

### Run the Build Script

```bash
# Build all templates
npm run build:embed

# Build specific directory
npm run build:cover        # Front cover pages only
npm run build:toc          # Table of contents only
npm run build:section1     # Section 1 only
npm run build:index        # Index.html only

# Or directly with Node.js
node src/health-report/build-embedded.js                    # All files
node src/health-report/build-embedded.js front-cover-page/  # Specific directory
node src/health-report/build-embedded.js index.html         # Specific file
```

### Watch Mode (Auto-rebuild on changes)

```bash
# Install nodemon first
npm install

# Run in watch mode
npm run build:embed:watch
```

### Command Line Options

```bash
# Show help
node src/health-report/build-embedded.js --help

# Process specific paths
node src/health-report/build-embedded.js [path]

# Examples:
node src/health-report/build-embedded.js                              # All files
node src/health-report/build-embedded.js front-cover-page/            # Directory
node src/health-report/build-embedded.js index.html                   # Single file
node src/health-report/build-embedded.js front-cover-page/front-cover-page.html
```

## 📁 Output

The script generates embedded HTML files in:

```
src/health-report/embedded/
├── index.html
├── front-cover-page/
│   ├── front-cover-page.html
│   └── front-cover-page-rtl.html
├── table-of-content/
│   ├── table-of-content.html
│   └── table-of-content-rtl.html
└── section-1/
    ├── section-1-cover.html
    └── section-1-cover-rtl.html
```

## 🔍 What Gets Converted

### SVG Files (Inlined if <5KB)
- ✅ `elfie-logo.svg` → Inline SVG
- ✅ `arrow-down.svg` → Inline SVG
- ✅ `arrow-up.svg` → Inline SVG
- ✅ `arrow-right.svg` → Inline SVG
- ✅ All icon SVGs → Inline SVG

### PNG Files (Base64 Encoded)
- ✅ `profile-avatar.png` → Base64
- ✅ `sun-icon.png` → Base64
- ✅ `mental.png` → Base64
- ✅ `mobility.png` → Base64
- ✅ `social.png` → Base64
- ✅ `self-care.png` → Base64
- ✅ `pain.png` → Base64
- ✅ `finance.png` → Base64

## 📊 Example Output

```
📄 Processing: index.html

  ✓ Inlined SVG: elfie-logo.svg (2.1KB)
  ✓ Inlined SVG: arrow-down.svg (0.8KB)
  ✓ Inlined SVG: arrow-right.svg (0.9KB)
  ✓ Base64 encoded: sun-icon.png (45.2KB)
  ✓ Base64 encoded: mental.png (12.3KB)
  
  📊 Summary:
     • SVGs inlined: 3
     • Images base64 encoded: 6
     • Skipped: 0
     • Original size: 7.5KB
     • New size: 125.3KB (+1570.7%)
```

## ✅ Advantages

### Self-Contained HTML
- ✅ No external file dependencies
- ✅ Single file contains everything
- ✅ Perfect for PDF generation (Puppeteer, wkhtmltopdf)

### Backend-Friendly
- ✅ No asset serving required
- ✅ Easy to template with dynamic data
- ✅ Simple deployment

### Performance
- ✅ No HTTP requests for assets
- ✅ Faster PDF generation
- ✅ Better for offline use

## ⚠️ Considerations

### File Size
- 📈 Embedded HTML files are significantly larger
- 📈 Base64 encoding adds ~33% to image size
- 💡 Tip: Use compressed PNG images before embedding

### Maintenance
- 🔧 Update source HTML files, not embedded versions
- 🔧 Re-run build script after asset changes
- 🔧 Add build script to your deployment pipeline

### Caching
- ⚠️ Can't cache images separately
- 💡 Good for: PDF generation, email templates
- 💡 Not ideal for: Regular web serving

## 🔧 Configuration

Edit `build-embedded.js` to customize:

```javascript
// Configuration
const MAX_SVG_SIZE = 5 * 1024; // 5KB limit for SVG inlining
const OUTPUT_DIR = path.join(BASE_DIR, 'embedded'); // Output directory
```

## 🐛 Troubleshooting

### "Asset not found" Errors
- Check that asset paths are relative (e.g., `../../assets/image.png`)
- Verify assets exist in the `src/assets` directory

### SVG Not Rendering
- Some SVGs may need manual cleanup
- Check for external dependencies in SVG code
- Verify SVG doesn't reference external fonts

### Large File Sizes
- Optimize PNG images before embedding (use tools like TinyPNG)
- Consider reducing image dimensions
- Compress SVGs with SVGO

## 📝 Integration with Backend

### Using Embedded Templates

```javascript
// Node.js example
const fs = require('fs');

// Read embedded HTML
let html = fs.readFileSync('src/health-report/embedded/index.html', 'utf8');

// Replace template variables
html = html.replace('{{name}}', 'John Doe');
html = html.replace('{{page1}}', '5');

// Generate PDF with Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html);
await page.pdf({ path: 'output.pdf', format: 'A4' });
```

### Python Example

```python
import pdfkit

# Read embedded HTML
with open('src/health-report/embedded/index.html', 'r') as f:
    html = f.read()

# Replace template variables
html = html.replace('{{name}}', 'John Doe')
html = html.replace('{{page1}}', '5')

# Generate PDF
pdfkit.from_string(html, 'output.pdf')
```

## 🔄 Workflow Recommendation

1. **Development**: Work with original HTML files in `src/health-report/`
2. **Build**: Run `npm run build:embed` before deployment
3. **Backend**: Use files from `embedded/` directory for PDF generation
4. **Version Control**: Add `embedded/` to `.gitignore` (optional, or commit for easier deployment)

## 📚 Related Files

- `build-embedded.js` - Main build script
- `package.json` - NPM scripts
- `styles.css` - Shared styles (not embedded, keep as external file)

## 🤝 Contributing

To add support for more file types:

1. Edit `build-embedded.js`
2. Add file extension to the processing logic
3. Test with sample files
4. Update this README

## 📄 License

MIT
