/**
 * Example: Generate PDF from Embedded HTML Template
 * 
 * This example demonstrates how to use the embedded HTML templates
 * to generate PDFs with dynamic data using Puppeteer.
 * 
 * Install dependencies:
 * npm install puppeteer
 */

const fs = require('fs');
const path = require('path');

// Uncomment to use with Puppeteer
// const puppeteer = require('puppeteer');

/**
 * Generate PDF from embedded HTML template
 */
async function generateHealthReportPDF(userData) {
  console.log('📄 Generating Health Report PDF...\n');
  
  // 1. Read the embedded HTML template
  const templatePath = path.join(__dirname, '../src/health-report/embedded/front-cover-page/front-cover-page.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');
  
  console.log(`✓ Loaded template: ${path.basename(templatePath)}`);
  console.log(`  Original size: ${(htmlContent.length / 1024).toFixed(1)}KB\n`);
  
  // 2. Replace template variables with user data
  htmlContent = htmlContent
    .replace(/\{\{name\}\}/g, userData.name)
    .replace(/\{\{gender\}\}/g, userData.gender)
    .replace(/\{\{country\}\}/g, userData.country)
    .replace(/\{\{birthYear\}\}/g, userData.birthYear)
    .replace(/\{\{reportPeriod\}\}/g, userData.reportPeriod)
    .replace(/\{\{footerText\}\}/g, userData.footerText);
  
  console.log('✓ Template variables replaced:');
  console.log(`  • Name: ${userData.name}`);
  console.log(`  • Gender: ${userData.gender}`);
  console.log(`  • Country: ${userData.country}`);
  console.log(`  • Birth Year: ${userData.birthYear}`);
  console.log(`  • Report Period: ${userData.reportPeriod}\n`);
  
  // 3. Save the populated HTML (optional, for debugging)
  const debugPath = path.join(__dirname, 'debug-output.html');
  fs.writeFileSync(debugPath, htmlContent, 'utf8');
  console.log(`✓ Debug HTML saved: ${debugPath}\n`);
  
  // 4. Generate PDF using Puppeteer (uncomment to use)
  /*
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to A4 dimensions
  await page.setViewport({
    width: 595,
    height: 842,
    deviceScaleFactor: 2
  });
  
  // Load the HTML content
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });
  
  // Generate PDF
  const pdfPath = path.join(__dirname, `health-report-${userData.name.replace(/\s+/g, '-')}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  console.log(`✓ PDF generated: ${pdfPath}`);
  console.log(`  File size: ${(fs.statSync(pdfPath).size / 1024).toFixed(1)}KB\n`);
  */
  
  console.log('✅ Done!\n');
  console.log('💡 To generate actual PDF, uncomment the Puppeteer code and run:');
  console.log('   npm install puppeteer');
  console.log('   node examples/generate-pdf-example.js\n');
}

/**
 * Example usage with sample data
 */
async function main() {
  const sampleUserData = {
    name: 'John Doe',
    gender: 'Male',
    country: 'United States',
    birthYear: '1985',
    reportPeriod: 'Jan 1, 2024 - Dec 31, 2024',
    footerText: '2024-12-31 • For Personal Use Only'
  };
  
  try {
    await generateHealthReportPDF(sampleUserData);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  main();
}

module.exports = { generateHealthReportPDF };
