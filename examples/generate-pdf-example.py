"""
Example: Generate PDF from Embedded HTML Template (Python)

This example demonstrates how to use the embedded HTML templates
to generate PDFs with dynamic data using pdfkit or weasyprint.

Install dependencies:
pip install pdfkit
# OR
pip install weasyprint
"""

import os
import sys
from pathlib import Path

# Add parent directory to path to access templates
sys.path.insert(0, str(Path(__file__).parent.parent))


def generate_health_report_pdf_pdfkit(user_data, output_path='output.pdf'):
    """Generate PDF using pdfkit (requires wkhtmltopdf installed)"""
    try:
        import pdfkit
    except ImportError:
        print("❌ pdfkit not installed. Run: pip install pdfkit")
        return False
    
    print("📄 Generating Health Report PDF with pdfkit...\n")
    
    # 1. Read the embedded HTML template
    template_path = Path(__file__).parent.parent / 'src/health-report/embedded/front-cover-page/front-cover-page.html'
    
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print(f"✓ Loaded template: {template_path.name}")
    print(f"  Original size: {len(html_content) / 1024:.1f}KB\n")
    
    # 2. Replace template variables with user data
    replacements = {
        '{{name}}': user_data['name'],
        '{{gender}}': user_data['gender'],
        '{{country}}': user_data['country'],
        '{{birthYear}}': user_data['birthYear'],
        '{{reportPeriod}}': user_data['reportPeriod'],
        '{{footerText}}': user_data['footerText']
    }
    
    for placeholder, value in replacements.items():
        html_content = html_content.replace(placeholder, value)
    
    print("✓ Template variables replaced:")
    for key, value in user_data.items():
        print(f"  • {key}: {value}")
    print()
    
    # 3. Generate PDF
    try:
        options = {
            'page-size': 'A4',
            'margin-top': '0mm',
            'margin-right': '0mm',
            'margin-bottom': '0mm',
            'margin-left': '0mm',
            'encoding': 'UTF-8',
            'enable-local-file-access': None,
            'print-media-type': None
        }
        
        pdfkit.from_string(html_content, output_path, options=options)
        
        file_size = os.path.getsize(output_path)
        print(f"✓ PDF generated: {output_path}")
        print(f"  File size: {file_size / 1024:.1f}KB\n")
        
        return True
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")
        return False


def generate_health_report_pdf_weasyprint(user_data, output_path='output.pdf'):
    """Generate PDF using WeasyPrint (pure Python, no external dependencies)"""
    try:
        from weasyprint import HTML
    except ImportError:
        print("❌ WeasyPrint not installed. Run: pip install weasyprint")
        return False
    
    print("📄 Generating Health Report PDF with WeasyPrint...\n")
    
    # 1. Read the embedded HTML template
    template_path = Path(__file__).parent.parent / 'src/health-report/embedded/front-cover-page/front-cover-page.html'
    
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print(f"✓ Loaded template: {template_path.name}")
    print(f"  Original size: {len(html_content) / 1024:.1f}KB\n")
    
    # 2. Replace template variables with user data
    replacements = {
        '{{name}}': user_data['name'],
        '{{gender}}': user_data['gender'],
        '{{country}}': user_data['country'],
        '{{birthYear}}': user_data['birthYear'],
        '{{reportPeriod}}': user_data['reportPeriod'],
        '{{footerText}}': user_data['footerText']
    }
    
    for placeholder, value in replacements.items():
        html_content = html_content.replace(placeholder, value)
    
    print("✓ Template variables replaced:")
    for key, value in user_data.items():
        print(f"  • {key}: {value}")
    print()
    
    # 3. Save debug HTML (optional)
    debug_path = Path(__file__).parent / 'debug-output.html'
    with open(debug_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"✓ Debug HTML saved: {debug_path}\n")
    
    # 4. Generate PDF
    try:
        HTML(string=html_content).write_pdf(output_path)
        
        file_size = os.path.getsize(output_path)
        print(f"✓ PDF generated: {output_path}")
        print(f"  File size: {file_size / 1024:.1f}KB\n")
        
        return True
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")
        return False


def main():
    """Example usage with sample data"""
    sample_user_data = {
        'name': 'Jane Smith',
        'gender': 'Female',
        'country': 'United Kingdom',
        'birthYear': '1990',
        'reportPeriod': 'Jan 1, 2024 - Dec 31, 2024',
        'footerText': '2024-12-31 • For Personal Use Only'
    }
    
    print("╔═══════════════════════════════════════════════════════╗")
    print("║   Health Report PDF Generator (Python)               ║")
    print("╚═══════════════════════════════════════════════════════╝\n")
    
    # Try WeasyPrint first (recommended for Python)
    output_path = Path(__file__).parent / f"health-report-{sample_user_data['name'].replace(' ', '-')}.pdf"
    
    print("Attempting to use WeasyPrint...\n")
    success = generate_health_report_pdf_weasyprint(sample_user_data, str(output_path))
    
    if not success:
        print("\nAttempting to use pdfkit as fallback...\n")
        success = generate_health_report_pdf_pdfkit(sample_user_data, str(output_path))
    
    if success:
        print("✅ Done!\n")
    else:
        print("\n❌ Failed to generate PDF. Please install one of:")
        print("   pip install weasyprint  (recommended)")
        print("   pip install pdfkit  (requires wkhtmltopdf)")


if __name__ == '__main__':
    main()
