/**
 * Example: Generating PDF from Section 1 Happy Case Template with Handlebars.js
 * 
 * This example demonstrates how to:
 * 1. Load the HTML template
 * 2. Compile it with Handlebars
 * 3. Inject dynamic data
 * 4. Generate a PDF using Puppeteer
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

// Sample data for the template
const templateData = {
    // User information
    userName: 'Ian H. Pham',
    
    // Data Context Overview
    dataContextDescription: 'This report aggregates data over a continuous 6-month window (07 Jun – 07 Dec), comprised of 720 total health entries. The dataset demonstrates high consistency, with patient logging frequency averaging ≥120 entries per month.',
    
    dataContextItems: [
        {
            label: 'Data Density',
            value: 'High (120 entries per month)'
        },
        {
            label: 'Data Longitudinality',
            value: 'Medium (6 months)'
        },
        {
            label: 'Data Freshness',
            value: 'High (20 entries in the last week)'
        },
        {
            label: 'Source Diversity',
            value: 'High (Manual, Wearable, Laboratory)'
        }
    ],
    
    // Health Highlights
    healthHighlights: [
        'Blood pressure remained stable for most of the report period.',
        'No reported chest pain, severe headaches, or acute warning symptoms.',
        'Weight remained consistent (±0.7 kg), indicating stable baseline metabolism.',
        'Medication adherence improved notably in August–September (82% average).'
    ],
    
    // Risk Signals
    riskSignals: [
        'Your blood pressure stayed mostly stable during this period.',
        'You did not report any serious symptoms such as chest pain or severe headaches.',
        'Your weight stayed steady, with only small changes.',
        'Your medication adherence was especially good in August–September.',
        'You logged your health information regularly, which helps create accurate insights.'
    ],
    
    // Doctor Questions
    doctorQuestions: [
        'Should we adjust my Metformin since my blood sugar is rising?',
        'Are there warning symptoms I should watch for?',
        'What\'s causing my fatigue and dizziness?',
        'Should I be checked for anemia or thyroid issues?',
        'What exercise plan should I follow?',
        'How often should I check my fasting glucose?'
    ],
    
    // Footer information
    footerDate: '07 December 2025',
    footerText: 'For Personal Use Only',
    page3Number: '3',
    page4Number: '4',
    totalPages: '33'
};

async function generatePDF() {
    try {
        console.log('📄 Loading HTML template...');
        
        // Path to the embedded HTML template
        const templatePath = path.join(__dirname, '../src/health-report/embedded/section-1/section-1-happy-case.html');
        const templateHtml = fs.readFileSync(templatePath, 'utf8');
        
        console.log('🔧 Compiling template with Handlebars...');
        
        // Compile the template
        const template = Handlebars.compile(templateHtml);
        
        // Generate HTML with data
        const html = template(templateData);
        
        console.log('🌐 Launching browser...');
        
        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set content
        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });
        
        console.log('📑 Generating PDF...');
        
        // Output path
        const outputPath = path.join(__dirname, 'section-1-happy-case-output.pdf');
        
        // Generate PDF
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
        
        await browser.close();
        
        console.log(`✅ PDF generated successfully: ${outputPath}`);
        console.log(`📊 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        process.exit(1);
    }
}

// Run the example
if (require.main === module) {
    generatePDF();
}

module.exports = { generatePDF, templateData };
