const puppeteer = require("puppeteer");
async function generatePDF(htmlContent, pdfPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Set content to the page
    await page.setContent(htmlContent);
  
    // Generate PDF
    await page.pdf({ path: pdfPath, format: 'A4' });
  
    await browser.close();
  }

module.exports= generatePDF;
