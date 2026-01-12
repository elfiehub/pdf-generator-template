# PDF Generator Template

A repository containing HTML templates for backend PDF generation. These templates are designed to be used by backend services to generate PDF documents from HTML content.

## Overview

This repository stores HTML templates that can be used by backend services (e.g., using libraries like Puppeteer, Playwright, wkhtmltopdf, or similar tools) to generate PDF documents. The templates are self-contained with their associated CSS and assets.

## Project Structure

```
pdf-generator-template/
├── src/
│   ├── health-report/          # Health report templates
│   │   ├── index.html          # Main health report template
│   │   ├── styles.css          # Styles for health report
│   │   ├── chart.js            # Chart utilities
│   │   └── front-cover-page/   # Front cover page templates
│   │       ├── front-cover-page.html
│   │       └── front-cover-page-rtl.html
│   └── assets/                 # Static assets
│       ├── elfie-logo.svg
│       └── health-report/      # Health report specific assets
│           ├── *.svg           # SVG icons and graphics
│           └── *.png           # PNG images
└── README.md
```

## Usage

Backend services can use these HTML templates to generate PDFs by:

1. Loading the HTML template file
2. Injecting dynamic data (if needed)
3. Rendering the HTML to PDF using a backend PDF generation library

### Example Backend Integration

```javascript
// Example using Puppeteer (Node.js)
const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load the HTML template
  const html = fs.readFileSync('src/health-report/index.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
}
```

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

### Health Report
Located in `src/health-report/`, this template includes:
- Main health report page (`index.html`)
- Front cover page templates (LTR and RTL versions)
- Associated styles and assets

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
