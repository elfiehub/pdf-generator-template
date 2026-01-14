# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Build Embedded Templates

```bash
# Navigate to project directory
cd /Users/thongdam/Documents/pdf-generator-template

# Run the build script
npm run build:embed
```

**Output:**
- Embedded HTML files in `src/health-report/embedded/`
- All assets (SVGs, PNGs) embedded directly in HTML
- Ready for backend PDF generation

### Step 2: Test the Output

```bash
# Run Node.js example
node examples/generate-pdf-example.js

# Or Python example
python examples/generate-pdf-example.py
```

This creates a debug HTML file you can open in your browser to verify everything looks correct.

### Step 3: Integrate with Your Backend

Choose your language and follow the example:

#### Node.js

```javascript
const fs = require('fs');

// Read embedded template
let html = fs.readFileSync('src/health-report/embedded/front-cover-page/front-cover-page.html', 'utf8');

// Replace variables
html = html.replace('{{name}}', 'John Doe');
html = html.replace('{{gender}}', 'Male');
html = html.replace('{{country}}', 'USA');
html = html.replace('{{birthYear}}', '1990');
html = html.replace('{{reportPeriod}}', 'Jan 2024 - Dec 2024');
html = html.replace('{{footerText}}', '2024 • Personal Use Only');

// Use with your PDF generator
// puppeteer, wkhtmltopdf, etc.
```

#### Python

```python
# Read embedded template
with open('src/health-report/embedded/front-cover-page/front-cover-page.html', 'r') as f:
    html = f.read()

# Replace variables
html = html.replace('{{name}}', 'Jane Smith')
html = html.replace('{{gender}}', 'Female')
html = html.replace('{{country}}', 'UK')
html = html.replace('{{birthYear}}', '1985')
html = html.replace('{{reportPeriod}}', 'Jan 2024 - Dec 2024')
html = html.replace('{{footerText}}', '2024 • Personal Use Only')

# Use with your PDF generator
# weasyprint, pdfkit, etc.
```

## 📋 Template Variables

Each template has these placeholders you can replace:

### Front Cover Page
- `{{name}}` - Patient name
- `{{gender}}` - Biological sex
- `{{country}}` - Country
- `{{birthYear}}` - Year of birth
- `{{reportPeriod}}` - Report period
- `{{footerText}}` - Footer text

### Table of Contents
- `{{name}}` - Patient name
- `{{page1}}` - Page number for section 1
- `{{page2}}` - Page number for section 2
- `{{page3}}` - Page number for section 3
- `{{page4}}` - Page number for section 4
- `{{page5}}` - Page number for section 5
- `{{page6}}` - Page number for section 6
- `{{page7}}` - Page number for section 7
- `{{currentPage}}` - Current page number
- `{{totalPages}}` - Total pages
- `{{footerText}}` - Footer text

### Section 1 Cover
- `{{name}}` - Patient name
- `{{section1Name}}` - Section 1 name
- `{{section1Page}}` - Section 1 page
- `{{section2Name}}` - Section 2 name
- `{{section2Page}}` - Section 2 page
- `{{section3Name}}` - Section 3 name
- `{{section3Page}}` - Section 3 page
- `{{section4Name}}` - Section 4 name
- `{{section4Page}}` - Section 4 page
- `{{currentPage}}` - Current page number
- `{{totalPages}}` - Total pages
- `{{footerDate}}` - Footer date
- `{{footerText}}` - Footer text

## 🔄 Making Changes

1. **Edit source templates** in `src/health-report/` (not the embedded versions)
2. **Run build script** to regenerate: `npm run build:embed`
3. **Test** the new embedded files

## 📁 Available Templates

All in `src/health-report/embedded/`:

1. **front-cover-page.html** - Cover page (LTR)
2. **front-cover-page-rtl.html** - Cover page (RTL)
3. **table-of-content.html** - Table of contents (LTR)
4. **table-of-content-rtl.html** - Table of contents (RTL)
5. **section-1-cover.html** - Section 1 cover (LTR)
6. **section-1-cover-rtl.html** - Section 1 cover (RTL)
7. **index.html** - Main content page

## 💡 Tips

- **File Size**: Embedded files are larger (88% - 14,000% increase) but self-contained
- **Watch Mode**: Use `npm run build:embed:watch` during development
- **Debug**: Check `examples/debug-output.html` after running examples
- **Optimize**: Compress images before embedding for smaller file sizes

## 🆘 Troubleshooting

### Build fails
```bash
# Make sure Node.js is installed
node --version

# Should be v12 or higher
```

### Assets not embedding
- Check that assets exist in `src/assets/`
- Verify relative paths in source HTML
- Review build script output for errors

### PDF not generating
- Test HTML in browser first
- Verify all template variables are replaced
- Check PDF generator supports base64 images

## 📚 Full Documentation

- **BUILD-README.md** - Complete build script documentation
- **IMPLEMENTATION-SUMMARY.md** - Technical details and architecture
- **examples/** - Working code examples

---

**Need Help?** Check the full documentation or review the example implementations.
