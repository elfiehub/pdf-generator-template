# PDF Generator Template

A repository containing **self-contained HTML templates** for backend PDF generation. All assets (SVGs, PNGs) are embedded directly in the HTML, making them completely backend-friendly with **zero external dependencies**.

## 🌟 Key Features

- ✅ **Self-Contained Templates** - No external asset hosting required
- ✅ **Base64 Embedded Assets** - All images embedded as data URLs
- ✅ **Inline SVGs** - Small SVG files inlined directly
- ✅ **Backend-Ready** - Perfect for Puppeteer, wkhtmltopdf, WeasyPrint
- ✅ **Automated Build Script** - Convert templates with one command
- ✅ **Template Variables** - Easy dynamic data injection

## 🚀 Quick Start

```bash
# 1. Build embedded templates
npm run build:embed

# 2. Use in your backend
# Templates are now in src/health-report/embedded/
```

See **[QUICK-START.md](QUICK-START.md)** for detailed instructions.

## Overview

This repository provides HTML templates optimized for backend PDF generation. Using our automated build script, all assets are embedded directly into HTML files, eliminating the need for:
- Asset hosting on your backend
- File system access during PDF generation
- Complex path resolution
- Network requests for assets

## Project Structure

```
pdf-generator-template/
├── src/
│   ├── health-report/
│   │   ├── embedded/              # 🎯 USE THESE - Self-contained templates
│   │   │   ├── index.html
│   │   │   ├── front-cover-page/
│   │   │   ├── table-of-content/
│   │   │   └── section-1/
│   │   ├── build-embedded.js      # Build script
│   │   ├── BUILD-README.md        # Build documentation
│   │   ├── index.html             # Source templates (edit these)
│   │   ├── styles.css
│   │   └── ...
│   └── assets/                    # Original assets
│       ├── elfie-logo.svg
│       └── health-report/
├── examples/                      # Usage examples
│   ├── generate-pdf-example.js   # Node.js example
│   └── generate-pdf-example.py   # Python example
├── QUICK-START.md                 # ⭐ Start here
├── IMPLEMENTATION-SUMMARY.md      # Technical details
└── package.json
```

## Usage

### Step 1: Build Embedded Templates

```bash
npm run build:embed
```

This generates self-contained HTML files in `src/health-report/embedded/` with all assets embedded.

### Step 2: Use in Your Backend

#### Node.js (Puppeteer)

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDF() {
  // 1. Load embedded template
  let html = fs.readFileSync('src/health-report/embedded/front-cover-page/front-cover-page.html', 'utf8');
  
  // 2. Replace template variables
  html = html.replace('{{name}}', 'John Doe');
  html = html.replace('{{gender}}', 'Male');
  html = html.replace('{{country}}', 'USA');
  html = html.replace('{{birthYear}}', '1990');
  html = html.replace('{{reportPeriod}}', 'Jan 2024 - Dec 2024');
  html = html.replace('{{footerText}}', '2024 • Personal Use Only');
  
  // 3. Generate PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path: 'health-report.pdf',
    format: 'A4',
    printBackground: true
  });
  await browser.close();
}
```

#### Python (WeasyPrint)

```python
from weasyprint import HTML

# 1. Load embedded template
with open('src/health-report/embedded/front-cover-page/front-cover-page.html', 'r') as f:
    html = f.read()

# 2. Replace template variables
html = html.replace('{{name}}', 'Jane Smith')
html = html.replace('{{gender}}', 'Female')
html = html.replace('{{country}}', 'UK')

# 3. Generate PDF
HTML(string=html).write_pdf('health-report.pdf')
```

See **[examples/](examples/)** for complete working code.

## Template Guidelines

### Styling Tips

1. **Use print-safe CSS**: Avoid complex animations or effects that may not render in PDF
2. **Set explicit dimensions**: Define widths and heights for consistent rendering
3. **Use relative paths**: Ensure asset paths work from the template location
4. **Test page breaks**: Use `page-break-before`, `page-break-after`, or `page-break-inside` for multi-page documents

### Example CSS for PDF

```css
@media print {
  body {
    font-family: Arial, sans-serif;
    font-size: 12pt;
    color: #000;
  }
  
  .page-break {
    page-break-after: always;
  }
  
  .no-print {
    display: none;
  }
}
```

## Available Templates

All templates are in `src/health-report/embedded/` (after running build script):

| Template | Description | Variables |
|----------|-------------|-----------|
| **front-cover-page.html** | Cover page (LTR) | name, gender, country, birthYear, reportPeriod, footerText |
| **front-cover-page-rtl.html** | Cover page (RTL) | Same as above |
| **table-of-content.html** | Table of contents (LTR) | name, page1-7, currentPage, totalPages, footerText |
| **table-of-content-rtl.html** | Table of contents (RTL) | Same as above |
| **section-1-cover.html** | Section cover (LTR) | name, section names/pages, currentPage, totalPages |
| **section-1-cover-rtl.html** | Section cover (RTL) | Same as above |
| **index.html** | Main content page | Various health metrics |

## 📊 Build Statistics

- **Files Processed**: 7 HTML templates
- **SVGs Inlined**: 12 (direct embedding for small files)
- **Images Base64 Encoded**: 15 PNGs
- **Build Time**: ~0.02s
- **Size Increase**: 88% - 14,831% (acceptable for backend use)

## 🎯 Benefits

### Before (Traditional Approach)
```
❌ Backend needs to host assets
❌ Complex path resolution
❌ File system dependencies
❌ Slow PDF generation (HTTP requests)
```

### After (Embedded Assets)
```
✅ Single self-contained HTML file
✅ No asset hosting needed
✅ No file system access for assets
✅ Faster PDF generation
✅ Simpler deployment
```

## 📚 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Get started in 3 steps
- **[BUILD-README.md](src/health-report/BUILD-README.md)** - Build script documentation
- **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - Technical details
- **[examples/](examples/)** - Working code examples

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**HTML templates for backend PDF generation**
