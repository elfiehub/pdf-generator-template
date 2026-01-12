# Health Report - Chart.js Implementation

This implementation showcases a health report interface with an interactive **Quality of Life** donut chart built using Chart.js.

## 📊 Chart Evaluation

### ✅ Can the chart be implemented with Chart.js?

**YES!** The "Quality of Life" chart from the Figma design is a **donut chart** (also called doughnut chart) with 6 segments, which is perfectly supported by Chart.js as one of its core chart types.

### Chart Features Implemented

- **6-segment donut chart** representing health dimensions:
  - Anxiety - 50% (Pink)
  - Mobility - 80% (Blue)
  - Social - 50% (Cyan)
  - Self-care - 80% (Yellow/Orange)
  - Pain - 65% (Coral/Red)
  - Finance - 75% (Green)

- **Interactive features**:
  - Hover effects with cursor pointer
  - Smooth animations on load
  - Custom tooltips showing percentage values
  - Color-coded segments matching the design

## 🎨 Design Specifications

The implementation follows the Figma design specifications:

- **Colors**: Matches the exact color palette from the design
- **Typography**: Uses Noto Sans and Inter fonts as specified
- **Layout**: 595px width (PDF page width)
- **Spacing**: Follows the design system spacing values
- **Icons**: All assets exported as SVG/PNG from Figma

## 📁 File Structure

```
src/
├── health-report/
│   ├── index.html          # Main HTML structure
│   ├── styles.css          # Styling (no Tailwind, pure CSS)
│   ├── chart.js            # Chart.js implementation
│   └── README.md           # This file
└── assets/
    └── health-report/
        ├── arrow-down.svg
        ├── arrow-up.svg
        ├── arrow-right.svg
        ├── elfie-logo-bg.svg
        ├── sun-icon.png
        ├── social.png
        ├── mental.png
        ├── mobility.png
        ├── self-care.png
        ├── pain.png
        └── finance.png
```

## 🚀 Usage

### Basic Usage

1. Open `index.html` in a web browser
2. The chart will automatically render with the default data
3. Hover over chart segments to see tooltips with percentage values

### Viewing the Report

Simply open the HTML file in any modern web browser:

```bash
# From the project root
open src/health-report/index.html
# or
google-chrome src/health-report/index.html
# or
firefox src/health-report/index.html
```

### Live Server (Recommended)

For better performance and hot-reload during development:

```bash
# Using Python
cd src/health-report
python -m http.server 8000

# Using Node.js (if you have http-server installed)
cd src/health-report
npx http-server -p 8000

# Then open: http://localhost:8000
```

## 🔧 Customization

### Updating Chart Data

You can dynamically update the chart data using the provided helper function:

```javascript
// Update all 6 segments with new percentage values
updateChartData([55, 75, 60, 85, 70, 80]);
```

### Changing Chart Colors

Customize the color scheme:

```javascript
// Update colors for all 6 segments
updateChartColors([
    '#FF0000', // Anxiety
    '#00FF00', // Mobility
    '#0000FF', // Social
    '#FFFF00', // Self-care
    '#FF00FF', // Pain
    '#00FFFF'  // Finance
]);
```

### Accessing the Chart Instance

The chart instance is available globally:

```javascript
// Access the chart
const chart = window.qualityOfLifeChart;

// Update options
chart.options.cutout = '70%';
chart.update();

// Get current data
console.log(chart.data.datasets[0].data);
```

## 📊 Chart.js Configuration

### Chart Type
- **Type**: `doughnut`
- **Cutout**: 65% (size of the center hole)
- **Border**: 3px white border between segments

### Animation
- **Duration**: 1000ms
- **Easing**: `easeInOutQuart`
- **Effects**: Rotate and scale animations

### Interactions
- **Hover**: Segments slightly expand on hover (8px offset)
- **Tooltip**: Custom styled tooltips with percentage display
- **Cursor**: Changes to pointer when hovering over segments

## 🎯 Design Fidelity

This implementation maintains high fidelity to the Figma design:

- ✅ Exact color matching for all chart segments
- ✅ Proper positioning of labels around the chart
- ✅ Consistent typography and spacing
- ✅ Responsive layout that works on different screen sizes
- ✅ All icons and assets properly integrated
- ✅ Border and shadow effects matching the design

## 🌐 Browser Compatibility

The implementation works on all modern browsers:

- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## 📦 Dependencies

- **Chart.js v4.4.1** - Loaded via CDN
  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  ```

- **Google Fonts** - Noto Sans and Inter
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
  ```

## 🔍 Technical Details

### Why Chart.js?

1. **Perfect Match**: Chart.js has native support for donut/doughnut charts
2. **Lightweight**: Only ~60KB minified + gzipped
3. **Well Documented**: Extensive documentation and examples
4. **Customizable**: Easy to match design specifications
5. **Interactive**: Built-in hover effects and animations
6. **Responsive**: Works well on all screen sizes

### Alternative Implementation Options

While Chart.js is the recommended solution, the chart could also be implemented with:

- **D3.js**: More complex but highly customizable
- **Recharts**: React-based alternative
- **ApexCharts**: Another popular charting library
- **Canvas API**: Pure JavaScript with manual drawing

However, Chart.js provides the best balance of simplicity and functionality for this use case.

## 🐛 Troubleshooting

### Chart not displaying

1. Check console for errors
2. Ensure Chart.js CDN is accessible
3. Verify canvas element has an ID: `qualityOfLifeChart`
4. Check if JavaScript is enabled in the browser

### Colors don't match design

The colors are defined in `chart.js` in the `backgroundColor` array. Adjust hex values to match your specific design requirements.

### Labels overlapping

Adjust label positions in `styles.css` under the `.label-*` classes. Use `transform: translateX()` and `translateY()` to fine-tune positions.

## 📝 Notes

- The implementation uses **vanilla JavaScript** (no frameworks)
- **No Tailwind CSS** - pure CSS with custom properties (CSS variables)
- Fully **responsive** design
- **Accessible** - can be enhanced with ARIA labels if needed
- **Print-friendly** - designed for PDF generation

## 🎨 Color Palette

| Dimension | Color | Hex Code |
|-----------|-------|----------|
| Anxiety | Pink | `#E54C8C` |
| Mobility | Blue | `#3366FF` |
| Social | Cyan | `#33D4CC` |
| Self-care | Yellow/Orange | `#FFB830` |
| Pain | Coral/Red | `#F27171` |
| Finance | Green | `#7DD976` |

## 📄 License

This implementation is part of the PDF Generator Template project.

---

**Created**: January 2026  
**Chart Library**: Chart.js v4.4.1  
**Design Source**: Figma Health Report Template
