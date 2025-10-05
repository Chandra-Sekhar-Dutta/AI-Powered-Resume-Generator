const puppeteer = require('puppeteer');
const { getHTMLTemplate } = require('../utils/htmlTemplate');
const { saveHTMLForDebug, countSections } = require('../utils/debugUtils');

class PDFService {
  async generatePDFFromHTML(htmlContent) {
    let browser = null;
    try {
      console.log('Launching browser...');
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-software-rasterizer'
        ]
      });

      const page = await browser.newPage();

      // Set viewport with proper dimensions
      await page.setViewport({
        width: 1200,
        height: 1600,
        deviceScaleFactor: 2
      });

      // Wrap the HTML content in a complete document with Tailwind CSS
      const fullHTML = getHTMLTemplate(htmlContent);
      console.log('Full HTML length:', fullHTML.length);

      // Analyze and save for debugging if enabled
      countSections(htmlContent);
      saveHTMLForDebug(fullHTML);

      console.log('Setting page content...');
      await page.setContent(fullHTML, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
        timeout: 30000
      });

      // Inject print-friendly CSS to prevent content cutting
      await page.addStyleTag({
        content: `
    @media print {
      body {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        box-shadow: none !important; /* Remove all shadows */
        text-shadow: none !important; /* Remove text shadows */
      }
      .mb-6, section, div {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
    body {
      overflow: visible !important;
      height: auto !important;
      min-height: 100vh !important;
    }
    #resume-preview {
      height: auto !important;
      min-height: auto !important;
      overflow: visible !important;
    }
    /* Global override for any Tailwind UI shadows */
    * {
      box-shadow: none !important;
      text-shadow: none !important;
    }
  `
      });


      // Wait for Tailwind CSS to fully load and apply styles
      console.log('Waiting for styles to load...');
      await page.waitForTimeout(5000);

      // Force evaluation to ensure content is rendered
      await page.evaluate(() => {
        return new Promise((resolve) => {
          // Force reflow
          document.body.offsetHeight;

          // Remove any height restrictions
          document.body.style.height = 'auto';
          document.body.style.overflow = 'visible';

          const preview = document.getElementById('resume-preview');
          if (preview) {
            preview.style.height = 'auto';
            preview.style.overflow = 'visible';
          }

          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              setTimeout(resolve, 1000);
            });
          } else {
            setTimeout(resolve, 1000);
          }
        });
      });

      // Get debugging info
      const debugInfo = await page.evaluate(() => {
        const body = document.body;
        const preview = document.getElementById('resume-preview');
        const experiences = document.querySelectorAll('.mb-6');

        return {
          bodyHeight: body.scrollHeight,
          bodyOffsetHeight: body.offsetHeight,
          previewHeight: preview ? preview.scrollHeight : 0,
          experienceCount: experiences.length,
          bodyHTML: body.innerHTML.length
        };
      });

      console.log('Page Debug Info:', debugInfo);
      console.log('Generating PDF with unlimited height...');

      // Generate PDF without height restrictions
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm'
        },
        preferCSSPageSize: false,
        displayHeaderFooter: false,
        omitBackground: false,
        // This is critical - allows multiple pages
        pageRanges: '' // Empty string means all pages
      });

      console.log('PDF buffer created, size:', pdfBuffer.length, 'bytes');

      return pdfBuffer;

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
        console.log('Browser closed');
      }
    }
  }
}

module.exports = new PDFService();
