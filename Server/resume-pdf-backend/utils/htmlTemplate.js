/**
 * Wraps the resume HTML content in a complete HTML document
 * with Tailwind CSS CDN for proper styling in PDF
 */
exports.getHTMLTemplate = (content) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }

    * {
      box-sizing: border-box;
      box-shadow: none !important; /* Remove any Tailwind box shadows */
      text-shadow: none !important; /* Remove text shadows */
    }
    
    html {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: white;
      margin: 0;
      padding: 0;
    }
    
    /* Prevent breaking inside items */
    .mb-6, .mb-4, .education-item {
      page-break-inside: avoid;
      break-inside: avoid;
    }
    
    /* Prevent orphaned headings */
    h2, h3 {
      page-break-after: avoid;
      break-after: avoid;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `.trim();
};
