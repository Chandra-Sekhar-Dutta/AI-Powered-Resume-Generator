import puppeteer from "puppeteer";

export const generateResumePDF = async (req, res) => {
  try {
    const { html } = req.body;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Set viewport for better rendering
    await page.setViewport({ width: 1200, height: 1600 });

    // Wrap HTML with TailwindCSS and add print-specific overrides
    await page.setContent(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Resume</title>
          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>
          <!-- Google Fonts -->
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.5;
              color: #111827;
              background: white;
              -webkit-font-smoothing: antialiased;
            }

            /* Remove any shadows or borders that might interfere */
            * {
              box-shadow: none !important;
              border-radius: 0 !important;
            }

            /* Ensure proper text rendering */
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
              line-height: 1.25;
            }

            /* Header styling */
            .text-2xl { font-size: 1.5rem; }
            .text-lg { font-size: 1.125rem; }
            .text-base { font-size: 1rem; }
            .text-sm { font-size: 0.875rem; }

            /* Color classes */
            .text-gray-600 { color: #4b5563; }
            .text-gray-500 { color: #6b7280; }
            .text-gray-700 { color: #374151; }
            .text-gray-800 { color: #1f2937; }

            /* Layout */
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .flex { display: flex; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .gap-4 { gap: 1rem; }
            .space-y-1 > * + * { margin-top: 0.25rem; }

            /* Padding and margins */
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-1 { margin-top: 0.25rem; }
            .my-4 { margin-top: 1rem; margin-bottom: 1rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-1 { margin-bottom: 0.25rem; }

            /* Font weights */
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-medium { font-weight: 500; }

            /* Grid system - FORCE 2 COLUMNS for skills */
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-2 { 
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              min-width: 100% !important;
            }
            .gap-y-3 { row-gap: 0.75rem !important; }
            .gap-x-6 { column-gap: 1.5rem !important; }

            /* HR styling */
            hr {
              border: none;
              border-top: 2px solid;
              margin: 1rem 0;
            }

            /* Border top */
            .border-t-10 {
              border-top-width: 10px;
              border-top-style: solid;
            }

            .border-t-2 {
              border-top-width: 2px;
              border-top-style: solid;
            }

            /* Text styling */
            .italic { font-style: italic; }
            .not-italic { font-style: normal; }
            .uppercase { text-transform: uppercase; }
            .tracking-wide { letter-spacing: 0.025em; }
            .leading-relaxed { line-height: 1.625; }

            /* Force 2-column grid in all scenarios */
            .grid.grid-cols-2 {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 0.75rem 1.5rem !important;
              width: 100% !important;
            }

            /* Ensure skills items wrap properly */
            .grid.grid-cols-2 > div {
              display: block !important;
              width: 100% !important;
              min-height: fit-content !important;
            }

            /* PDF specific overrides */
            @media print {
              .grid-cols-2 { 
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 0.75rem 1.5rem !important;
              }
            }

            /* Force grid to work in PDF generation */
            @page {
              margin: 20px;
              size: A4;
            }
          </style>
        </head>
        <body>
          <div style="max-width: 210mm; margin: 0 auto; background: white;">
            ${html}
          </div>
        </body>
      </html>
    `,
      { waitUntil: "networkidle0" }
    );

    // Wait for fonts and layout to settle
    await page.waitForTimeout(1000);

    // Generate PDF with proper settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { 
        top: "20px", 
        right: "20px", 
        bottom: "20px", 
        left: "20px" 
      },
      displayHeaderFooter: false,
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};