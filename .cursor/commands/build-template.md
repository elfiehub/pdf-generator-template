# Build Template Command

This command helps build HTML templates from Figma designs using the generic implementation plan.

## Usage

When invoked, this command will:
1. Receive template information from the user (template type, template name, and optionally Figma URL/node ID)
2. Follow the workflow outlined in `TEMPLATE-IMPLEMENTATION-PLAN.md`
3. Guide through each step of template creation

## Required Information

- **Template Type**: The category/type of template (e.g., `health-report`, `invoice`, `certificate`)
- **Template Name**: The specific template name (e.g., `report-context`, `invoice-header`)
- **Template Title** (optional): Display title for the template
- **Figma URL(s)/Node ID(s)** (optional): One or multiple Figma URLs
  - Single URL: `https://figma.com/design/:fileKey/:fileName?node-id=810-7465`
  - Multiple URLs: Provide as a list (comma-separated or line-separated)
  - Each URL may represent different sections, pages, or components
  - Will use Figma MCP tools to access and process each design

## Workflow

Refer to `TEMPLATE-IMPLEMENTATION-PLAN.md` for the complete workflow. The plan uses placeholders:
- `{TEMPLATE_TYPE}` - Replace with the template type
- `{template-name}` - Replace with the template name
- `{TEMPLATE_TITLE}` - Replace with the template title

The command will automatically substitute these placeholders when following the plan.