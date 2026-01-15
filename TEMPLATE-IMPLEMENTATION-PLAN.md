# Template Implementation Plan

This document outlines the workflow for implementing HTML templates from Figma designs that can be used with HandlebarsJS.

## Workflow Steps

### 1. Access Figma Design
- Use the Figma MCP tools to access the design:
  - `get_design_context` - Get the design code and structure
  - `get_screenshot` - Get a visual reference of the design
- Extract the node ID from the Figma URL (format: `node-id=810-7465` becomes `810:7465`)

### 2. Create HTML Template
- Create a new directory in `src/health-report/` with the template name (e.g., `report-context/`)
- Create the main HTML file: `template-name.html`
- Structure:
  - Single HTML document
  - Include HandlebarsJS variables using `{{variableName}}` syntax
  - Use `{{#each}}` for arrays
  - Link to `../styles.css` for base styles
  - Add template-specific styles in `<style>` tag
  - Reference assets from `../../assets/health-report/`

### 3. Create RTL Version
- Create `template-name-rtl.html` in the same directory
- Changes needed:
  - Set `dir="rtl"` and `lang="ar"` on `<html>` tag
  - Add `Noto Sans Arabic` font import
  - Reverse flex directions (`flex-direction: row-reverse`)
  - Align text to right (`text-align: right`)
  - Reverse icon positions
  - Update Arabic translations for static text (if applicable)

### 4. Export Assets
- Export required assets from Figma:
  - Icons: Export as SVG (preferred) or PNG
  - Logos: Export as SVG
  - Images: Export as PNG
- Save all assets to `src/assets/health-report/`
- Naming convention: Use kebab-case (e.g., `report-context-icon.svg`)

### 5. Generate Embedded Versions
- Run the build script to create embedded HTML files:
  ```bash
  cd src/health-report
  node build-embedded.js template-name/
  ```
- This will:
  - Inline CSS from `styles.css`
  - Inline SVG files (< 5KB)
  - Base64 encode PNG and large SVG files
  - Create embedded files in `embedded/template-name/`

### 6. Update index.html
- Add template cards to `index.html`:
  - Add LTR version card
  - Add RTL version card (if applicable)
  - Update template count
  - Add appropriate search keywords in `data-search` attribute
  - Use appropriate icon colors (pink, blue, cyan)

## Template Structure Example

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Report - Template Name</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        /* Template-specific styles */
    </style>
</head>
<body>
    <div class="page">
        <!-- Header -->
        <div class="header">
            <!-- Header content with {{userName}} etc. -->
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Sections with Handlebars variables -->
            {{#each items}}
            <!-- Loop content -->
            {{/each}}
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <!-- Footer with {{reportDate}}, {{currentPage}}, {{totalPages}} -->
        </div>
    </div>
</body>
</html>
```

## Common Handlebars Variables

- `{{userName}}` - User's name
- `{{reportDate}}` - Report date
- `{{currentPage}}` - Current page number
- `{{totalPages}}` - Total number of pages
- `{{footerText}}` - Footer text (e.g., "For Personal Use Only")
- Arrays: Use `{{#each arrayName}}` for lists

## Asset Requirements Checklist

Before running build-embedded.js, ensure:
- [ ] All SVG icons are exported and saved
- [ ] All PNG images are exported and saved
- [ ] Logo files are available
- [ ] Asset paths in HTML are correct (relative to template file)

## Notes

- The build script will show warnings for missing assets
- Large SVGs (>5KB) will be base64 encoded instead of inlined
- All embedded files are self-contained (no external dependencies)
- Templates should be print-friendly (595px width for A4)

## Example: Report Context Template

**Template Name:** `report-context`

**Files Created:**
- `src/health-report/report-context/report-context.html`
- `src/health-report/report-context/report-context-rtl.html`
- `src/health-report/embedded/report-context/report-context.html`
- `src/health-report/embedded/report-context/report-context-rtl.html`

**Assets Required:**
- `report-context-icon.svg` (stacked documents icon) - **NEEDS TO BE EXPORTED FROM FIGMA**
- `faq.svg` (already exists)

**Handlebars Variables Used:**
- `{{userName}}`
- `{{reportContextParagraphs}}` (array)
- `{{questionsForDoctor}}` (array)
- `{{reportDate}}`
- `{{footerText}}`
- `{{currentPage}}`
- `{{totalPages}}`
