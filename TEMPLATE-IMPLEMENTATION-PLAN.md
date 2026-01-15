# Template Implementation Plan

This document outlines the workflow for implementing HTML templates from Figma designs that can be used with HandlebarsJS. This plan is generic and can be used with any template type.

## Usage

When using this plan, replace the following placeholders:
- `{TEMPLATE_TYPE}` - The type/category of template (e.g., `health-report`, `invoice`, `certificate`)
- `{template-name}` - The specific template name (e.g., `report-context`, `invoice-header`, `certificate-template`)
- `{TEMPLATE_TITLE}` - Display title for the template (e.g., `Health Report`, `Invoice`, `Certificate`)

## Workflow Steps

### 1. Access Figma Design
- **Input:** User can provide one or multiple Figma URLs
  - Single URL: `https://figma.com/design/:fileKey/:fileName?node-id=810-7465`
  - Multiple URLs: Provide as a list/array (e.g., comma-separated or line-separated)
  - Each URL may represent different sections, pages, or components of the template
- **Extract node IDs** from Figma URLs:
  - Format: `node-id=810-7465` becomes `810:7465` (replace `-` with `:`)
  - For multiple URLs, extract node IDs for each URL
  - Example: 
    - URL 1: `node-id=810-7465` → `810:7465`
    - URL 2: `node-id=123-456` → `123:456`
- **Process each Figma design** using the MCP tools in this recommended order:
  1. **`get_metadata`** (optional, for overview) - Get metadata for a node in XML format
     - Useful for getting an overview of the structure before diving deep
     - Returns node IDs, layer types, names, positions, and sizes
     - Use this to understand the hierarchy and identify specific node IDs to work with
     - Can be called on page IDs (e.g., `0:1`) or specific node IDs
     - **For multiple URLs:** Call this for each node ID to understand the overall structure
  2. **`get_variable_defs`** (optional, for design tokens) - Get variable definitions for design system values
     - Retrieves reusable design tokens like colors, fonts, sizes, and spacings
     - Returns variable definitions (e.g., `{'icon/default/secondary': #949494}`)
     - Use this to extract design system values that should be used consistently
     - Helpful for creating CSS variables or matching exact design specifications
     - **For multiple URLs:** Extract variables from each design and consolidate into a unified design system
  3. **`get_design_context`** (recommended, primary tool) - Get the design code and structure
     - Generates UI code for the selected node
     - Provides detailed design context including styles, layout, and components
     - Should be preferred for detailed implementation work
     - **For multiple URLs:** Call this for each node ID to get code for each section/component
  4. **`get_screenshot`** (visual reference) - Get a visual reference of the design
     - Generates a screenshot for visual comparison during implementation
     - Useful for verifying the final implementation matches the design
     - **For multiple URLs:** Get screenshots for each design to reference during implementation
- **Combining multiple designs:**
  - If multiple URLs represent different sections of the same template, combine them into a single HTML file
  - If multiple URLs represent different pages, create separate template files or combine as needed
  - Maintain consistent styling across all sections by using the extracted design tokens
  - Organize sections logically in the final HTML structure

### 2. Create HTML Template
- Create a new directory in `src/{TEMPLATE_TYPE}/` with the template name (e.g., `{template-name}/`)
- Create the main HTML file: `{template-name}.html`
- Structure:
  - Single HTML document
  - Include HandlebarsJS variables using `{{variableName}}` syntax
  - Use `{{#each}}` for arrays
  - Link to `../styles.css` for base styles (or adjust path as needed)
  - Add template-specific styles in `<style>` tag
  - Reference assets from `../../assets/{TEMPLATE_TYPE}/` (adjust relative path as needed)
  - Logo on Header use `../../assets/elfie-logo.svg`
  - The Cover html template refer `src/health-report/section-1/section-1-cover.html`
  - If asset has size over > 15Mb, skip it and replace it by `../../assets/elfie-logo.svg`
  - Match with design first, then user review and do adjustment later.

### 3. Create RTL Version (if needed)
- Create `{template-name}-rtl.html` in the same directory
- Changes needed:
  - Set `dir="rtl"` and `lang="ar"` on `<html>` tag
  - Add `Noto Sans Arabic` font import (or appropriate RTL font)
  - Reverse flex directions (`flex-direction: row-reverse`)
  - Align text to right (`text-align: right`)
  - Reverse icon positions
  - Update translations for static text (if applicable)

### 4. Export Assets
- Export required assets from Figma:
  - Icons: Export as SVG (preferred) or PNG
  - Logos: Export as SVG
  - Images: Export as PNG
- Save all assets to `src/assets/{TEMPLATE_TYPE}/`
- Naming convention: Use kebab-case (e.g., `{template-name}-icon.svg`)

### 5. Generate Embedded Versions
- Run the build script to create embedded HTML files:
  ```bash
  cd src/{TEMPLATE_TYPE}
  node build-embedded.js {template-name}/
  ```
- This will:
  - Inline CSS from `styles.css`
  - Inline SVG files (< 5KB)
  - Base64 encode PNG and large SVG files
  - Create embedded files in `embedded/{template-name}/`

### 6. Update index.html
- Add template cards to `index.html` (or the main index file for your template type):
  - Add LTR version card
  - Add RTL version card
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
    <title>{TEMPLATE_TITLE} - Template Name</title>
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

Common variables you may use (customize based on your template needs):
- `{{userName}}` - User's name
- `{{reportDate}}` - Report/document date
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
- [ ] Build script exists in `src/{TEMPLATE_TYPE}/build-embedded.js` (or adjust path)

## Notes

- The build script will show warnings for missing assets
- Large SVGs (>5KB) will be base64 encoded instead of inlined
- All embedded files are self-contained (no external dependencies)
- Templates should be print-friendly (595px width for A4, or adjust for your page size)
- Ensure `styles.css` exists in `src/{TEMPLATE_TYPE}/` directory

## Example Usage

### Single Figma URL Example

**Template Type:** `health-report`  
**Template Name:** `report-context`  
**Template Title:** `Health Report`  
**Figma URL:** `https://figma.com/design/abc123/Health-Report?node-id=810-7465`

This would result in:
- Template directory: `src/health-report/report-context/`
- Template file: `src/health-report/report-context/report-context.html`
- Assets directory: `src/assets/health-report/`
- Build command: `cd src/health-report && node build-embedded.js report-context/`

### Multiple Figma URLs Example

**Template Type:** `health-report`  
**Template Name:** `section-1`  
**Template Title:** `Health Report - Section 1`  
**Figma URLs:**
- `https://figma.com/design/abc123/Health-Report?node-id=810-7465` (Header section)
- `https://figma.com/design/abc123/Health-Report?node-id=123-456` (Content section)
- `https://figma.com/design/abc123/Health-Report?node-id=789-012` (Footer section)

**Workflow:**
1. Extract node IDs: `810:7465`, `123:456`, `789:012`
2. Use Figma MCP tools to access each design
3. Combine all sections into a single template file: `section-1.html`
4. Consolidate design tokens from all designs
5. Export assets from all designs to the same assets directory