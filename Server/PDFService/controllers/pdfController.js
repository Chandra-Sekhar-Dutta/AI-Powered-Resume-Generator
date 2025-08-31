import puppeteer from "puppeteer";

export const generateResumePDF = async (req, res) => {
  try {
    const { html } = req.body;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Wrap HTML with TailwindCSS and add print-specific overrides
    await page.setContent(
      `
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Resume</title>
          <!-- Tailwind -->
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <!-- Google Font for consistency -->
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Inter', 'Arial', sans-serif; 
              padding: 20px;
              color: #111827; /* Tailwind gray-900 */
            }

            /* Remove UI-only decorations */
            * {
              box-shadow: none !important;
            }

            /* Section headings */
            h2, h3 {
              margin-bottom: 4px;
            }

            /* Education items */
            .education-item {
              margin-bottom: 12px;
              padding-left: 4px;
            }

            /* Skills grid - force two columns */
           .skills-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 8px 16px !important;
            }

            .skill-category {
              font-weight: 600;
              margin-bottom: 2px;
            }

            /* Make paragraphs more readable in print */
            p {
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `,
      { waitUntil: "networkidle0" }
    );

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "30px", right: "30px", bottom: "30px", left: "30px" },
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
