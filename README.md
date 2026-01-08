# PDF Generator Template

A modern, client-side PDF generator built with HTML, CSS, and JavaScript. This template allows you to create professional PDF documents directly in the browser without any server-side processing.

## Features

- 🎨 **Custom Styling**: Full control over PDF layout using HTML and CSS
- 📄 **Client-Side Generation**: No server required - all processing happens in the browser
- 🚀 **Easy to Use**: Simple API for generating PDFs from HTML content
- 📱 **Responsive**: Support for various page sizes and orientations
- 🎯 **Lightweight**: Minimal dependencies for fast loading
- 🔧 **Customizable**: Easy to modify templates and styling

## Technologies Used

- **HTML5**: Structure and content markup
- **CSS3**: Styling and layout
- **JavaScript**: PDF generation logic
- **jsPDF** or **html2pdf.js**: Core PDF generation library (to be implemented)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-generator-template
```

2. Open `index.html` in your web browser, or serve it using a local development server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### Basic Example

```javascript
// Generate a simple PDF
function generatePDF() {
  const element = document.getElementById('content');
  
  // Configuration options
  const options = {
    margin: 10,
    filename: 'document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // Generate PDF
  html2pdf().set(options).from(element).save();
}
```

### Custom Template

```html
<div id="pdf-content">
  <h1>Invoice #12345</h1>
  <p>Date: January 8, 2026</p>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Product A</td>
        <td>2</td>
        <td>$50.00</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Project Structure

```
pdf-generator-template/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles for PDF content
├── js/
│   └── pdf-generator.js # PDF generation logic
├── templates/
│   ├── invoice.html    # Invoice template
│   ├── report.html     # Report template
│   └── certificate.html # Certificate template
├── assets/
│   ├── images/         # Images for PDFs
│   └── fonts/          # Custom fonts
└── README.md           # This file
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `margin` | Number/Array | 0 | PDF margins (in mm) |
| `filename` | String | 'document.pdf' | Output filename |
| `pagebreak` | Object | - | Page break settings |
| `image` | Object | - | Image rendering options |
| `html2canvas` | Object | - | HTML to canvas options |
| `jsPDF` | Object | - | jsPDF configuration |

## Common Use Cases

### 1. Invoice Generation
Generate professional invoices with company branding and itemized billing.

### 2. Reports
Create detailed reports with charts, tables, and formatted data.

### 3. Certificates
Generate certificates of completion or achievement with custom designs.

### 4. Forms
Convert filled-out forms into downloadable PDFs.

### 5. Receipts
Create transaction receipts for e-commerce or point-of-sale systems.

## Customization

### Styling Tips

1. **Use print-safe CSS**: Avoid complex animations or effects
2. **Set explicit dimensions**: Define widths and heights for consistent rendering
3. **Use web-safe fonts**: Or include custom fonts via base64 or CDN
4. **Test page breaks**: Use `page-break-before`, `page-break-after`, or `page-break-inside`

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

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE | - | ❌ Not supported |

## Performance Tips

- Optimize images before including them in PDFs
- Minimize DOM complexity for faster rendering
- Use pagination for long documents
- Consider lazy loading for multiple PDFs

## Troubleshooting

### PDF not generating
- Check browser console for errors
- Ensure all dependencies are loaded
- Verify HTML structure is valid

### Layout issues
- Test with different page sizes
- Check CSS specificity conflicts
- Use absolute positioning sparingly

### Large file sizes
- Compress images
- Reduce image quality settings
- Remove unnecessary elements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [html2canvas](https://html2canvas.hertzen.com/)
- [CSS Print Styling Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)

## Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues for solutions

## Roadmap

- [ ] Add multiple template examples
- [ ] Implement drag-and-drop template editor
- [ ] Add support for dynamic data binding
- [ ] Create template marketplace
- [ ] Add batch PDF generation
- [ ] Implement server-side rendering option

---

**Made with ❤️ for easy PDF generation**
